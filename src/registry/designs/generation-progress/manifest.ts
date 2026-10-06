import { defineManifest } from '../../schema';

export default defineManifest({
  schemaVersion: 2,
  id: 'generation-progress',
  title: 'Generation progress',
  summary: 'Clear progress through a deterministic generation sequence.',
  domains: ['ai'],
  tags: ['ai', 'motion', 'generation', 'progress'],
  status: 'stable',
  engines: ['motion'],
  frameworks: {
    react: {
      source: 'designs/generation-progress/react.tsx',
      exportName: 'GenerationProgress',
      usage:
        'import GenerationProgress from "@/components/buildwithme/generation-progress/react";\n\n<GenerationProgress />',
      dependencies: {
        motion: '13.4.4',
      },
    },
    vue: {
      source: 'designs/generation-progress/vue.vue',
      exportName: 'GenerationProgress',
      usage:
        '<script setup lang="ts">\nimport GenerationProgress from "~/components/buildwithme/generation-progress/vue.vue";\n</script>\n\n<template>\n  <GenerationProgress />\n</template>',
      dependencies: {},
    },
    svelte: {
      source: 'designs/generation-progress/svelte.svelte',
      exportName: 'GenerationProgress',
      usage:
        '<script lang="ts">\nimport GenerationProgress from "$lib/components/buildwithme/generation-progress/svelte.svelte";\n</script>\n\n<GenerationProgress />',
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
  style: 'designs/generation-progress/generation-progress.css',
});
