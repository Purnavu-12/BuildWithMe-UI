import { defineManifest } from '../../schema';

export default defineManifest({
  schemaVersion: 2,
  id: 'toast-stack',
  title: 'Toast stack',
  summary: 'An announced notification queue with dismiss and timeout controls.',
  domains: ['feedback'],
  tags: ['toast', 'notification', 'status'],
  status: 'new',
  engines: ['css'],
  frameworks: {
    react: {
      source: 'designs/toast-stack/react.tsx',
      exportName: 'ToastStack',
      usage:
        'import ToastStack from "@/components/buildwithme/toast-stack/react";\n\n<ToastStack />',
      dependencies: {},
    },
    vue: {
      source: 'designs/toast-stack/vue.vue',
      exportName: 'ToastStack',
      usage:
        '<script setup lang="ts">\nimport ToastStack from "~/components/buildwithme/toast-stack/vue.vue";\n</script>\n\n<template>\n  <ToastStack />\n</template>',
      dependencies: {},
    },
    svelte: {
      source: 'designs/toast-stack/svelte.svelte',
      exportName: 'ToastStack',
      usage:
        '<script lang="ts">\nimport ToastStack from "$lib/components/buildwithme/toast-stack/svelte.svelte";\n</script>\n\n<ToastStack />',
      dependencies: {},
    },
  },
  installation: {
    npm: true,
    source: true,
    copy: true,
  },
  accessibility: {
    summary: 'Uses semantic controls, visible focus, and motion-safe interaction.',
    features: ['Keyboard reachable controls', 'Visible focus treatment', 'Reduced-motion friendly'],
  },
  props: [
    {
      name: 'label',
      type: 'string',
      default: 'Toast stack',
      description: 'Accessible display label.',
    },
    {
      name: 'className',
      type: 'string',
      default: '',
      description: 'Additional root CSS class.',
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
  style: 'designs/toast-stack/toast-stack.css',
});
