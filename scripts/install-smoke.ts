import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { compile } from 'svelte/compiler';
import { verifySourceInstall } from './verify-source-install';
import { validateRegistry } from './registry';
import { createInstallFixture } from './install-fixture';

const root = process.cwd();
const pnpmExecutable = process.env.npm_execpath;
if (!pnpmExecutable) throw new Error('Run this script through pnpm.');
const pnpmPath: string = pnpmExecutable;
async function run(args: string[], cwd = root) {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(process.execPath, [pnpmPath, ...args], {
      cwd,
      stdio: 'inherit',
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
    });
    child.on('error', reject);
    child.on('exit', (code: number | null) =>
      code === 0 ? resolve() : reject(new Error(`${args.join(' ')} failed (${code})`)),
    );
  });
}

await run(['packages:pack']);
const sourceInstall = await verifySourceInstall();
const authored = (await validateRegistry()).manifests;
function individualImports(framework: string) {
  return authored
    .map((item, index) => `import C${index} from '@buildwithme/${framework}/${item.id}';`)
    .join('\n');
}
const individualNames = authored.map((_, index) => `C${index}`).join(',');
const tarballs = await fs.readdir(path.join(root, '.release', 'tarballs'));
function packageTarball(framework: string) {
  const name = tarballs.find(
    (name) => name.startsWith(`buildwithme-${framework}-`) && name.endsWith('.tgz'),
  );
  if (!name) throw new Error(`Missing ${framework} tarball`);
  return `file:${path.join(root, '.release', 'tarballs', name).replaceAll('\\', '/')}`;
}
const registry = JSON.parse(
  await fs.readFile(path.join(root, 'public', 'registry.json'), 'utf8'),
) as { items: { name: string; files: { content: string }[]; meta: { framework: string } }[] };
const designCount = new Set(registry.items.map((item) => item.name)).size;
const artifactCount = designCount * 3;
if (registry.items.length !== artifactCount)
  throw new Error(
    `Expected ${artifactCount} registry artifacts; received ${registry.items.length}`,
  );
for (const item of registry.items) {
  for (const file of item.files) {
    if (!file.content.trim()) throw new Error(`${item.name}/${item.meta.framework}: empty source`);
    if (file.content.includes('@buildwithme/') || file.content.includes('../../shared/'))
      throw new Error(`${item.name}/${item.meta.framework}: workspace path leaked`);
  }
}

const packages = ['react', 'vue', 'svelte'];
for (const framework of packages) {
  const directory = path.join(root, '.release', framework);
  const pkg = JSON.parse(await fs.readFile(path.join(directory, 'package.json'), 'utf8')) as {
    exports: Record<string, unknown>;
  };
  if (
    Object.keys(pkg.exports).filter((key) => key !== '.' && key !== './styles.css').length !==
    designCount
  )
    throw new Error(`${framework}: package source coverage failed`);
}

const svelteDist = path.join(root, '.release', 'svelte', 'dist');
for (const file of (await fs.readdir(svelteDist)).filter((name) => name.endsWith('.svelte'))) {
  const source = await fs.readFile(path.join(svelteDist, file), 'utf8');
  compile(source, { filename: file, generate: 'client' });
}

await fs.mkdir(path.join(root, 'tmp'), { recursive: true });
const fixture = await createInstallFixture(root, 'react-package-');
await fs.writeFile(
  path.join(fixture, 'package.json'),
  JSON.stringify({
    name: 'buildwithme-react-smoke',
    private: true,
    scripts: { build: 'next build' },
    dependencies: {
      '@buildwithme/react': packageTarball('react'),
      next: '16.3.6',
      react: '19.3.0',
      'react-dom': '19.3.0',
      motion: '13.4.4',
      animejs: '4.5.0',
    },
    devDependencies: {
      typescript: '5.9.3',
      '@types/react': '19.2.7',
      '@types/react-dom': '19.2.3',
      '@types/node': '22.19.1',
    },
  }),
);
await fs.mkdir(path.join(fixture, 'app'), { recursive: true });
await fs.writeFile(
  path.join(fixture, 'app', 'layout.tsx'),
  "import '@buildwithme/react/styles.css';export default function Layout({children}:{children:React.ReactNode}){return <html><body>{children}</body></html>}",
);
await fs.writeFile(
  path.join(fixture, 'app', 'page.tsx'),
  `import * as UI from '@buildwithme/react';${individualImports('react')}const individual=[${individualNames}];export default function Page(){return <main><h1>${designCount} components installed</h1>{Object.entries(UI).map(([name,Component])=><section key={name}><h2>{name}</h2><Component /></section>)}{individual.map((Component,index)=><section key={index}><Component/></section>)}</main>}`,
);
await fs.writeFile(
  path.join(fixture, 'tsconfig.json'),
  JSON.stringify({
    compilerOptions: {
      target: 'ES2022',
      lib: ['dom', 'esnext'],
      strict: true,
      noEmit: true,
      module: 'esnext',
      moduleResolution: 'bundler',
      jsx: 'react-jsx',
      skipLibCheck: true,
      plugins: [{ name: 'next' }],
    },
    include: ['**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
    exclude: ['node_modules'],
  }),
);
await fs.writeFile(
  path.join(fixture, 'next.config.mjs'),
  'export default {turbopack:{root:process.cwd()}};',
);
await run(['install', '--no-frozen-lockfile'], fixture);
await run(['build'], fixture);

const vuePackage = packageTarball('vue');
const nuxtFixture = await createInstallFixture(root, 'nuxt-package-');
await fs.writeFile(
  path.join(nuxtFixture, 'package.json'),
  JSON.stringify({
    name: 'buildwithme-vue-smoke',
    private: true,
    scripts: { build: 'nuxt build' },
    dependencies: { '@buildwithme/vue': vuePackage, nuxt: '4.5.2', vue: '3.5.43' },
  }),
);
await fs.writeFile(
  path.join(nuxtFixture, 'nuxt.config.ts'),
  "export default defineNuxtConfig({devtools:{enabled:false},compatibilityDate:'2026-09-26'});",
);
await fs.writeFile(
  path.join(nuxtFixture, 'app.vue'),
  `<script setup lang="ts">import * as UI from '@buildwithme/vue';${individualImports('vue')}import '@buildwithme/vue/styles.css';const components=Object.entries(UI);const individual=[${individualNames}];</script><template><main><h1>{{components.length}} components installed</h1><section v-for="[name,Component] in components" :key="name"><h2>{{name}}</h2><component :is="Component"/></section><component v-for="(Component,index) in individual" :key="index" :is="Component"/></main></template>`,
);
await run(['install', '--no-frozen-lockfile'], nuxtFixture);
await run(['build'], nuxtFixture);

const sveltePackage = packageTarball('svelte');
const svelteKitFixture = await createInstallFixture(root, 'sveltekit-package-');
await fs.writeFile(
  path.join(svelteKitFixture, 'package.json'),
  JSON.stringify({
    name: 'buildwithme-svelte-smoke',
    private: true,
    type: 'module',
    scripts: { build: 'vite build' },
    dependencies: { '@buildwithme/svelte': sveltePackage },
    devDependencies: {
      '@sveltejs/adapter-auto': '7.0.1',
      '@sveltejs/kit': '2.70.3',
      svelte: '5.57.1',
      vite: '8.3.1',
    },
  }),
);
await fs.writeFile(
  path.join(svelteKitFixture, 'svelte.config.js'),
  "import adapter from '@sveltejs/adapter-auto';export default {kit:{adapter:adapter()}};",
);
await fs.writeFile(
  path.join(svelteKitFixture, 'vite.config.ts'),
  "import {sveltekit} from '@sveltejs/kit/vite';import {defineConfig} from 'vite';export default defineConfig({plugins:[sveltekit()]});",
);
await fs.mkdir(path.join(svelteKitFixture, 'src', 'routes'), { recursive: true });
await fs.writeFile(
  path.join(svelteKitFixture, 'src', 'app.html'),
  '<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width"/>%sveltekit.head%</head><body data-sveltekit-preload-data="hover"><div style="display: contents">%sveltekit.body%</div></body></html>',
);
await fs.writeFile(
  path.join(svelteKitFixture, 'src', 'routes', '+page.svelte'),
  `<script lang="ts">import * as UI from '@buildwithme/svelte';${individualImports('svelte')}const components=Object.entries(UI);const individual=[${individualNames}];</script><svelte:head><title>BuildWithMe smoke</title></svelte:head><main><h1>{components.length} components installed</h1>{#each components as [name,Component] (name)}<section><h2>{name}</h2><Component/></section>{/each}{#each individual as Component,index (index)}<Component/>{/each}</main>`,
);
await run(['install', '--no-frozen-lockfile'], svelteKitFixture);
await run(['build'], svelteKitFixture);

await fs.writeFile(
  path.join(root, 'tmp', 'install-smoke-result.json'),
  JSON.stringify(
    {
      designs: designCount,
      sourceArtifacts: artifactCount,
      packages,
      sourceInstall,
      fixtures: { next: fixture, nuxt: nuxtFixture, sveltekit: svelteKitFixture },
      passed: true,
    },
    null,
    2,
  ),
);
console.log(
  `PASS: ${artifactCount} source artifacts, three ${designCount}-export packages, Svelte compilation, and clean Next.js, Nuxt, and SvelteKit package builds.`,
);
