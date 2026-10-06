import { defineManifest } from '../../schema';
export default defineManifest({
  schemaVersion: 2,
  id: 'glass-dock',
  title: 'Glass dock',
  summary: 'A compact floating navigation dock with tactile focus and hover magnification.',
  domains: ['navigation'],
  tags: ['dock', 'navigation', 'glass', 'adapted'],
  status: 'new',
  engines: ['css'],
  frameworks: {
    react: {
      source: 'designs/glass-dock/react.tsx',
      exportName: 'GlassDock',
      usage: 'import GlassDock from "@/components/buildwithme/glass-dock/react";\n\n<GlassDock />',
      dependencies: {},
    },
    vue: {
      source: 'designs/glass-dock/vue.vue',
      exportName: 'GlassDock',
      usage:
        '<script setup lang="ts">\nimport GlassDock from "~/components/buildwithme/glass-dock/vue.vue";\n</script>\n\n<template>\n  <GlassDock />\n</template>',
      dependencies: {},
    },
    svelte: {
      source: 'designs/glass-dock/svelte.svelte',
      exportName: 'GlassDock',
      usage:
        '<script lang="ts">\nimport GlassDock from "$lib/components/buildwithme/glass-dock/svelte.svelte";\n</script>\n\n<GlassDock />',
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
      default: 'Glass dock',
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
      'https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/glass-dock.tsx',
    upstreamAuthor: 'Ashutoshx7',
    upstreamLicense: 'MIT',
    modification:
      'Reimplemented as a dependency-light, monochrome, theme-aware design with React, Vue, and Svelte source variants and reduced-motion behavior. Kinetic Playground repair (2026-10-05): framework-native behavior, scoped motion lifecycle, complete source closure, and corrected source usage; original upstream notices retained.',
  },
  related: [],
  style: 'designs/glass-dock/glass-dock.css',
});
