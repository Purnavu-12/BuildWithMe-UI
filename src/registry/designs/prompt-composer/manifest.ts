import { defineManifest } from '../../schema';

export default defineManifest({
  schemaVersion: 2,
  id: 'prompt-composer',
  title: 'Prompt composer',
  summary: 'A thoughtful starting point for a conversation with AI.',
  domains: ['ai'],
  tags: ['ai', 'css', 'prompt', 'composer'],
  status: 'stable',
  engines: ['css'],
  frameworks: {
    react: {
      source: 'designs/prompt-composer/react.tsx',
      exportName: 'PromptComposer',
      usage:
        'import PromptComposer from "@/components/buildwithme/prompt-composer/react";\n\n<PromptComposer />',
      dependencies: {},
    },
    vue: {
      source: 'designs/prompt-composer/vue.vue',
      exportName: 'PromptComposer',
      usage:
        '<script setup lang="ts">\nimport PromptComposer from "~/components/buildwithme/prompt-composer/vue.vue";\n</script>\n\n<template>\n  <PromptComposer />\n</template>',
      dependencies: {},
    },
    svelte: {
      source: 'designs/prompt-composer/svelte.svelte',
      exportName: 'PromptComposer',
      usage:
        '<script lang="ts">\nimport PromptComposer from "$lib/components/buildwithme/prompt-composer/svelte.svelte";\n</script>\n\n<PromptComposer />',
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
      name: 'onSubmit',
      type: '(value: string) => void',
      default: 'undefined',
      description: 'Receives trimmed prompt. No network requests are made.',
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
  style: 'designs/prompt-composer/prompt-composer.css',
});
