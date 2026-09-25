import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "bento-hero",
  "title": "Bento hero",
  "summary": "A modular landing hero that mixes messaging, proof, and product surfaces.",
  "domains": [
    "marketing"
  ],
  "tags": [
    "hero",
    "bento",
    "landing"
  ],
  "status": "new",
  "engines": [
    "css"
  ],
  "frameworks": {
    "react": {
      "source": "designs/bento-hero/react.tsx",
      "exportName": "BentoHero",
      "usage": "import BentoHero from '@buildwithme/react/bento-hero';\\n\\n<BentoHero />",
      "dependencies": {}
    },
    "vue": {
      "source": "designs/bento-hero/vue.vue",
      "exportName": "BentoHero",
      "usage": "import BentoHero from '@buildwithme/vue/bento-hero';\\n\\n<BentoHero />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/bento-hero/svelte.svelte",
      "exportName": "BentoHero",
      "usage": "import BentoHero from '@buildwithme/svelte/bento-hero';\\n\\n<BentoHero />",
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
      "default": "Bento hero",
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
