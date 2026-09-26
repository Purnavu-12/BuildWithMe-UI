import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.join(process.cwd(), '.release');
const discovery = JSON.parse(await fs.readFile(path.join(process.cwd(), 'public', 'index.v2.json'), 'utf8')) as { items: unknown[] };
const expected = discovery.items.length;
for (const framework of ['react', 'vue', 'svelte']) {
  const directory = path.join(root, framework);
  const pkg = JSON.parse(await fs.readFile(path.join(directory, 'package.json'), 'utf8')) as { name: string; exports: Record<string, unknown> };
  if (pkg.name !== `@buildwithme/${framework}`) throw new Error(`${framework}: invalid package name`);
  const componentExports = Object.keys(pkg.exports).filter((key) => key !== '.' && key !== './styles.css');
  if (componentExports.length !== expected) throw new Error(`${framework}: expected ${expected} component exports, received ${componentExports.length}`);
  const files = await fs.readdir(path.join(directory, 'dist'));
  if (!files.length) throw new Error(`${framework}: empty package output`);
}
console.log(`Verified React, Vue, and Svelte package manifests and ${expected} exports per framework.`);
