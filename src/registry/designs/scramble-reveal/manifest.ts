import { defineManifest } from '../../schema';

export default defineManifest({
  schemaVersion: 2,
  id: 'scramble-reveal',
  title: 'Scramble reveal',
  summary: 'An original character reveal with a terminal-like rhythm.',
  domains: ['typography'],
  tags: ['text', 'animejs', 'scramble', 'reveal', 'typography'],
  status: 'stable',
  engines: ['animejs'],
  frameworks: {
    react: {
      source: 'designs/scramble-reveal/react.tsx',
      exportName: 'ScrambleReveal',
      usage:
        'import ScrambleReveal from "@/components/buildwithme/scramble-reveal/react";\n\n<ScrambleReveal />',
      dependencies: {
        animejs: '4.5.0',
      },
    },
    vue: {
      source: 'designs/scramble-reveal/vue.vue',
      exportName: 'ScrambleReveal',
      usage:
        '<script setup lang="ts">\nimport ScrambleReveal from "~/components/buildwithme/scramble-reveal/vue.vue";\n</script>\n\n<template>\n  <ScrambleReveal />\n</template>',
      dependencies: {
        animejs: '4.5.0',
      },
    },
    svelte: {
      source: 'designs/scramble-reveal/svelte.svelte',
      exportName: 'ScrambleReveal',
      usage:
        '<script lang="ts">\nimport ScrambleReveal from "$lib/components/buildwithme/scramble-reveal/svelte.svelte";\n</script>\n\n<ScrambleReveal />',
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
    {
      name: 'text',
      type: 'string',
      default: 'HELLO, BUILDER.',
      description: 'Text to resolve.',
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
  style: 'designs/scramble-reveal/scramble-reveal.css',
});
