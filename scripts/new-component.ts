import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { domains, engines, type Domain } from '../src/registry/schema';

const pascal = (id: string) => id.split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join('');
export async function scaffold(root: string, id: string, domain = 'layout', engine = 'css') {
  if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(id)) throw new Error('ID must be kebab-case.');
  if (!domains.includes(domain as Domain)) throw new Error(`Invalid domain. Choose: ${domains.join(', ')}`);
  if (!engines.includes(engine as (typeof engines)[number])) throw new Error(`Invalid engine. Choose: ${engines.join(', ')}`);
  const directory = path.join(root, 'src', 'registry', 'designs', id);
  try { await fs.access(directory); throw new Error(`${id} already exists.`); } catch (error) { if (error instanceof Error && error.message.includes('already exists')) throw error; }
  await fs.mkdir(directory, { recursive: true });
  const name = pascal(id); const title = id.split('-').map((part)=>part[0].toUpperCase()+part.slice(1)).join(' ');
  await fs.writeFile(path.join(directory, 'react.tsx'), `// MIT · Your GitHub handle. Original implementation.\n'use client';\nexport default function ${name}({ label = '${title}' }: { label?: string }) {\n  return <div className="bwm-surface"><strong>{label}</strong></div>;\n}\n`);
  await fs.writeFile(path.join(directory, 'vue.vue'), `<script setup lang="ts">\nwithDefaults(defineProps<{ label?: string }>(), { label: '${title}' });\n</script>\n<template><div class="bwm-surface"><strong>{{ label }}</strong></div></template>\n`);
  await fs.writeFile(path.join(directory, 'svelte.svelte'), `<script lang="ts">let { label = '${title}' }: { label?: string } = $props();</script>\n<div class="bwm-surface"><strong>{label}</strong></div>\n`);
  const manifest = { schemaVersion: 2, id, title, summary: 'Describe what this design helps someone accomplish.', domains: [domain], tags: [domain, id], status: 'experimental', engines: [engine], frameworks: { react: { source: `designs/${id}/react.tsx`, exportName: name, usage: `import { ${name} } from '@buildwithme/react';\\n\\n<${name} />`, dependencies: {}, verification: { status: 'provisional', capabilities: { props: false, events: false, composition: false, keyboard: false, labels: false, state: false, reducedMotion: false, styling: false, errorRecovery: false } } }, vue: { source: `designs/${id}/vue.vue`, exportName: name, usage: `import { ${name} } from '@buildwithme/vue';\\n\\n<${name} />`, dependencies: {}, verification: { status: 'provisional', capabilities: { props: false, events: false, composition: false, keyboard: false, labels: false, state: false, reducedMotion: false, styling: false, errorRecovery: false } } }, svelte: { source: `designs/${id}/svelte.svelte`, exportName: name, usage: `import { ${name} } from '@buildwithme/svelte';\\n\\n<${name} />`, dependencies: {}, verification: { status: 'provisional', capabilities: { props: false, events: false, composition: false, keyboard: false, labels: false, state: false, reducedMotion: false, styling: false, errorRecovery: false } } } }, installation: { npm: false, source: true, copy: true }, accessibility: { summary: 'Describe keyboard, screen-reader, and motion behavior.', features: ['Keyboard reachable controls'] }, props: [{ name: 'label', type: 'string', default: title, description: 'Accessible display label.' }], provenance: { type: 'original', creator: { name: 'Your GitHub handle' }, license: 'MIT' }, related: [] };
  await fs.writeFile(path.join(directory, 'manifest.ts'), `import { defineManifest } from '../../schema';\n\nexport default defineManifest(${JSON.stringify(manifest,null,2)});\n`);
  return directory;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const [id, domain, engine] = process.argv.slice(2); if (!id) throw new Error('Usage: pnpm component:new <id> [domain] [engine]');
  console.log(`Created ${await scaffold(process.cwd(), id, domain, engine)}`);
}
