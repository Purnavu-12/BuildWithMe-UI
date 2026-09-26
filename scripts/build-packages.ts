import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { build as tsupBuild } from 'tsup';
import { build as viteBuild } from 'vite';
import vue from '@vitejs/plugin-vue';
import { validateRegistry } from './registry';

const root = process.cwd();
const releaseRoot = path.join(root, '.release');
const registryRoot = path.join(root, 'src', 'registry');
const releaseVersion = (JSON.parse(await fs.readFile(path.join(root, 'package.json'), 'utf8')) as { version: string }).version;

async function copy(source: string, target: string) {
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.copyFile(source, target);
}

function packageJson(name: string, exports: Record<string, unknown>, peers: Record<string, string>, dependencies: Record<string, string> = {}) {
  return { name: `@buildwithme/${name}`, version: releaseVersion, type: 'module', sideEffects: ['**/*.css'], files: ['dist', 'README.md', 'LICENSE', 'THIRD_PARTY_NOTICES.md'], exports, peerDependencies: peers, dependencies, license: 'MIT', repository: process.env.NEXT_PUBLIC_REPOSITORY_URL || 'https://github.com/Purnavu-12/BuildWithMe-UI' };
}

function frameworkDependencies(framework: 'react' | 'vue' | 'svelte') {
  return Object.assign({}, ...result.manifests.map((item) => item.frameworks[framework].dependencies));
}

await fs.rm(releaseRoot, { recursive: true, force: true });
await fs.mkdir(releaseRoot, { recursive: true });
const result = await validateRegistry();
if (result.errors.length) throw new Error(result.errors.join('\n'));

const reactRoot = path.join(releaseRoot, 'react');
const reactEntries: Record<string, string> = {};
const reactExports: Record<string, unknown> = { '.': { types: './dist/index.d.ts', import: './dist/index.js' }, './styles.css': './dist/styles.css' };
const reactIndex: string[] = ["'use client';"];
await copy(path.join(registryRoot, 'shared', 'base.css'), path.join(reactRoot, 'src', 'shared', 'base.css'));
await copy(path.join(registryRoot, 'shared', 'use-animation.ts'), path.join(reactRoot, 'src', 'shared', 'use-animation.ts'));
for (const item of result.manifests) {
  const directory = path.join(reactRoot, 'src', 'designs', item.id);
  await copy(path.join(registryRoot, item.frameworks.react.source), path.join(directory, 'react.tsx'));
  if (item.style) await copy(path.join(registryRoot, item.style), path.join(directory, path.basename(item.style)));
  const entry = path.join(reactRoot, 'src', `${item.id}.ts`);
  await fs.writeFile(entry, `export { default } from './designs/${item.id}/react';\n`);
  reactEntries[item.id] = entry;
  reactIndex.push(`export { default as ${item.frameworks.react.exportName} } from './designs/${item.id}/react';`);
  reactExports[`./${item.id}`] = { types: `./dist/${item.id}.d.ts`, import: `./dist/${item.id}.js` };
}
await fs.writeFile(path.join(reactRoot, 'src', 'index.ts'), `${reactIndex.join('\n')}\n`);
reactEntries.index = path.join(reactRoot, 'src', 'index.ts');
await tsupBuild({ entry: reactEntries, outDir: path.join(reactRoot, 'dist'), format: ['esm'], dts: false, splitting: true, sourcemap: true, clean: true, tsconfig: path.join(root, 'scripts', 'tsconfig.package.json'), external: ['react', 'react-dom', 'motion', 'animejs'], silent: true });
const reactTypes = spawnSync(process.execPath, [path.join(root, 'node_modules', 'typescript', 'bin', 'tsc'), '--project', path.join(root, 'scripts', 'tsconfig.package.json'), '--emitDeclarationOnly', '--declaration', '--declarationDir', path.join(reactRoot, 'dist'), '--rootDir', path.join(reactRoot, 'src')], { cwd: root, stdio: 'inherit' });
if (reactTypes.status !== 0) throw new Error(`React declaration build failed${reactTypes.error ? `: ${reactTypes.error.message}` : ''}`);
const reactStyles = await Promise.all([path.join(registryRoot, 'shared', 'base.css'), ...result.manifests.flatMap((item) => item.style ? [path.join(registryRoot, item.style)] : [])].map((file) => fs.readFile(file, 'utf8')));
await fs.writeFile(path.join(reactRoot, 'dist', 'styles.css'), reactStyles.join('\n'));
await fs.writeFile(path.join(reactRoot, 'package.json'), `${JSON.stringify(packageJson('react', reactExports, { react: '>=19', 'react-dom': '>=19' }, frameworkDependencies('react')), null, 2)}\n`);

const vueRoot = path.join(releaseRoot, 'vue');
const vueInput: Record<string, string> = {};
const vueExports: Record<string, unknown> = { '.': { types: './dist/types/index.d.ts', import: './dist/index.js' }, './styles.css': './dist/buildwithme-ui.css' };
const vueIndex: string[] = [];
for (const item of result.manifests) {
  const target = path.join(vueRoot, 'src', `${item.id}.vue`);
  await copy(path.join(registryRoot, item.frameworks.vue.source), target);
  vueInput[item.id] = target;
  vueIndex.push(`export { default as ${item.frameworks.vue.exportName} } from './${item.id}.vue';`);
  vueExports[`./${item.id}`] = { types: `./dist/types/${item.id}.vue.d.ts`, import: `./dist/${item.id}.js` };
}
await fs.writeFile(path.join(vueRoot, 'src', 'index.ts'), `${vueIndex.join('\n')}\n`);
vueInput.index = path.join(vueRoot, 'src', 'index.ts');
await viteBuild({ configFile: false, publicDir: false, plugins: [vue()], logLevel: 'warn', build: { outDir: path.join(vueRoot, 'dist'), emptyOutDir: true, lib: { entry: vueInput, formats: ['es'], cssFileName: 'buildwithme-ui' }, rollupOptions: { external: ['vue'], output: { entryFileNames: '[name].js', chunkFileNames: 'chunks/[name]-[hash].js' } } } });
await fs.writeFile(path.join(vueRoot, 'tsconfig.json'), `${JSON.stringify({ compilerOptions: { target: 'ES2022', module: 'ESNext', moduleResolution: 'Bundler', strict: true, skipLibCheck: true, declaration: true, emitDeclarationOnly: true, outDir: './dist/types' }, include: ['./src/**/*.ts', './src/**/*.vue'] }, null, 2)}\n`);
const vueTypes = spawnSync(process.execPath, [path.join(root, 'node_modules', 'vue-tsc', 'bin', 'vue-tsc.js'), '--project', path.join(vueRoot, 'tsconfig.json')], { cwd: vueRoot, stdio: 'inherit' });
if (vueTypes.status !== 0) throw new Error(`Vue declaration build failed${vueTypes.error ? `: ${vueTypes.error.message}` : ''}`);
await fs.writeFile(path.join(vueRoot, 'package.json'), `${JSON.stringify(packageJson('vue', vueExports, { vue: '>=3.5' }, frameworkDependencies('vue')), null, 2)}\n`);

const svelteRoot = path.join(releaseRoot, 'svelte');
const svelteExports: Record<string, unknown> = { '.': { types: './dist/index.d.ts', svelte: './dist/index.js', default: './dist/index.js' } };
const svelteIndex: string[] = [];
for (const item of result.manifests) {
  await copy(path.join(registryRoot, item.frameworks.svelte.source), path.join(svelteRoot, 'src', `${item.id}.svelte`));
  svelteIndex.push(`export { default as ${item.frameworks.svelte.exportName} } from './${item.id}.svelte';`);
  svelteExports[`./${item.id}`] = { types: `./dist/${item.id}.svelte.d.ts`, svelte: `./dist/${item.id}.svelte`, default: `./dist/${item.id}.svelte` };
}
await fs.writeFile(path.join(svelteRoot, 'src', 'index.ts'), `${svelteIndex.join('\n')}\n`);
await fs.writeFile(path.join(svelteRoot, 'tsconfig.json'), `${JSON.stringify({ compilerOptions: { target: 'ES2022', module: 'ESNext', moduleResolution: 'Bundler', strict: true, skipLibCheck: true, declaration: true }, include: ['./src/**/*'] }, null, 2)}\n`);
await fs.writeFile(path.join(svelteRoot, 'package.json'), `${JSON.stringify(packageJson('svelte', svelteExports, { svelte: '>=5.0' }, frameworkDependencies('svelte')), null, 2)}\n`);
const svelte = spawnSync(process.execPath, [path.join(root, 'node_modules', '@sveltejs', 'package', 'svelte-package.js'), '--input', 'src', '--output', 'dist', '--types', '--tsconfig', 'tsconfig.json'], { cwd: svelteRoot, stdio: 'inherit' });
if (svelte.status !== 0) throw new Error(`Svelte package build failed${svelte.error ? `: ${svelte.error.message}` : ''}`);

for (const name of ['react', 'vue', 'svelte']) {
  await fs.writeFile(path.join(releaseRoot, name, 'README.md'), `# @buildwithme/${name}\n\n${name[0].toUpperCase()}${name.slice(1)} framework sources generated from the BuildWithMe-UI registry.\n`);
  await copy(path.join(root, 'LICENSE'), path.join(releaseRoot, name, 'LICENSE'));
  await copy(path.join(root, 'THIRD_PARTY_NOTICES.md'), path.join(releaseRoot, name, 'THIRD_PARTY_NOTICES.md'));
}
console.log(`Built three publication folders with ${result.manifests.length} component exports each.`);
