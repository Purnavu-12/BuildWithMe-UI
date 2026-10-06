import { defineManifest } from '../../schema';

export default defineManifest({
  schemaVersion: 2,
  id: 'floating-label-field',
  title: 'Floating label field',
  summary: 'A polished input whose label responds to focus and content.',
  domains: ['forms'],
  tags: ['input', 'field', 'form'],
  status: 'new',
  engines: ['css'],
  frameworks: {
    react: {
      source: 'designs/floating-label-field/react.tsx',
      exportName: 'FloatingLabelField',
      usage:
        'import FloatingLabelField from "@/components/buildwithme/floating-label-field/react";\n\n<FloatingLabelField />',
      dependencies: {},
    },
    vue: {
      source: 'designs/floating-label-field/vue.vue',
      exportName: 'FloatingLabelField',
      usage:
        '<script setup lang="ts">\nimport FloatingLabelField from "~/components/buildwithme/floating-label-field/vue.vue";\n</script>\n\n<template>\n  <FloatingLabelField />\n</template>',
      dependencies: {},
    },
    svelte: {
      source: 'designs/floating-label-field/svelte.svelte',
      exportName: 'FloatingLabelField',
      usage:
        '<script lang="ts">\nimport FloatingLabelField from "$lib/components/buildwithme/floating-label-field/svelte.svelte";\n</script>\n\n<FloatingLabelField />',
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
      default: 'Floating label field',
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
  style: 'designs/floating-label-field/floating-label-field.css',
});
