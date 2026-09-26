import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "kinetic-text-loader",
  "title": "Kinetic text loader",
  "summary": "A typographic loading signal built from opposing text tracks.",
  "domains": [
    "feedback"
  ],
  "tags": [
    "loader",
    "kinetic",
    "status",
    "adapted"
  ],
  "status": "new",
  "engines": [
    "css"
  ],
  "frameworks": {
    "react": {
      "source": "designs/kinetic-text-loader/react.tsx",
      "exportName": "KineticTextLoader",
      "usage": "import { KineticTextLoader } from '@buildwithme/react';\\n\\n<KineticTextLoader />",
      "dependencies": {}
    },
    "vue": {
      "source": "designs/kinetic-text-loader/vue.vue",
      "exportName": "KineticTextLoader",
      "usage": "import { KineticTextLoader } from '@buildwithme/vue';\\n\\n<KineticTextLoader />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/kinetic-text-loader/svelte.svelte",
      "exportName": "KineticTextLoader",
      "usage": "import { KineticTextLoader } from '@buildwithme/svelte';\\n\\n<KineticTextLoader />",
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
      "default": "Kinetic text loader",
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
    "upstreamUrl": "https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/kinetic-text-loader.tsx",
    "upstreamAuthor": "Ashutoshx7",
    "upstreamLicense": "MIT",
    "modification": "Reimplemented as a dependency-light, monochrome, theme-aware design with React, Vue, and Svelte source variants and reduced-motion behavior."
  },
  "related": [],
  "style": "designs/kinetic-text-loader/kinetic-text-loader.css"
});
