import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  componentManifestSchema,
  frameworks,
  type ComponentManifest,
} from '../src/registry/schema';
import { collectSourceFiles, sourceImports } from './source-artifacts';

const root = process.cwd();
const registryRoot = path.join(root, 'src', 'registry');
const designsRoot = path.join(registryRoot, 'designs');

export function safePath(value: string) {
  return Boolean(
    value &&
    !value.includes('\\') &&
    !value.includes(':') &&
    !value.includes('\0') &&
    !path.posix.isAbsolute(value) &&
    value.split('/').every((part) => part !== '' && part !== '.' && part !== '..'),
  );
}

export function importsOf(source: string) {
  const matches = source.matchAll(/(?:from\s+|import\s*\(|require\s*\()\s*['"]([^'"]+)['"]/g);
  return [...matches].map((match) => match[1]);
}

export function rewriteReactSource(source: string) {
  return source
    .replaceAll('../../shared/use-animation', './use-animation')
    .replaceAll('../../shared/base.css', './base.css');
}

export async function loadManifests(base = designsRoot) {
  const manifests: ComponentManifest[] = [];
  const errors: string[] = [];
  let entries: import('node:fs').Dirent[];
  try {
    entries = await fs.readdir(base, { withFileTypes: true });
  } catch {
    return { manifests, errors: [`Missing registry directory: ${base}`] };
  }
  for (const entry of entries.filter((item) => item.isDirectory())) {
    const file = path.join(base, entry.name, 'manifest.ts');
    try {
      const module = await import(`${pathToFileURL(file).href}?v=${Date.now()}-${entry.name}`);
      const result = componentManifestSchema.safeParse(module.default);
      if (!result.success) errors.push(`${entry.name}: ${result.error.message}`);
      else manifests.push(result.data);
    } catch (error) {
      errors.push(`${entry.name}: unable to load manifest (${String(error)})`);
    }
  }
  return { manifests, errors };
}

export async function validateRegistry(base = registryRoot) {
  const loaded = await loadManifests(path.join(base, 'designs'));
  const errors = [...loaded.errors];
  const ids = new Set<string>();
  for (const manifest of loaded.manifests) {
    if (ids.has(manifest.id)) errors.push(`${manifest.id}: duplicate ID`);
    ids.add(manifest.id);
    for (const framework of frameworks) {
      const target = manifest.frameworks[framework];
      if (!safePath(target.source)) {
        errors.push(`${manifest.id}/${framework}: unsafe source path ${target.source}`);
        continue;
      }
      try {
        const absolute = await fs.realpath(path.join(base, target.source));
        const relative = path.relative(await fs.realpath(base), absolute);
        if (relative.startsWith('..') || path.isAbsolute(relative))
          throw new Error('outside registry');
        const closure = await collectSourceFiles(
          base,
          target.source,
          manifest.style ? [manifest.style] : [],
        );
        for (const specifier of closure.flatMap((file) => sourceImports(file.content))) {
          if (specifier.startsWith('.')) continue;
          const packageName = specifier.startsWith('@')
            ? specifier.split('/').slice(0, 2).join('/')
            : specifier.split('/')[0];
          const builtins =
            framework === 'react'
              ? ['react', 'react-dom']
              : framework === 'vue'
                ? ['vue']
                : ['svelte'];
          if (!builtins.includes(packageName) && !target.dependencies[packageName]) {
            errors.push(`${manifest.id}/${framework}: undeclared dependency ${packageName}`);
          }
        }
      } catch (error) {
        errors.push(
          `${manifest.id}/${framework}: missing or unsafe source ${target.source} (${String(error)})`,
        );
      }
    }
    if (manifest.style) {
      if (!safePath(manifest.style))
        errors.push(`${manifest.id}: unsafe style path ${manifest.style}`);
      else {
        try {
          await fs.access(path.join(base, manifest.style));
        } catch {
          errors.push(`${manifest.id}: missing style ${manifest.style}`);
        }
      }
    }
  }
  const byId = new Map(loaded.manifests.map((item) => [item.id, item]));
  for (const manifest of loaded.manifests) {
    for (const related of manifest.related)
      if (!byId.has(related)) errors.push(`${manifest.id}: broken related item ${related}`);
    if (manifest.provenance.type === 'remix') {
      const visited = new Set<string>();
      let current: ComponentManifest | undefined = manifest;
      while (current?.provenance.type === 'remix') {
        if (visited.has(current.id)) {
          errors.push(`${manifest.id}: cyclic remix relationship`);
          break;
        }
        visited.add(current.id);
        current = byId.get(current.provenance.parent);
        if (!current) {
          errors.push(`${manifest.id}: broken remix parent`);
          break;
        }
      }
    }
  }
  return { manifests: loaded.manifests.sort((a, b) => a.title.localeCompare(b.title)), errors };
}

async function build() {
  const result = await validateRegistry();
  if (result.errors.length) throw new Error(result.errors.join('\n'));
  const publicRoot = path.join(root, 'public');
  const generatedRoot = path.join(root, 'src', 'generated');
  await fs.mkdir(publicRoot, { recursive: true });
  await fs.mkdir(generatedRoot, { recursive: true });
  await fs.mkdir(path.join(publicRoot, '.well-known'), { recursive: true });
  const sources: Record<string, Record<string, { path: string; content: string }[]>> = {};
  const registryItems = [];
  for (const manifest of result.manifests) {
    sources[manifest.id] = {};
    for (const framework of frameworks) {
      const definition = manifest.frameworks[framework];
      const closure = await collectSourceFiles(
        registryRoot,
        definition.source,
        manifest.style ? [manifest.style] : [],
      );
      const files = closure.map(({ path: sourcePath, content, name }) => ({
        path: sourcePath,
        content,
        target: `components/buildwithme/${manifest.id}/${name}`,
      }));
      files.push({
        path: 'shared/LICENSE',
        content: await fs.readFile(path.join(registryRoot, 'shared', 'LICENSE'), 'utf8'),
        target: `components/buildwithme/${manifest.id}/LICENSE`,
      });
      files.push({
        path: 'shared/THIRD_PARTY_NOTICES.md',
        content: await fs.readFile(path.join(root, 'THIRD_PARTY_NOTICES.md'), 'utf8'),
        target: `components/buildwithme/${manifest.id}/THIRD_PARTY_NOTICES.md`,
      });
      sources[manifest.id][framework] = files;
      const artifact = {
        $schema: 'https://ui.shadcn.com/schema/registry-item.json',
        name: manifest.id,
        type: 'registry:component',
        title: manifest.title,
        description: manifest.summary,
        author: manifest.provenance.creator.name,
        dependencies: Object.entries(definition.dependencies).map(
          ([name, version]) => `${name}@${version}`,
        ),
        files: files.map((file) => ({
          path: file.path,
          type: /\.(?:tsx|vue|svelte)$/.test(file.path) ? 'registry:component' : 'registry:file',
          content: file.content,
          target: file.target,
        })),
        meta: {
          framework,
          domains: manifest.domains,
          engines: manifest.engines,
          provenance: manifest.provenance,
        },
      };
      const route = path.join(publicRoot, 'r', framework);
      await fs.mkdir(route, { recursive: true });
      await fs.writeFile(
        path.join(route, `${manifest.id}.json`),
        `${JSON.stringify(artifact, null, 2)}\n`,
      );
      registryItems.push(artifact);
    }
  }
  const discovery = result.manifests.map(
    ({
      id,
      title,
      summary,
      domains,
      tags,
      status,
      engines,
      frameworks: support,
      installation,
      accessibility,
      provenance,
    }) => ({
      id,
      title,
      summary,
      domains,
      tags,
      status,
      engines,
      frameworks: Object.keys(support),
      frameworkVerification: Object.fromEntries(
        frameworks.map((framework) => [
          framework,
          support[framework].verification?.status ?? 'provisional',
        ]),
      ),
      installation,
      publication: { npm: false, source: true, copy: true },
      accessibility,
      provenance,
    }),
  );
  const legacyCategories: Record<string, string> = {
    actions: 'buttons',
    typography: 'text',
    layout: 'cards',
    navigation: 'navigation',
    backgrounds: 'backgrounds',
    'ai-chat': 'ai',
    forms: 'forms',
    'data-display': 'data',
    overlays: 'overlays',
    commerce: 'commerce',
    feedback: 'feedback',
  };
  const legacy = result.manifests.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.summary,
    category: legacyCategories[item.domains[0]] ?? item.domains[0],
    engine: item.engines[0],
    tags: item.tags,
    author: item.provenance.creator,
  }));
  await Promise.all([
    fs.writeFile(
      path.join(publicRoot, 'registry.json'),
      `${JSON.stringify({ schemaVersion: 2, name: 'buildwithme-ui', items: registryItems }, null, 2)}\n`,
    ),
    fs.writeFile(
      path.join(publicRoot, 'index.v2.json'),
      `${JSON.stringify({ schemaVersion: 2, items: discovery }, null, 2)}\n`,
    ),
    fs.writeFile(
      path.join(publicRoot, 'index.v1.json'),
      `${JSON.stringify({ schemaVersion: 1, items: legacy }, null, 2)}\n`,
    ),
    fs.writeFile(
      path.join(publicRoot, '.well-known', 'buildwithme.json'),
      `${JSON.stringify({ schemaVersion: 2, registry: '/registry.json', discovery: '/index.v2.json', frameworks }, null, 2)}\n`,
    ),
    fs.writeFile(
      path.join(generatedRoot, 'registry.json'),
      `${JSON.stringify(result.manifests, null, 2)}\n`,
    ),
    fs.writeFile(path.join(generatedRoot, 'sources.json'), `${JSON.stringify(sources, null, 2)}\n`),
    fs.writeFile(
      path.join(generatedRoot, 'previews.ts'),
      `// Generated by registry:build. Do not edit.\nexport const previewLoaders = {\n${result.manifests.map((item) => `  '${item.id}': () => import('../registry/designs/${item.id}/react'),`).join('\n')}\n} as const;\n`,
    ),
  ]);
  console.log(
    `Generated ${result.manifests.length} designs, ${registryItems.length} source artifacts, and the discovery index.`,
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const command = process.argv[2] ?? 'validate';
  if (command === 'build') await build();
  else {
    const result = await validateRegistry();
    if (result.errors.length) {
      console.error(result.errors.join('\n'));
      process.exitCode = 1;
    } else
      console.log(
        `Validated ${result.manifests.length} designs with React, Vue, and Svelte source coverage.`,
      );
  }
}
