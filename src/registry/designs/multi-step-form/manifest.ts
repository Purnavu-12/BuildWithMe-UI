import { defineManifest } from '../../schema';

export default defineManifest({
  schemaVersion: 2,
  id: 'multi-step-form',
  title: 'Multi-step form',
  summary: 'A guided form flow with progress, validation states, and review.',
  domains: ['forms'],
  tags: ['form', 'steps', 'validation'],
  status: 'new',
  engines: ['css'],
  frameworks: {
    react: {
      source: 'designs/multi-step-form/react.tsx',
      exportName: 'MultiStepForm',
      usage:
        'import MultiStepForm from "@/components/buildwithme/multi-step-form/react";\n\n<MultiStepForm />',
      dependencies: {},
    },
    vue: {
      source: 'designs/multi-step-form/vue.vue',
      exportName: 'MultiStepForm',
      usage:
        '<script setup lang="ts">\nimport MultiStepForm from "~/components/buildwithme/multi-step-form/vue.vue";\n</script>\n\n<template>\n  <MultiStepForm />\n</template>',
      dependencies: {},
    },
    svelte: {
      source: 'designs/multi-step-form/svelte.svelte',
      exportName: 'MultiStepForm',
      usage:
        '<script lang="ts">\nimport MultiStepForm from "$lib/components/buildwithme/multi-step-form/svelte.svelte";\n</script>\n\n<MultiStepForm />',
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
      default: 'Multi-step form',
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
  style: 'designs/multi-step-form/multi-step-form.css',
});
