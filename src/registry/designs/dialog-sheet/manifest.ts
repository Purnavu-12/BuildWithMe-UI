import { defineManifest } from '../../schema';

export default defineManifest({
  schemaVersion: 2,
  id: 'dialog-sheet',
  title: 'Dialog sheet',
  summary: 'An adaptive modal that becomes a bottom sheet on smaller screens.',
  domains: ['overlays'],
  tags: ['dialog', 'sheet', 'modal'],
  status: 'new',
  engines: ['css'],
  frameworks: {
    react: {
      source: 'designs/dialog-sheet/react.tsx',
      exportName: 'DialogSheet',
      usage:
        'import DialogSheet from "@/components/buildwithme/dialog-sheet/react";\n\n<DialogSheet />',
      dependencies: {},
    },
    vue: {
      source: 'designs/dialog-sheet/vue.vue',
      exportName: 'DialogSheet',
      usage:
        '<script setup lang="ts">\nimport DialogSheet from "~/components/buildwithme/dialog-sheet/vue.vue";\n</script>\n\n<template>\n  <DialogSheet />\n</template>',
      dependencies: {},
    },
    svelte: {
      source: 'designs/dialog-sheet/svelte.svelte',
      exportName: 'DialogSheet',
      usage:
        '<script lang="ts">\nimport DialogSheet from "$lib/components/buildwithme/dialog-sheet/svelte.svelte";\n</script>\n\n<DialogSheet />',
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
      default: 'Dialog sheet',
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
  style: 'designs/dialog-sheet/dialog-sheet.css',
});
