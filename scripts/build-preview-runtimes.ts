import fs from 'node:fs/promises';
import path from 'node:path';
import { build } from 'vite';
import vue from '@vitejs/plugin-vue';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { validateRegistry } from './registry';

const root = process.cwd();
const buildRoot = path.join(root, '.preview-build');
const outputRoot = path.join(root, 'public', 'preview-runtime');

const bridge = `
const params = new URLSearchParams(location.search);
const id = params.get('id') || '';
let instance;
function send(type, detail) { parent.postMessage({ source: 'buildwithme-preview', framework: FRAMEWORK, id, type, detail }, location.origin); }
function applyTheme(theme) { document.documentElement.dataset.bwmTheme = theme; document.documentElement.style.colorScheme = theme; }
window.addEventListener('message', (event) => {
  if (event.origin !== location.origin || event.data?.source !== 'buildwithme-host') return;
  const message = event.data;
  if (message.type === 'theme') applyTheme(message.value);
  if (message.type === 'pause') document.body.dataset.paused = String(message.value);
  if (message.type === 'replay') mountSelected();
});
applyTheme(params.get('theme') === 'light' ? 'light' : 'dark');
`;

const previewCss = `
:root,[data-bwm-theme='dark']{--bwm-component-canvas:#050505;--bwm-component-panel:#10100f;--bwm-component-fg:#f4f1e8;--bwm-component-muted:#a6a49c;--bwm-component-border:#343431;--bwm-component-focus:#fff;color-scheme:dark}
[data-bwm-theme='light']{--bwm-component-canvas:#f3f0e8;--bwm-component-panel:#fcfaf3;--bwm-component-fg:#141412;--bwm-component-muted:#656159;--bwm-component-border:#cbc6ba;--bwm-component-focus:#0a0a09;color-scheme:light}
*{box-sizing:border-box}html,body,#app{width:100%;min-height:100%;margin:0}body{min-height:100vh;display:grid;place-items:center;padding:24px;background:var(--bwm-component-canvas);color:var(--bwm-component-fg);font-family:Arial,sans-serif}body[data-paused='true'] *,body[data-paused='true'] *::before,body[data-paused='true'] *::after{animation-play-state:paused!important}button,input,textarea{font:inherit}:focus-visible{outline:2px solid var(--bwm-component-focus);outline-offset:4px}@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}
`;

async function writeRuntime(framework: 'vue' | 'svelte', ids: string[]) {
  const directory = path.join(buildRoot, framework);
  await fs.mkdir(directory, { recursive: true });
  const extension = framework === 'vue' ? 'vue.vue' : 'svelte.svelte';
  const loaders = ids.map((id) => `  ${JSON.stringify(id)}: () => import(${JSON.stringify(`../../src/registry/designs/${id}/${extension}`)}),`).join('\n');
  const mountCode = framework === 'vue'
    ? `import { createApp } from 'vue';\nasync function mountSelected(){ try { if(instance) instance.unmount(); const loaded=await loaders[id]?.(); if(!loaded) throw new Error('Unknown component'); instance=createApp(loaded.default); instance.mount('#app'); send('ready'); } catch(error){ send('error', error instanceof Error ? error.message : String(error)); } }`
    : `import { mount, unmount } from 'svelte';\nasync function mountSelected(){ try { if(instance) await unmount(instance); document.querySelector('#app').replaceChildren(); const loaded=await loaders[id]?.(); if(!loaded) throw new Error('Unknown component'); instance=mount(loaded.default,{target:document.querySelector('#app')}); send('ready'); } catch(error){ send('error', error instanceof Error ? error.message : String(error)); } }`;
  await fs.writeFile(path.join(directory, 'preview.css'), previewCss);
  await fs.writeFile(path.join(directory, 'main.ts'), `import './preview.css';\nconst FRAMEWORK=${JSON.stringify(framework)};\nconst loaders={\n${loaders}\n};\n${bridge}\n${mountCode}\nmountSelected();\n`);
  await fs.writeFile(path.join(directory, 'index.html'), '<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>BuildWithMe preview</title></head><body><div id="app"></div><script type="module" src="/main.ts"></script></body></html>');
  await build({
    root: directory,
    base: `/preview-runtime/${framework}/`,
    publicDir: false,
    plugins: framework === 'vue' ? [vue()] : [svelte()],
    build: { outDir: path.join(outputRoot, framework), emptyOutDir: true, sourcemap: false, rollupOptions: { input: path.join(directory, 'index.html') } },
  });
}

const registry = await validateRegistry();
if (registry.errors.length) throw new Error(registry.errors.join('\n'));
const ids = registry.manifests.map((item) => item.id);
await fs.mkdir(outputRoot, { recursive: true });
await writeRuntime('vue', ids);
await writeRuntime('svelte', ids);
console.log(`Built isolated Vue and Svelte preview runtimes for ${ids.length} designs.`);
