import { defineManifest } from '../../schema';

export default defineManifest({
  schemaVersion: 2,
  id: 'expandable-card',
  title: 'Expandable card',
  summary: 'A compact card that makes room for the whole story.',
  domains: ['layout'],
  tags: ['cards', 'motion', 'expandable', 'card', 'layout'],
  status: 'stable',
  engines: ['motion'],
  frameworks: {
    react: {
      source: 'designs/expandable-card/react.tsx',
      exportName: 'ExpandableCard',
      usage:
        'import ExpandableCard from "@/components/buildwithme/expandable-card/react";\n\n<ExpandableCard />',
      dependencies: {
        motion: '13.4.4',
      },
    },
    vue: {
      source: 'designs/expandable-card/vue.vue',
      exportName: 'ExpandableCard',
      usage:
        '<script setup lang="ts">\nimport ExpandableCard from "~/components/buildwithme/expandable-card/vue.vue";\n</script>\n\n<template>\n  <ExpandableCard />\n</template>',
      dependencies: {},
    },
    svelte: {
      source: 'designs/expandable-card/svelte.svelte',
      exportName: 'ExpandableCard',
      usage:
        '<script lang="ts">\nimport ExpandableCard from "$lib/components/buildwithme/expandable-card/svelte.svelte";\n</script>\n\n<ExpandableCard />',
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
  style: 'designs/expandable-card/expandable-card.css',
});
