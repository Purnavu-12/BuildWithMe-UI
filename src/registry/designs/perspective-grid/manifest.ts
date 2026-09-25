import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "perspective-grid",
  "title": "Perspective grid",
  "summary": "An infinite horizon, built from a few simple lines.",
  "domains": [
    "backgrounds"
  ],
  "tags": [
    "backgrounds",
    "css",
    "perspective",
    "grid"
  ],
  "status": "stable",
  "engines": [
    "css"
  ],
  "frameworks": {
    "react": {
      "source": "designs/perspective-grid/react.tsx",
      "exportName": "PerspectiveGrid",
      "usage": "import PerspectiveGrid from \"@/components/buildwithme/perspective-grid/perspective-grid\";\n\n<PerspectiveGrid />",
      "dependencies": {}
    },
    "vue": {
      "source": "designs/perspective-grid/vue.vue",
      "exportName": "PerspectiveGrid",
      "usage": "import PerspectiveGrid from '@buildwithme/vue/perspective-grid';\\n\\n<PerspectiveGrid />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/perspective-grid/svelte.svelte",
      "exportName": "PerspectiveGrid",
      "usage": "import PerspectiveGrid from '@buildwithme/svelte/perspective-grid';\\n\\n<PerspectiveGrid />",
      "dependencies": {}
    }
  },
  "installation": {
    "npm": true,
    "source": true,
    "copy": true
  },
  "accessibility": {
    "summary": "Respects prefers-reduced-motion; pauses when off screen or the document is hidden. Interactive controls support keyboard focus. Use paused to stop the demonstration.",
    "features": [
      "Keyboard reachable controls",
      "Visible focus treatment",
      "Reduced-motion friendly"
    ]
  },
  "props": [
    {
      "name": "paused",
      "type": "boolean",
      "default": "false",
      "description": "Pause decorative animation while retaining interactive controls."
    }
  ],
  "provenance": {
    "type": "original",
    "creator": {
      "name": "BuildWithMe-UI contributors"
    },
    "license": "MIT"
  },
  "related": [],
  "style": "designs/perspective-grid/perspective-grid.css"
});
