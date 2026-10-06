import { defineManifest } from '../../schema';

export default defineManifest({
  schemaVersion: 2,
  id: 'flowing-lines',
  title: 'Flowing lines',
  summary: 'A sequence of luminous lines, moving with a shared rhythm.',
  domains: ['backgrounds'],
  tags: ['backgrounds', 'animejs', 'flowing', 'lines'],
  status: 'stable',
  engines: ['animejs'],
  frameworks: {
    react: {
      source: 'designs/flowing-lines/react.tsx',
      exportName: 'FlowingLines',
      usage:
        'import FlowingLines from "@/components/buildwithme/flowing-lines/react";\n\n<FlowingLines />',
      dependencies: {
        animejs: '4.5.0',
      },
    },
    vue: {
      source: 'designs/flowing-lines/vue.vue',
      exportName: 'FlowingLines',
      usage:
        '<script setup lang="ts">\nimport FlowingLines from "~/components/buildwithme/flowing-lines/vue.vue";\n</script>\n\n<template>\n  <FlowingLines />\n</template>',
      dependencies: {
        animejs: '4.5.0',
      },
    },
    svelte: {
      source: 'designs/flowing-lines/svelte.svelte',
      exportName: 'FlowingLines',
      usage:
        '<script lang="ts">\nimport FlowingLines from "$lib/components/buildwithme/flowing-lines/svelte.svelte";\n</script>\n\n<FlowingLines />',
      dependencies: {
        animejs: '4.5.0',
      },
    },
  },
  installation: {
    npm: true,
    source: true,
    copy: true,
  },
  accessibility: {
    summary:
      'Respects prefers-reduced-motion; pauses when off screen or the document is hidden. Interactive controls support keyboard focus. Use paused to stop the demonstration.',
    features: ['Keyboard reachable controls', 'Visible focus treatment', 'Reduced-motion friendly'],
  },
  props: [
    {
      name: 'paused',
      type: 'boolean',
      default: 'false',
      description: 'Pause decorative animation while retaining interactive controls.',
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
  style: 'designs/flowing-lines/flowing-lines.css',
});
