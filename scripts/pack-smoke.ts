import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.join(process.cwd(), '.release');
for (const framework of ['react', 'vue', 'svelte']) {
  const directory = path.join(root, framework);
  const pkg = JSON.parse(await fs.readFile(path.join(directory, 'package.json'), 'utf8')) as { name: string; exports: Record<string, unknown> };
  if (pkg.name !== `@buildwithme/${framework}`) throw new Error(`${framework}: invalid package name`);
  const componentExports = Object.keys(pkg.exports).filter((key) => key !== '.' && key !== './styles.css');
  if (componentExports.length !== 40) throw new Error(`${framework}: expected 40 component exports, received ${componentExports.length}`);
  const files = await fs.readdir(path.join(directory, 'dist'));
  if (!files.length) throw new Error(`${framework}: empty package output`);
}
console.log('Verified React, Vue, and Svelte package manifests and 40 exports per framework.');
