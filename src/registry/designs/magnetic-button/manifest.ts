import { defineManifest } from '../../schema';

export default defineManifest({
  schemaVersion: 2,
  id: 'magnetic-button',
  title: 'Magnetic button',
  summary: 'A spring-loaded button that gently follows your pointer.',
  domains: ['actions'],
  tags: ['buttons', 'motion', 'magnetic', 'button', 'actions'],
  status: 'stable',
  engines: ['motion'],
  frameworks: {
    react: {
      source: 'designs/magnetic-button/react.tsx',
      exportName: 'MagneticButton',
      usage:
        'import MagneticButton from "@/components/buildwithme/magnetic-button/react";\n\n<MagneticButton />',
      dependencies: {
        motion: '13.4.4',
      },
    },
    vue: {
      source: 'designs/magnetic-button/vue.vue',
      exportName: 'MagneticButton',
      usage:
        '<script setup lang="ts">\nimport MagneticButton from "~/components/buildwithme/magnetic-button/vue.vue";\n</script>\n\n<template>\n  <MagneticButton />\n</template>',
      dependencies: {},
    },
    svelte: {
      source: 'designs/magnetic-button/svelte.svelte',
      exportName: 'MagneticButton',
      usage:
        '<script lang="ts">\nimport MagneticButton from "$lib/components/buildwithme/magnetic-button/svelte.svelte";\n</script>\n\n<MagneticButton />',
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
      default: 'Pull me closer',
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
  style: 'designs/magnetic-button/magnetic-button.css',
});
