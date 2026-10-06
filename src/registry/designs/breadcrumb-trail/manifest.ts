import { defineManifest } from '../../schema';

export default defineManifest({
  schemaVersion: 2,
  id: 'breadcrumb-trail',
  title: 'Breadcrumb trail',
  summary: 'A compact, accessible path indicator with responsive overflow.',
  domains: ['navigation'],
  tags: ['breadcrumbs', 'path', 'navigation'],
  status: 'new',
  engines: ['css'],
  frameworks: {
    react: {
      source: 'designs/breadcrumb-trail/react.tsx',
      exportName: 'BreadcrumbTrail',
      usage:
        'import BreadcrumbTrail from "@/components/buildwithme/breadcrumb-trail/react";\n\n<BreadcrumbTrail />',
      dependencies: {},
    },
    vue: {
      source: 'designs/breadcrumb-trail/vue.vue',
      exportName: 'BreadcrumbTrail',
      usage:
        '<script setup lang="ts">\nimport BreadcrumbTrail from "~/components/buildwithme/breadcrumb-trail/vue.vue";\n</script>\n\n<template>\n  <BreadcrumbTrail />\n</template>',
      dependencies: {},
    },
    svelte: {
      source: 'designs/breadcrumb-trail/svelte.svelte',
      exportName: 'BreadcrumbTrail',
      usage:
        '<script lang="ts">\nimport BreadcrumbTrail from "$lib/components/buildwithme/breadcrumb-trail/svelte.svelte";\n</script>\n\n<BreadcrumbTrail />',
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
      default: 'Breadcrumb trail',
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
  style: 'designs/breadcrumb-trail/breadcrumb-trail.css',
});
