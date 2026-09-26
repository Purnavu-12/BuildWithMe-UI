import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "glow-border-card",
  "title": "Glow border card",
  "summary": "A restrained card whose moving edge light responds without obscuring content.",
  "domains": [
    "layout"
  ],
  "tags": [
    "card",
    "border",
    "glow",
    "adapted"
  ],
  "status": "new",
  "engines": [
    "css"
  ],
  "frameworks": {
    "react": {
      "source": "designs/glow-border-card/react.tsx",
      "exportName": "GlowBorderCard",
      "usage": "import { GlowBorderCard } from '@buildwithme/react';\\n\\n<GlowBorderCard />",
      "dependencies": {}
    },
    "vue": {
      "source": "designs/glow-border-card/vue.vue",
      "exportName": "GlowBorderCard",
      "usage": "import { GlowBorderCard } from '@buildwithme/vue';\\n\\n<GlowBorderCard />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/glow-border-card/svelte.svelte",
      "exportName": "GlowBorderCard",
      "usage": "import { GlowBorderCard } from '@buildwithme/svelte';\\n\\n<GlowBorderCard />",
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
      "default": "Glow border card",
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
    "upstreamUrl": "https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/glow-border-card.tsx",
    "upstreamAuthor": "Ashutoshx7",
    "upstreamLicense": "MIT",
    "modification": "Reimplemented as a dependency-light, monochrome, theme-aware design with React, Vue, and Svelte source variants and reduced-motion behavior."
  },
  "related": [],
  "style": "designs/glow-border-card/glow-border-card.css"
});
