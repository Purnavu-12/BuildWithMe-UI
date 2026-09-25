import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "adaptive-sidebar",
  "title": "Adaptive sidebar",
  "summary": "A responsive navigation rail that collapses without losing context.",
  "domains": [
    "navigation"
  ],
  "tags": [
    "sidebar",
    "responsive",
    "navigation"
  ],
  "status": "new",
  "engines": [
    "css"
  ],
  "frameworks": {
    "react": {
      "source": "designs/adaptive-sidebar/react.tsx",
      "exportName": "AdaptiveSidebar",
      "usage": "import AdaptiveSidebar from '@buildwithme/react/adaptive-sidebar';\\n\\n<AdaptiveSidebar />",
      "dependencies": {}
    },
    "vue": {
      "source": "designs/adaptive-sidebar/vue.vue",
      "exportName": "AdaptiveSidebar",
      "usage": "import AdaptiveSidebar from '@buildwithme/vue/adaptive-sidebar';\\n\\n<AdaptiveSidebar />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/adaptive-sidebar/svelte.svelte",
      "exportName": "AdaptiveSidebar",
      "usage": "import AdaptiveSidebar from '@buildwithme/svelte/adaptive-sidebar';\\n\\n<AdaptiveSidebar />",
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
      "default": "Adaptive sidebar",
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
