import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "docs-table-of-contents",
  "title": "Docs table of contents",
  "summary": "A sticky document outline that tracks the current section.",
  "domains": [
    "developer-tools"
  ],
  "tags": [
    "docs",
    "toc",
    "developer"
  ],
  "status": "new",
  "engines": [
    "css"
  ],
  "frameworks": {
    "react": {
      "source": "designs/docs-table-of-contents/react.tsx",
      "exportName": "DocsTableOfContents",
      "usage": "import DocsTableOfContents from '@buildwithme/react/docs-table-of-contents';\\n\\n<DocsTableOfContents />",
      "dependencies": {}
    },
    "vue": {
      "source": "designs/docs-table-of-contents/vue.vue",
      "exportName": "DocsTableOfContents",
      "usage": "import DocsTableOfContents from '@buildwithme/vue/docs-table-of-contents';\\n\\n<DocsTableOfContents />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/docs-table-of-contents/svelte.svelte",
      "exportName": "DocsTableOfContents",
      "usage": "import DocsTableOfContents from '@buildwithme/svelte/docs-table-of-contents';\\n\\n<DocsTableOfContents />",
      "dependencies": {}
    }
  },
  "installation": {
    "npm": true,
    "source": true,
    "copy": true
  },
  "accessibility": {
    "summary": "Uses semantic controls, visible focus, and motion-safe interaction.",
    "features": [
      "Keyboard reachable controls",
      "Visible focus treatment",
      "Reduced-motion friendly"
    ]
  },
  "props": [
    {
      "name": "label",
      "type": "string",
      "default": "Docs table of contents",
      "description": "Accessible display label."
    }
  ],
  "provenance": {
    "type": "original",
    "creator": {
      "name": "BuildWithMe-UI contributors"
    },
    "license": "MIT"
  },
  "related": []
});
