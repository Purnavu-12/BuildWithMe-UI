import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "glass-dock",
  "title": "Glass dock",
  "summary": "A compact floating navigation dock with tactile focus and hover magnification.",
  "domains": [
    "navigation"
  ],
  "tags": [
    "dock",
    "navigation",
    "glass",
    "adapted"
  ],
  "status": "new",
  "engines": [
    "css"
  ],
  "frameworks": {
    "react": {
      "source": "designs/glass-dock/react.tsx",
      "exportName": "GlassDock",
      "usage": "import { GlassDock } from '@buildwithme/react';\\n\\n<GlassDock />",
      "dependencies": {}
    },
    "vue": {
      "source": "designs/glass-dock/vue.vue",
      "exportName": "GlassDock",
      "usage": "import { GlassDock } from '@buildwithme/vue';\\n\\n<GlassDock />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/glass-dock/svelte.svelte",
      "exportName": "GlassDock",
      "usage": "import { GlassDock } from '@buildwithme/svelte';\\n\\n<GlassDock />",
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
      "default": "Glass dock",
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
    "upstreamUrl": "https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/glass-dock.tsx",
    "upstreamAuthor": "Ashutoshx7",
    "upstreamLicense": "MIT",
    "modification": "Reimplemented as a dependency-light, monochrome, theme-aware design with React, Vue, and Svelte source variants and reduced-motion behavior."
  },
  "related": [],
  "style": "designs/glass-dock/glass-dock.css"
});
