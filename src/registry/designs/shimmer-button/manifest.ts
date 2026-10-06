import { defineManifest } from '../../schema';

export default defineManifest({
  schemaVersion: 2,
  id: 'shimmer-button',
  title: 'Shimmer button',
  summary: 'A quiet sweep of light across a beautifully simple action.',
  domains: ['actions'],
  tags: ['buttons', 'css', 'shimmer', 'button', 'actions'],
  status: 'stable',
  engines: ['css'],
  frameworks: {
    react: {
      source: 'designs/shimmer-button/react.tsx',
      exportName: 'ShimmerButton',
      usage:
        'import ShimmerButton from "@/components/buildwithme/shimmer-button/react";\n\n<ShimmerButton />',
      dependencies: {},
    },
    vue: {
      source: 'designs/shimmer-button/vue.vue',
      exportName: 'ShimmerButton',
      usage:
        '<script setup lang="ts">\nimport ShimmerButton from "~/components/buildwithme/shimmer-button/vue.vue";\n</script>\n\n<template>\n  <ShimmerButton />\n</template>',
      dependencies: {},
    },
    svelte: {
      source: 'designs/shimmer-button/svelte.svelte',
      exportName: 'ShimmerButton',
      usage:
        '<script lang="ts">\nimport ShimmerButton from "$lib/components/buildwithme/shimmer-button/svelte.svelte";\n</script>\n\n<ShimmerButton />',
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
      name: 'label',
      type: 'string',
      default: 'Make something great',
      description: 'Button text.',
    },
    {
      name: 'onClick',
      type: '() => void',
      default: 'undefined',
      description: 'Action callback.',
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
  style: 'designs/shimmer-button/shimmer-button.css',
});
