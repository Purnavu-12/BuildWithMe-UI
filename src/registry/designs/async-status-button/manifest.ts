import { defineManifest } from '../../schema';

export default defineManifest({
  schemaVersion: 2,
  id: 'async-status-button',
  title: 'Async-status button',
  summary: 'Idle, working, and success states in one accessible action.',
  domains: ['actions'],
  tags: ['buttons', 'motion', 'async', 'status', 'button', 'actions'],
  status: 'stable',
  engines: ['motion'],
  frameworks: {
    react: {
      source: 'designs/async-status-button/react.tsx',
      exportName: 'AsyncStatusButton',
      usage:
        'import AsyncStatusButton from "@/components/buildwithme/async-status-button/react";\n\n<AsyncStatusButton />',
      dependencies: {
        motion: '13.4.4',
      },
    },
    vue: {
      source: 'designs/async-status-button/vue.vue',
      exportName: 'AsyncStatusButton',
      usage:
        '<script setup lang="ts">\nimport AsyncStatusButton from "~/components/buildwithme/async-status-button/vue.vue";\n</script>\n\n<template>\n  <AsyncStatusButton />\n</template>',
      dependencies: {},
    },
    svelte: {
      source: 'designs/async-status-button/svelte.svelte',
      exportName: 'AsyncStatusButton',
      usage:
        '<script lang="ts">\nimport AsyncStatusButton from "$lib/components/buildwithme/async-status-button/svelte.svelte";\n</script>\n\n<AsyncStatusButton />',
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
      name: 'onAction',
      type: '() => Promise<void>',
      default: 'local demonstration',
      description: 'Async operation; rejection shows retry state.',
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
});
