import { defineManifest } from '../../schema';

export default defineManifest({
  schemaVersion: 2,
  id: 'tilt-card',
  title: 'Tilt card',
  summary: 'A dimensional card with a springy return to center.',
  domains: ['layout'],
  tags: ['cards', 'motion', 'tilt', 'card', 'layout'],
  status: 'stable',
  engines: ['motion'],
  frameworks: {
    react: {
      source: 'designs/tilt-card/react.tsx',
      exportName: 'TiltCard',
      usage: 'import TiltCard from "@/components/buildwithme/tilt-card/react";\n\n<TiltCard />',
      dependencies: {
        motion: '13.4.4',
      },
    },
    vue: {
      source: 'designs/tilt-card/vue.vue',
      exportName: 'TiltCard',
      usage:
        '<script setup lang="ts">\nimport TiltCard from "~/components/buildwithme/tilt-card/vue.vue";\n</script>\n\n<template>\n  <TiltCard />\n</template>',
      dependencies: {},
    },
    svelte: {
      source: 'designs/tilt-card/svelte.svelte',
      exportName: 'TiltCard',
      usage:
        '<script lang="ts">\nimport TiltCard from "$lib/components/buildwithme/tilt-card/svelte.svelte";\n</script>\n\n<TiltCard />',
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
  style: 'designs/tilt-card/tilt-card.css',
});
