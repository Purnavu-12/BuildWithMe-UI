import fs from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';
import { componentSchema, type RegistryComponent } from '../../registry-schema/src/index';

export function safePath(value: string) {
  return (
    !!value &&
    !value.includes('\\') &&
    !value.includes(':') &&
    !value.includes('\0') &&
    !path.posix.isAbsolute(value) &&
    value.split('/').every((p) => p !== '.' && p !== '..' && p !== '')
  );
}
export function importsOf(source: string): string[] {
  const file = ts.createSourceFile(
    'component.tsx',
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const imports: string[] = [];
  const visit = (node: ts.Node) => {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    )
      imports.push(node.moduleSpecifier.text);
    if (
      ts.isCallExpression(node) &&
      (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
        (ts.isIdentifier(node.expression) && node.expression.text === 'require'))
    ) {
      const arg = node.arguments[0];
      if (arg && ts.isStringLiteral(arg)) imports.push(arg.text);
      else imports.push('__dynamic_import_not_allowed__');
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return imports;
}
export async function validateEntries(
  raw: unknown[],
  root: string,
): Promise<{ items: RegistryComponent[]; errors: string[] }> {
  const errors: string[] = [];
  const items: RegistryComponent[] = [];
  const ids = new Set<string>();
  for (const entry of raw) {
    const parsed = componentSchema.safeParse(entry);
    if (!parsed.success) {
      errors.push(`Invalid schema: ${parsed.error.message}`);
      continue;
    }
    const item = parsed.data;
    items.push(item);
    if (ids.has(item.id)) errors.push(`${item.id}: duplicate ID`);
    ids.add(item.id);
    if (new Set(item.files.map((f) => path.posix.basename(f))).size !== item.files.length)
      errors.push(`${item.id}: duplicate distribution filename`);
    if (item.engine !== 'css' && !item.dependencies[item.engine])
      errors.push(`${item.id}: missing engine dependency ${item.engine}`);
    for (const file of [...item.files, item.preview]) {
      if (!safePath(file)) {
        errors.push(`${item.id}: unsafe path ${file}`);
        continue;
      }
      const absolute = path.resolve(root, file);
      let source: string;
      try {
        const real = await fs.realpath(absolute);
        const relative = path.relative(await fs.realpath(root), real);
        if (relative.startsWith('..') || path.isAbsolute(relative))
          throw new Error('outside registry');
        source = await fs.readFile(real, 'utf8');
      } catch {
        errors.push(`${item.id}: missing or unsafe file ${file}`);
        continue;
      }
      for (const spec of importsOf(source)) {
        if (spec.startsWith('.')) {
          const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(file), spec));
          if (
            !safePath(resolved) ||
            !item.files.some(
              (f) =>
                f === resolved ||
                f === `${resolved}.tsx` ||
                f === `${resolved}.ts` ||
                f === `${resolved}.css`,
            )
          )
            errors.push(`${item.id}: unlisted relative import ${spec}`);
        } else {
          const pkg = spec.startsWith('@')
            ? spec.split('/').slice(0, 2).join('/')
            : spec.split('/')[0];
          if (!['react', 'react-dom'].includes(pkg) && !item.dependencies[pkg])
            errors.push(`${item.id}: undeclared import ${spec}`);
        }
      }
    }
  }
  const map = new Map(items.map((i) => [i.id, i]));
  for (const item of items) {
    if (item.parent && !map.has(item.parent)) errors.push(`${item.id}: broken parent reference`);
    const visited = new Set<string>();
    let current: RegistryComponent | undefined = item;
    while (current) {
      if (visited.has(current.id)) {
        errors.push(`${item.id}: cyclic remix relationship`);
        break;
      }
      visited.add(current.id);
      current = current.parent ? map.get(current.parent) : undefined;
    }
  }
  return { items, errors };
}
export async function loadRegistry(root = process.cwd()) {
  const registryRoot = path.join(root, 'registry');
  const entries: unknown[] = [];
  async function walk(dir: string) {
    for (const ent of await fs.readdir(dir, { withFileTypes: true })) {
      if (ent.isDirectory()) await walk(path.join(dir, ent.name));
      else if (ent.name === 'metadata.json')
        entries.push(JSON.parse(await fs.readFile(path.join(dir, ent.name), 'utf8')));
    }
  }
  await walk(registryRoot);
  return validateEntries(entries, registryRoot);
}
