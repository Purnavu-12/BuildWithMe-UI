import { defineManifest } from '../../schema';

export default defineManifest({
  schemaVersion: 2,
  id: 'underline-reveal',
  title: 'Underline reveal',
  summary: 'An expressive underline for the words that matter.',
  domains: ['typography'],
  tags: ['text', 'css', 'underline', 'reveal', 'typography'],
  status: 'stable',
  engines: ['css'],
  frameworks: {
    react: {
      source: 'designs/underline-reveal/react.tsx',
      exportName: 'UnderlineReveal',
      usage:
        'import UnderlineReveal from "@/components/buildwithme/underline-reveal/react";\n\n<UnderlineReveal />',
      dependencies: {},
    },
    vue: {
      source: 'designs/underline-reveal/vue.vue',
      exportName: 'UnderlineReveal',
      usage:
        '<script setup lang="ts">\nimport UnderlineReveal from "~/components/buildwithme/underline-reveal/vue.vue";\n</script>\n\n<template>\n  <UnderlineReveal />\n</template>',
      dependencies: {},
    },
    svelte: {
      source: 'designs/underline-reveal/svelte.svelte',
      exportName: 'UnderlineReveal',
      usage:
        '<script lang="ts">\nimport UnderlineReveal from "$lib/components/buildwithme/underline-reveal/svelte.svelte";\n</script>\n\n<UnderlineReveal />',
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
      name: 'text',
      type: 'string',
      default: 'Make your mark.',
      description: 'Highlighted text.',
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
  style: 'designs/underline-reveal/underline-reveal.css',
});
