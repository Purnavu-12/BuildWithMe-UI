import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "code-snippet",
  "title": "Code snippet",
  "summary": "A focused, horizontally safe source snippet for developer documentation.",
  "domains": [
    "developer-tools"
  ],
  "tags": [
    "code",
    "snippet",
    "developer",
    "adapted"
  ],
  "status": "new",
  "engines": [
    "css"
  ],
  "frameworks": {
    "react": {
      "source": "designs/code-snippet/react.tsx",
      "exportName": "CodeSnippet",
      "usage": "import { CodeSnippet } from '@buildwithme/react';\\n\\n<CodeSnippet />",
      "dependencies": {}
    },
    "vue": {
      "source": "designs/code-snippet/vue.vue",
      "exportName": "CodeSnippet",
      "usage": "import { CodeSnippet } from '@buildwithme/vue';\\n\\n<CodeSnippet />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/code-snippet/svelte.svelte",
      "exportName": "CodeSnippet",
      "usage": "import { CodeSnippet } from '@buildwithme/svelte';\\n\\n<CodeSnippet />",
      "dependencies": {}
    }
  },
  "installation": {
    "npm": true,
    "source": true,
    "copy": true
  },
  "accessibility": {
    "summary": "Uses semantic controls, visible focus, theme-aware contrast, and reduced-motion fallbacks.",
    "features": [
      "Keyboard reachable controls",
      "Visible focus treatment",
      "Reduced-motion friendly",
      "Dark and light themes"
    ]
  },
  "props": [
    {
      "name": "label",
      "type": "string",
      "default": "Code snippet",
      "description": "Accessible display label."
    },
    {
      "name": "paused",
      "type": "boolean",
      "default": "false",
      "description": "Pauses decorative animation."
    }
  ],
  "provenance": {
    "type": "adapted",
    "creator": {
      "name": "BuildWithMe-UI contributors"
    },
    "license": "MIT",
    "upstreamUrl": "https://github.com/vercel/examples/blob/main/internal/packages/ui/src/snippet.tsx",
    "upstreamAuthor": "Vercel, Inc.",
    "upstreamLicense": "MIT",
    "modification": "Reimplemented as a dependency-light, monochrome, theme-aware design with React, Vue, and Svelte source variants and reduced-motion behavior."
  },
  "related": [],
  "style": "designs/code-snippet/code-snippet.css"
});
