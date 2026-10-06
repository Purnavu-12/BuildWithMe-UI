import { defineManifest } from '../../schema';
export default defineManifest({
  schemaVersion: 2,
  id: 'deployment-button',
  title: 'Deployment button',
  summary: 'A stateful-looking deployment action with a compact progress signal.',
  domains: ['actions'],
  tags: ['deploy', 'button', 'loading', 'adapted'],
  status: 'new',
  engines: ['css'],
  frameworks: {
    react: {
      source: 'designs/deployment-button/react.tsx',
      exportName: 'DeploymentButton',
      usage:
        'import DeploymentButton from "@/components/buildwithme/deployment-button/react";\n\n<DeploymentButton />',
      dependencies: {},
    },
    vue: {
      source: 'designs/deployment-button/vue.vue',
      exportName: 'DeploymentButton',
      usage:
        '<script setup lang="ts">\nimport DeploymentButton from "~/components/buildwithme/deployment-button/vue.vue";\n</script>\n\n<template>\n  <DeploymentButton />\n</template>',
      dependencies: {},
    },
    svelte: {
      source: 'designs/deployment-button/svelte.svelte',
      exportName: 'DeploymentButton',
      usage:
        '<script lang="ts">\nimport DeploymentButton from "$lib/components/buildwithme/deployment-button/svelte.svelte";\n</script>\n\n<DeploymentButton />',
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
      default: 'Deployment button',
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
    upstreamUrl: 'https://github.com/vercel/examples/blob/main/internal/packages/ui/src/button.tsx',
    upstreamAuthor: 'Vercel, Inc.',
    upstreamLicense: 'MIT',
    modification:
      'Reimplemented as a dependency-light, monochrome, theme-aware design with React, Vue, and Svelte source variants and reduced-motion behavior. Kinetic Playground repair (2026-10-05): framework-native behavior, scoped motion lifecycle, complete source closure, and corrected source usage; original upstream notices retained.',
  },
  related: [],
  style: 'designs/deployment-button/deployment-button.css',
});
