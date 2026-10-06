import { defineManifest } from '../../schema';

export default defineManifest({
  schemaVersion: 2,
  id: 'adaptive-sidebar',
  title: 'Adaptive sidebar',
  summary: 'A responsive navigation rail that collapses without losing context.',
  domains: ['navigation'],
  tags: ['sidebar', 'responsive', 'navigation'],
  status: 'new',
  engines: ['css'],
  frameworks: {
    react: {
      source: 'designs/adaptive-sidebar/react.tsx',
      exportName: 'AdaptiveSidebar',
      usage:
        'import AdaptiveSidebar from "@/components/buildwithme/adaptive-sidebar/react";\n\n<AdaptiveSidebar />',
      dependencies: {},
    },
    vue: {
      source: 'designs/adaptive-sidebar/vue.vue',
      exportName: 'AdaptiveSidebar',
      usage:
        '<script setup lang="ts">\nimport AdaptiveSidebar from "~/components/buildwithme/adaptive-sidebar/vue.vue";\n</script>\n\n<template>\n  <AdaptiveSidebar />\n</template>',
      dependencies: {},
    },
    svelte: {
      source: 'designs/adaptive-sidebar/svelte.svelte',
      exportName: 'AdaptiveSidebar',
      usage:
        '<script lang="ts">\nimport AdaptiveSidebar from "$lib/components/buildwithme/adaptive-sidebar/svelte.svelte";\n</script>\n\n<AdaptiveSidebar />',
      dependencies: {},
    },
  },
  installation: {
    npm: true,
    source: true,
    copy: true,
  },
  accessibility: {
    summary: 'Uses semantic controls, visible focus, and motion-safe interaction.',
    features: ['Keyboard reachable controls', 'Visible focus treatment', 'Reduced-motion friendly'],
  },
  props: [
    {
      name: 'label',
      type: 'string',
      default: 'Adaptive sidebar',
      description: 'Accessible display label.',
    },
    {
      name: 'className',
      type: 'string',
      default: '',
      description: 'Additional root CSS class.',
    },
  ],
  provenance: {
    type: 'original',
    creator: {
      name: 'BuildWithMe-UI contributors',
    },
    license: 'MIT',
  },
  related: [],
  style: 'designs/adaptive-sidebar/adaptive-sidebar.css',
});
