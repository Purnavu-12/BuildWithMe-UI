import fs from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const importPattern =
  /(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s*|\brequire\s*\(\s*|@import\s*)['"]([^'"]+)['"]|<style\b[^>]*\bsrc\s*=\s*['"]([^'"]+)['"]/g;

/** Static, reviewed imports only. This does not evaluate submitted source. */
export function sourceImports(source: string): string[] {
  const imports: string[] = [];
  const scripts = [...source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)];
  const code = scripts.length ? scripts.map((match) => match[1]).join('\n') : source;
  const tree = ts.createSourceFile(
    'source.tsx',
    code,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  function visit(node: ts.Node) {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    )
      imports.push(node.moduleSpecifier.text);
    if (
      ts.isCallExpression(node) &&
      (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
        (ts.isIdentifier(node.expression) && node.expression.text === 'require')) &&
      node.arguments[0] &&
      ts.isStringLiteral(node.arguments[0])
    )
      imports.push(node.arguments[0].text);
    ts.forEachChild(node, visit);
  }
  visit(tree);
  for (const match of source.matchAll(/<style\b[^>]*\bsrc\s*=\s*['"]([^'"]+)['"]/g))
    imports.push(match[1]);
  // CSS cannot contain executable JS imports; collect its authored @import rules.
  if (
    !scripts.length &&
    !/\b(?:const|let|function|export|import)\b/.test(source.replace(/@import/g, ''))
  ) {
    for (const match of source.matchAll(/@import\s*['"]([^'"]+)['"]/g)) imports.push(match[1]);
  }
  return [...new Set(imports)];
}

export type SourceFile = { path: string; name: string; content: string };

/** Materialize a complete, flat installation directory with stable entry filenames. */
export async function collectSourceFiles(root: string, entry: string, extra: string[] = []) {
  const boundary = await fs.realpath(root);
  const files: SourceFile[] = [];
  const visited = new Map<string, SourceFile>();
  const names = new Map<string, string>();

  function assertInside(target: string) {
    const relative = path.relative(boundary, target);
    if (relative.startsWith('..') || path.isAbsolute(relative)) {
      throw new Error(`Source dependency is outside the registry: ${target}`);
    }
  }

  async function resolve(target: string): Promise<string> {
    assertInside(target);
    for (const candidate of [
      target,
      ...['.ts', '.tsx', '.vue', '.svelte', '.css', '.json'].map((extension) => target + extension),
    ]) {
      try {
        const actual = await fs.realpath(candidate);
        assertInside(actual);
        if ((await fs.stat(actual)).isFile()) return actual;
      } catch (error) {
        if (error instanceof Error && error.message.includes('outside the registry')) throw error;
      }
    }
    throw new Error(`Missing source dependency: ${path.relative(boundary, target)}`);
  }

  async function visit(target: string): Promise<SourceFile> {
    const absolute = await resolve(target);
    const existing = visited.get(absolute);
    if (existing) return existing;
    const image = /\.(webp|png|jpe?g)$/i.exec(absolute);
    const name = image
      ? path.basename(absolute).replace(/\.[^.]+$/, '-image.ts')
      : path.basename(absolute);
    const owner = names.get(name.toLowerCase());
    if (owner && owner !== absolute) throw new Error(`Source filename collision: ${name}`);
    names.set(name.toLowerCase(), absolute);
    const source = image
      ? `// Original BuildWithMe-UI artwork. MIT; preserve the included notices.\nexport default ${JSON.stringify(`data:image/${image[1].toLowerCase() === 'jpg' ? 'jpeg' : image[1].toLowerCase()};base64,${(await fs.readFile(absolute)).toString('base64')}`)};\n`
      : await fs.readFile(absolute, 'utf8');
    const file = {
      path: path.relative(boundary, absolute).replaceAll('\\', '/'),
      name,
      content: source,
    };
    visited.set(absolute, file);
    files.push(file);
    const replacements = new Map<string, string>();
    for (const specifier of sourceImports(source)) {
      if (!specifier.startsWith('.')) continue;
      const dependency = await visit(path.resolve(path.dirname(absolute), specifier));
      let localName = dependency.name;
      if (/\.tsx?$/.test(localName) && !/\.tsx?$/.test(specifier))
        localName = localName.replace(/\.tsx?$/, '');
      replacements.set(specifier, `./${localName}`);
    }
    file.content = source.replace(
      importPattern,
      (match, imported: string | undefined, style: string | undefined) => {
        const specifier = imported ?? style;
        const replacement = specifier && replacements.get(specifier);
        return replacement ? match.replace(specifier, replacement) : match;
      },
    );
    return file;
  }

  await visit(path.resolve(boundary, entry));
  for (const additional of extra) await visit(path.resolve(boundary, additional));
  return files;
}
