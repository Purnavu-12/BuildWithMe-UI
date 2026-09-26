import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "flip-text",
  "title": "Flip text",
  "summary": "A split-line text treatment that flips characters into place with controlled timing.",
  "domains": [
    "typography"
  ],
  "tags": [
    "text",
    "flip",
    "reveal",
    "adapted"
  ],
  "status": "new",
  "engines": [
    "css"
  ],
  "frameworks": {
    "react": {
      "source": "designs/flip-text/react.tsx",
      "exportName": "FlipText",
      "usage": "import { FlipText } from '@buildwithme/react';\\n\\n<FlipText />",
      "dependencies": {}
    },
    "vue": {
      "source": "designs/flip-text/vue.vue",
      "exportName": "FlipText",
      "usage": "import { FlipText } from '@buildwithme/vue';\\n\\n<FlipText />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/flip-text/svelte.svelte",
      "exportName": "FlipText",
      "usage": "import { FlipText } from '@buildwithme/svelte';\\n\\n<FlipText />",
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
      "default": "Flip text",
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
    "upstreamUrl": "https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/flip-text.tsx",
    "upstreamAuthor": "Ashutoshx7",
    "upstreamLicense": "MIT",
    "modification": "Reimplemented as a dependency-light, monochrome, theme-aware design with React, Vue, and Svelte source variants and reduced-motion behavior."
  },
  "related": [],
  "style": "designs/flip-text/flip-text.css"
});
