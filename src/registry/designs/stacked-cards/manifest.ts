import { defineManifest } from '../../schema';

export default defineManifest({
  schemaVersion: 2,
  id: 'stacked-cards',
  title: 'Stacked cards',
  summary: 'A small deck of ideas. Shuffle to find your next one.',
  domains: ['layout'],
  tags: ['cards', 'motion', 'stacked', 'layout'],
  status: 'stable',
  engines: ['motion'],
  frameworks: {
    react: {
      source: 'designs/stacked-cards/react.tsx',
      exportName: 'StackedCards',
      usage:
        'import StackedCards from "@/components/buildwithme/stacked-cards/react";\n\n<StackedCards />',
      dependencies: {
        motion: '13.4.4',
      },
    },
    vue: {
      source: 'designs/stacked-cards/vue.vue',
      exportName: 'StackedCards',
      usage:
        '<script setup lang="ts">\nimport StackedCards from "~/components/buildwithme/stacked-cards/vue.vue";\n</script>\n\n<template>\n  <StackedCards />\n</template>',
      dependencies: {},
    },
    svelte: {
      source: 'designs/stacked-cards/svelte.svelte',
      exportName: 'StackedCards',
      usage:
        '<script lang="ts">\nimport StackedCards from "$lib/components/buildwithme/stacked-cards/svelte.svelte";\n</script>\n\n<StackedCards />',
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
  style: 'designs/stacked-cards/stacked-cards.css',
});
