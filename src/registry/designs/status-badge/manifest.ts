import { defineManifest } from '../../schema';
export default defineManifest({
  schemaVersion: 2,
  id: 'status-badge',
  title: 'Status badge',
  summary: 'A precise operational badge for deployment, build, and service states.',
  domains: ['feedback'],
  tags: ['badge', 'status', 'deployment', 'adapted'],
  status: 'new',
  engines: ['css'],
  frameworks: {
    react: {
      source: 'designs/status-badge/react.tsx',
      exportName: 'StatusBadge',
      usage:
        'import StatusBadge from "@/components/buildwithme/status-badge/react";\n\n<StatusBadge />',
      dependencies: {},
    },
    vue: {
      source: 'designs/status-badge/vue.vue',
      exportName: 'StatusBadge',
      usage:
        '<script setup lang="ts">\nimport StatusBadge from "~/components/buildwithme/status-badge/vue.vue";\n</script>\n\n<template>\n  <StatusBadge />\n</template>',
      dependencies: {},
    },
    svelte: {
      source: 'designs/status-badge/svelte.svelte',
      exportName: 'StatusBadge',
      usage:
        '<script lang="ts">\nimport StatusBadge from "$lib/components/buildwithme/status-badge/svelte.svelte";\n</script>\n\n<StatusBadge />',
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
      'Uses semantic controls, visible focus, theme-aware contrast, and reduced-motion fallbacks.',
    features: [
      'Keyboard reachable controls',
      'Visible focus treatment',
      'Reduced-motion friendly',
      'Dark and light themes',
    ],
  },
  props: [
    {
      name: 'label',
      type: 'string',
      default: 'Status badge',
      description: 'Accessible display label.',
    },
    {
      name: 'paused',
      type: 'boolean',
      default: 'false',
      description: 'Pauses decorative animation.',
    },
  ],
  provenance: {
    type: 'adapted',
    creator: {
      name: 'BuildWithMe-UI contributors',
    },
    license: 'MIT',
    upstreamUrl: 'https://github.com/vercel/registry-starter/blob/main/src/components/ui/badge.tsx',
    upstreamAuthor: 'Vercel, Inc.',
    upstreamLicense: 'MIT',
    modification:
      'Reimplemented as a dependency-light, monochrome, theme-aware design with React, Vue, and Svelte source variants and reduced-motion behavior. Kinetic Playground repair (2026-10-05): framework-native behavior, scoped motion lifecycle, complete source closure, and corrected source usage; original upstream notices retained.',
  },
  related: [],
  style: 'designs/status-badge/status-badge.css',
});
