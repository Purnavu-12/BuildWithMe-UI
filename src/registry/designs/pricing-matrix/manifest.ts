import { defineManifest } from '../../schema';

export default defineManifest({
  schemaVersion: 2,
  id: 'pricing-matrix',
  title: 'Pricing matrix',
  summary: 'A responsive plan comparison with clear feature relationships.',
  domains: ['commerce'],
  tags: ['pricing', 'plans', 'comparison'],
  status: 'new',
  engines: ['css'],
  frameworks: {
    react: {
      source: 'designs/pricing-matrix/react.tsx',
      exportName: 'PricingMatrix',
      usage:
        'import PricingMatrix from "@/components/buildwithme/pricing-matrix/react";\n\n<PricingMatrix />',
      dependencies: {},
    },
    vue: {
      source: 'designs/pricing-matrix/vue.vue',
      exportName: 'PricingMatrix',
      usage:
        '<script setup lang="ts">\nimport PricingMatrix from "~/components/buildwithme/pricing-matrix/vue.vue";\n</script>\n\n<template>\n  <PricingMatrix />\n</template>',
      dependencies: {},
    },
    svelte: {
      source: 'designs/pricing-matrix/svelte.svelte',
      exportName: 'PricingMatrix',
      usage:
        '<script lang="ts">\nimport PricingMatrix from "$lib/components/buildwithme/pricing-matrix/svelte.svelte";\n</script>\n\n<PricingMatrix />',
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
      default: 'Pricing matrix',
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
  style: 'designs/pricing-matrix/pricing-matrix.css',
});
