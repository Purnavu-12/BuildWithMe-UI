import { defineManifest } from '../../schema';
export default defineManifest({
  schemaVersion: 2,
  id: 'folder-preview',
  title: 'Folder preview',
  summary: 'A layered folder object that opens to reveal a compact file collection.',
  domains: ['data-display'],
  tags: ['folder', 'files', 'preview', 'adapted'],
  status: 'new',
  engines: ['css'],
  frameworks: {
    react: {
      source: 'designs/folder-preview/react.tsx',
      exportName: 'FolderPreview',
      usage:
        'import FolderPreview from "@/components/buildwithme/folder-preview/react";\n\n<FolderPreview />',
      dependencies: {},
    },
    vue: {
      source: 'designs/folder-preview/vue.vue',
      exportName: 'FolderPreview',
      usage:
        '<script setup lang="ts">\nimport FolderPreview from "~/components/buildwithme/folder-preview/vue.vue";\n</script>\n\n<template>\n  <FolderPreview />\n</template>',
      dependencies: {},
    },
    svelte: {
      source: 'designs/folder-preview/svelte.svelte',
      exportName: 'FolderPreview',
      usage:
        '<script lang="ts">\nimport FolderPreview from "$lib/components/buildwithme/folder-preview/svelte.svelte";\n</script>\n\n<FolderPreview />',
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
      default: 'Folder preview',
      description: 'Accessible display label.',
    },
    {
      name: 'paused',
      type: 'boolean',
      default: 'false',
      description: 'Pauses decorative animation.',
    },
    {
      name: 'files',
      type: 'string[]',
      default: '["manifest.ts", "react.tsx", "styles.css"]',
      description:
        'Filenames to show in the disclosure; supply real installed files when embedding it.',
    },
  ],
  provenance: {
    type: 'adapted',
    creator: {
      name: 'BuildWithMe-UI contributors',
    },
    license: 'MIT',
    upstreamUrl:
      'https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/folder-preview.tsx',
    upstreamAuthor: 'Ashutoshx7',
    upstreamLicense: 'MIT',
    modification:
      'Reimplemented as a dependency-light, monochrome, theme-aware design with React, Vue, and Svelte source variants and reduced-motion behavior. Kinetic Playground repair (2026-10-05): framework-native behavior, scoped motion lifecycle, complete source closure, and corrected source usage; original upstream notices retained.',
  },
  related: [],
  style: 'designs/folder-preview/folder-preview.css',
});
