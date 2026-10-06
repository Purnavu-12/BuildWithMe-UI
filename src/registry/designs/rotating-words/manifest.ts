import { defineManifest } from '../../schema';

export default defineManifest({
  schemaVersion: 2,
  id: 'rotating-words',
  title: 'Rotating words',
  summary: 'One sentence. A whole world of possibilities.',
  domains: ['typography'],
  tags: ['text', 'motion', 'rotating', 'words', 'typography'],
  status: 'stable',
  engines: ['motion'],
  frameworks: {
    react: {
      source: 'designs/rotating-words/react.tsx',
      exportName: 'RotatingWords',
      usage:
        'import RotatingWords from "@/components/buildwithme/rotating-words/react";\n\n<RotatingWords />',
      dependencies: {
        motion: '13.4.4',
      },
    },
    vue: {
      source: 'designs/rotating-words/vue.vue',
      exportName: 'RotatingWords',
      usage:
        '<script setup lang="ts">\nimport RotatingWords from "~/components/buildwithme/rotating-words/vue.vue";\n</script>\n\n<template>\n  <RotatingWords />\n</template>',
      dependencies: {},
    },
    svelte: {
      source: 'designs/rotating-words/svelte.svelte',
      exportName: 'RotatingWords',
      usage:
        '<script lang="ts">\nimport RotatingWords from "$lib/components/buildwithme/rotating-words/svelte.svelte";\n</script>\n\n<RotatingWords />',
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
      name: 'words',
      type: 'string[]',
      default: 'beautiful., accessible., yours.',
      description: 'Words to rotate. Empty arrays show a static fallback.',
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
  style: 'designs/rotating-words/rotating-words.css',
});
