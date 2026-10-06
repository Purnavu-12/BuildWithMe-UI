import { defineManifest } from '../../schema';

export default defineManifest({
  schemaVersion: 2,
  id: 'spotlight-card',
  title: 'Spotlight card',
  summary: 'A soft pool of light follows you across the surface.',
  domains: ['layout'],
  tags: ['cards', 'css', 'spotlight', 'card', 'layout'],
  status: 'stable',
  engines: ['css'],
  frameworks: {
    react: {
      source: 'designs/spotlight-card/react.tsx',
      exportName: 'SpotlightCard',
      usage:
        'import SpotlightCard from "@/components/buildwithme/spotlight-card/react";\n\n<SpotlightCard />',
      dependencies: {},
    },
    vue: {
      source: 'designs/spotlight-card/vue.vue',
      exportName: 'SpotlightCard',
      usage:
        '<script setup lang="ts">\nimport SpotlightCard from "~/components/buildwithme/spotlight-card/vue.vue";\n</script>\n\n<template>\n  <SpotlightCard />\n</template>',
      dependencies: {},
    },
    svelte: {
      source: 'designs/spotlight-card/svelte.svelte',
      exportName: 'SpotlightCard',
      usage:
        '<script lang="ts">\nimport SpotlightCard from "$lib/components/buildwithme/spotlight-card/svelte.svelte";\n</script>\n\n<SpotlightCard />',
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
    {
      name: 'children',
      type: 'ReactNode',
      default: 'example card content',
      description: 'Card content.',
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
  style: 'designs/spotlight-card/spotlight-card.css',
});
