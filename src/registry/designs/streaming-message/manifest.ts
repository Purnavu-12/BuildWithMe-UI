import { defineManifest } from '../../schema';

export default defineManifest({
  schemaVersion: 2,
  id: 'streaming-message',
  title: 'Streaming message',
  summary: 'A local text-stream demonstration with a readable static fallback.',
  domains: ['ai'],
  tags: ['ai', 'css', 'streaming', 'message'],
  status: 'stable',
  engines: ['css'],
  frameworks: {
    react: {
      source: 'designs/streaming-message/react.tsx',
      exportName: 'StreamingMessage',
      usage:
        'import StreamingMessage from "@/components/buildwithme/streaming-message/react";\n\n<StreamingMessage />',
      dependencies: {},
    },
    vue: {
      source: 'designs/streaming-message/vue.vue',
      exportName: 'StreamingMessage',
      usage:
        '<script setup lang="ts">\nimport StreamingMessage from "~/components/buildwithme/streaming-message/vue.vue";\n</script>\n\n<template>\n  <StreamingMessage />\n</template>',
      dependencies: {},
    },
    svelte: {
      source: 'designs/streaming-message/svelte.svelte',
      exportName: 'StreamingMessage',
      usage:
        '<script lang="ts">\nimport StreamingMessage from "$lib/components/buildwithme/streaming-message/svelte.svelte";\n</script>\n\n<StreamingMessage />',
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
      name: 'text',
      type: 'string',
      default: 'example message',
      description: 'Text to reveal locally.',
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
  style: 'designs/streaming-message/streaming-message.css',
});
