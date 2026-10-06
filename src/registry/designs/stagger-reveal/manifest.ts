import { defineManifest } from '../../schema';

export default defineManifest({
  schemaVersion: 2,
  id: 'stagger-reveal',
  title: 'Stagger reveal',
  summary: 'Typography that arrives one word at a time.',
  domains: ['typography'],
  tags: ['text', 'animejs', 'stagger', 'reveal', 'typography'],
  status: 'stable',
  engines: ['animejs'],
  frameworks: {
    react: {
      source: 'designs/stagger-reveal/react.tsx',
      exportName: 'StaggerReveal',
      usage:
        'import StaggerReveal from "@/components/buildwithme/stagger-reveal/react";\n\n<StaggerReveal />',
      dependencies: {
        animejs: '4.5.0',
      },
    },
    vue: {
      source: 'designs/stagger-reveal/vue.vue',
      exportName: 'StaggerReveal',
      usage:
        '<script setup lang="ts">\nimport StaggerReveal from "~/components/buildwithme/stagger-reveal/vue.vue";\n</script>\n\n<template>\n  <StaggerReveal />\n</template>',
      dependencies: {
        animejs: '4.5.0',
      },
    },
    svelte: {
      source: 'designs/stagger-reveal/svelte.svelte',
      exportName: 'StaggerReveal',
      usage:
        '<script lang="ts">\nimport StaggerReveal from "$lib/components/buildwithme/stagger-reveal/svelte.svelte";\n</script>\n\n<StaggerReveal />',
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
      default: 'Ideas into interfaces.',
      description: 'Text revealed by word.',
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
  style: 'designs/stagger-reveal/stagger-reveal.css',
});
