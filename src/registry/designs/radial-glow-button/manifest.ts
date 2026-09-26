import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "radial-glow-button",
  "title": "Radial glow button",
  "summary": "A monochrome action button with a pointer-responsive radial bloom.",
  "domains": [
    "actions"
  ],
  "tags": [
    "button",
    "glow",
    "radial",
    "adapted"
  ],
  "status": "new",
  "engines": [
    "css"
  ],
  "frameworks": {
    "react": {
      "source": "designs/radial-glow-button/react.tsx",
      "exportName": "RadialGlowButton",
      "usage": "import { RadialGlowButton } from '@buildwithme/react';\\n\\n<RadialGlowButton />",
      "dependencies": {}
    },
    "vue": {
      "source": "designs/radial-glow-button/vue.vue",
      "exportName": "RadialGlowButton",
      "usage": "import { RadialGlowButton } from '@buildwithme/vue';\\n\\n<RadialGlowButton />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/radial-glow-button/svelte.svelte",
      "exportName": "RadialGlowButton",
      "usage": "import { RadialGlowButton } from '@buildwithme/svelte';\\n\\n<RadialGlowButton />",
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
      "default": "Radial glow button",
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
    "upstreamUrl": "https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/radial-glow-button.tsx",
    "upstreamAuthor": "Ashutoshx7",
    "upstreamLicense": "MIT",
    "modification": "Reimplemented as a dependency-light, monochrome, theme-aware design with React, Vue, and Svelte source variants and reduced-motion behavior."
  },
  "related": [],
  "style": "designs/radial-glow-button/radial-glow-button.css"
});
