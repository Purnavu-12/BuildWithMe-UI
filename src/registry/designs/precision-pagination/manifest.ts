import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "precision-pagination",
  "title": "Precision pagination",
  "summary": "A compact pagination control with explicit current-page state and large targets.",
  "domains": [
    "navigation"
  ],
  "tags": [
    "pagination",
    "navigation",
    "pages",
    "adapted"
  ],
  "status": "new",
  "engines": [
    "css"
  ],
  "frameworks": {
    "react": {
      "source": "designs/precision-pagination/react.tsx",
      "exportName": "PrecisionPagination",
      "usage": "import { PrecisionPagination } from '@buildwithme/react';\\n\\n<PrecisionPagination />",
      "dependencies": {}
    },
    "vue": {
      "source": "designs/precision-pagination/vue.vue",
      "exportName": "PrecisionPagination",
      "usage": "import { PrecisionPagination } from '@buildwithme/vue';\\n\\n<PrecisionPagination />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/precision-pagination/svelte.svelte",
      "exportName": "PrecisionPagination",
      "usage": "import { PrecisionPagination } from '@buildwithme/svelte';\\n\\n<PrecisionPagination />",
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
      "default": "Precision pagination",
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
    "upstreamUrl": "https://github.com/vercel/registry-starter/blob/main/src/components/ui/pagination.tsx",
    "upstreamAuthor": "Vercel, Inc.",
    "upstreamLicense": "MIT",
    "modification": "Reimplemented as a dependency-light, monochrome, theme-aware design with React, Vue, and Svelte source variants and reduced-motion behavior."
  },
  "related": [],
  "style": "designs/precision-pagination/precision-pagination.css"
});
