import { defineManifest } from '../../schema';

export default defineManifest({
  schemaVersion: 2,
  id: 'workflow-stepper',
  title: 'Workflow stepper',
  summary: 'A clear process timeline for pending, active, and completed work.',
  domains: ['workflows'],
  tags: ['workflow', 'stepper', 'progress'],
  status: 'new',
  engines: ['css'],
  frameworks: {
    react: {
      source: 'designs/workflow-stepper/react.tsx',
      exportName: 'WorkflowStepper',
      usage:
        'import WorkflowStepper from "@/components/buildwithme/workflow-stepper/react";\n\n<WorkflowStepper />',
      dependencies: {},
    },
    vue: {
      source: 'designs/workflow-stepper/vue.vue',
      exportName: 'WorkflowStepper',
      usage:
        '<script setup lang="ts">\nimport WorkflowStepper from "~/components/buildwithme/workflow-stepper/vue.vue";\n</script>\n\n<template>\n  <WorkflowStepper />\n</template>',
      dependencies: {},
    },
    svelte: {
      source: 'designs/workflow-stepper/svelte.svelte',
      exportName: 'WorkflowStepper',
      usage:
        '<script lang="ts">\nimport WorkflowStepper from "$lib/components/buildwithme/workflow-stepper/svelte.svelte";\n</script>\n\n<WorkflowStepper />',
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
      default: 'Workflow stepper',
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
  style: 'designs/workflow-stepper/workflow-stepper.css',
});
