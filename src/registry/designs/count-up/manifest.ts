import { defineManifest } from '../../schema';

export default defineManifest({
  schemaVersion: 2,
  id: 'count-up',
  title: 'Count-up',
  summary: 'A number with a little more momentum.',
  domains: ['typography'],
  tags: ['text', 'animejs', 'count', 'up', 'typography'],
  status: 'stable',
  engines: ['animejs'],
  frameworks: {
    react: {
      source: 'designs/count-up/react.tsx',
      exportName: 'CountUp',
      usage: 'import CountUp from "@/components/buildwithme/count-up/react";\n\n<CountUp />',
      dependencies: {
        animejs: '4.5.0',
      },
    },
    vue: {
      source: 'designs/count-up/vue.vue',
      exportName: 'CountUp',
      usage:
        '<script setup lang="ts">\nimport CountUp from "~/components/buildwithme/count-up/vue.vue";\n</script>\n\n<template>\n  <CountUp />\n</template>',
      dependencies: {
        animejs: '4.5.0',
      },
    },
    svelte: {
      source: 'designs/count-up/svelte.svelte',
      exportName: 'CountUp',
      usage:
        '<script lang="ts">\nimport CountUp from "$lib/components/buildwithme/count-up/svelte.svelte";\n</script>\n\n<CountUp />',
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
      name: 'value',
      type: 'number',
      default: '2048',
      description: 'Final number.',
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
  style: 'designs/count-up/count-up.css',
});
