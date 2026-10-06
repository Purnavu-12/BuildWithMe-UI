import { defineManifest } from '../../schema';

export default defineManifest({
  schemaVersion: 2,
  id: 'media-gallery',
  title: 'Media gallery',
  summary: 'A keyboard-friendly gallery with thumbnails and an immersive stage.',
  domains: ['media'],
  tags: ['gallery', 'media', 'carousel'],
  status: 'new',
  engines: ['css'],
  frameworks: {
    react: {
      source: 'designs/media-gallery/react.tsx',
      exportName: 'MediaGallery',
      usage:
        'import MediaGallery from "@/components/buildwithme/media-gallery/react";\n\n<MediaGallery />',
      dependencies: {},
    },
    vue: {
      source: 'designs/media-gallery/vue.vue',
      exportName: 'MediaGallery',
      usage:
        '<script setup lang="ts">\nimport MediaGallery from "~/components/buildwithme/media-gallery/vue.vue";\n</script>\n\n<template>\n  <MediaGallery />\n</template>',
      dependencies: {},
    },
    svelte: {
      source: 'designs/media-gallery/svelte.svelte',
      exportName: 'MediaGallery',
      usage:
        '<script lang="ts">\nimport MediaGallery from "$lib/components/buildwithme/media-gallery/svelte.svelte";\n</script>\n\n<MediaGallery />',
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
      default: 'Media gallery',
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
  style: 'designs/media-gallery/media-gallery.css',
});
