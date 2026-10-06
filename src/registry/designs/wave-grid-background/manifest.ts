import { defineManifest } from '../../schema';
export default defineManifest({
  schemaVersion: 2,
  id: 'wave-grid-background',
  title: 'Wave grid background',
  summary: 'A lightweight CSS grid field that ripples through depth without a WebGL dependency.',
  domains: ['backgrounds'],
  tags: ['grid', 'wave', 'background', 'adapted'],
  status: 'new',
  engines: ['css'],
  frameworks: {
    react: {
      source: 'designs/wave-grid-background/react.tsx',
      exportName: 'WaveGridBackground',
      usage:
        'import WaveGridBackground from "@/components/buildwithme/wave-grid-background/react";\n\n<WaveGridBackground />',
      dependencies: {},
    },
    vue: {
      source: 'designs/wave-grid-background/vue.vue',
      exportName: 'WaveGridBackground',
      usage:
        '<script setup lang="ts">\nimport WaveGridBackground from "~/components/buildwithme/wave-grid-background/vue.vue";\n</script>\n\n<template>\n  <WaveGridBackground />\n</template>',
      dependencies: {},
    },
    svelte: {
      source: 'designs/wave-grid-background/svelte.svelte',
      exportName: 'WaveGridBackground',
      usage:
        '<script lang="ts">\nimport WaveGridBackground from "$lib/components/buildwithme/wave-grid-background/svelte.svelte";\n</script>\n\n<WaveGridBackground />',
      dependencies: {},
    },
  },
  installation: {
    npm: true,
    source: true,
    copy: true,
  },
  accessibility: {
    summary:
      'Uses semantic controls, visible focus, theme-aware contrast, and reduced-motion fallbacks.',
    features: [
      'Keyboard reachable controls',
      'Visible focus treatment',
      'Reduced-motion friendly',
      'Dark and light themes',
    ],
  },
  props: [
    {
      name: 'label',
      type: 'string',
      default: 'Wave grid background',
      description: 'Accessible display label.',
    },
    {
      name: 'paused',
      type: 'boolean',
      default: 'false',
      description: 'Pauses decorative animation.',
    },
  ],
  provenance: {
    type: 'adapted',
    creator: {
      name: 'BuildWithMe-UI contributors',
    },
    license: 'MIT',
    upstreamUrl:
      'https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/wave-grid-background.tsx',
    upstreamAuthor: 'Ashutoshx7',
    upstreamLicense: 'MIT',
    modification:
      'Reimplemented as a dependency-light, monochrome, theme-aware design with React, Vue, and Svelte source variants and reduced-motion behavior. Kinetic Playground repair (2026-10-05): framework-native behavior, scoped motion lifecycle, complete source closure, and corrected source usage; original upstream notices retained.',
  },
  related: [],
  style: 'designs/wave-grid-background/wave-grid-background.css',
});
