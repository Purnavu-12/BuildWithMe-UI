import { defineManifest } from '../../schema';

export default defineManifest({
  schemaVersion: 2,
  id: 'product-quick-view',
  title: 'Product quick view',
  summary: 'A product detail overlay with media, options, and purchase action.',
  domains: ['commerce'],
  tags: ['product', 'quick-view', 'commerce'],
  status: 'new',
  engines: ['css'],
  frameworks: {
    react: {
      source: 'designs/product-quick-view/react.tsx',
      exportName: 'ProductQuickView',
      usage:
        'import ProductQuickView from "@/components/buildwithme/product-quick-view/react";\n\n<ProductQuickView />',
      dependencies: {},
    },
    vue: {
      source: 'designs/product-quick-view/vue.vue',
      exportName: 'ProductQuickView',
      usage:
        '<script setup lang="ts">\nimport ProductQuickView from "~/components/buildwithme/product-quick-view/vue.vue";\n</script>\n\n<template>\n  <ProductQuickView />\n</template>',
      dependencies: {},
    },
    svelte: {
      source: 'designs/product-quick-view/svelte.svelte',
      exportName: 'ProductQuickView',
      usage:
        '<script lang="ts">\nimport ProductQuickView from "$lib/components/buildwithme/product-quick-view/svelte.svelte";\n</script>\n\n<ProductQuickView />',
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
      default: 'Product quick view',
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
  style: 'designs/product-quick-view/product-quick-view.css',
});
