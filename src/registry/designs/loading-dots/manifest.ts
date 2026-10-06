import { defineManifest } from '../../schema';
export default defineManifest({
  schemaVersion: 2,
  id: 'loading-dots',
  title: 'Loading dots',
  summary: 'A compact status indicator with staggered, motion-safe dots.',
  domains: ['feedback'],
  tags: ['loading', 'status', 'dots', 'adapted'],
  status: 'new',
  engines: ['css'],
  frameworks: {
    react: {
      source: 'designs/loading-dots/react.tsx',
      exportName: 'LoadingDots',
      usage:
        'import LoadingDots from "@/components/buildwithme/loading-dots/react";\n\n<LoadingDots />',
      dependencies: {},
    },
    vue: {
      source: 'designs/loading-dots/vue.vue',
      exportName: 'LoadingDots',
      usage:
        '<script setup lang="ts">\nimport LoadingDots from "~/components/buildwithme/loading-dots/vue.vue";\n</script>\n\n<template>\n  <LoadingDots />\n</template>',
      dependencies: {},
    },
    svelte: {
      source: 'designs/loading-dots/svelte.svelte',
      exportName: 'LoadingDots',
      usage:
        '<script lang="ts">\nimport LoadingDots from "$lib/components/buildwithme/loading-dots/svelte.svelte";\n</script>\n\n<LoadingDots />',
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
      default: 'Loading dots',
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
      'https://github.com/vercel/examples/blob/main/internal/packages/ui/src/loading-dots.tsx',
    upstreamAuthor: 'Vercel, Inc.',
    upstreamLicense: 'MIT',
    modification:
      'Reimplemented as a dependency-light, monochrome, theme-aware design with React, Vue, and Svelte source variants and reduced-motion behavior. Kinetic Playground repair (2026-10-05): framework-native behavior, scoped motion lifecycle, complete source closure, and corrected source usage; original upstream notices retained.',
  },
  related: [],
  style: 'designs/loading-dots/loading-dots.css',
});
