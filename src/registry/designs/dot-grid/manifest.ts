import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "dot-grid",
  "title": "Dot grid",
  "summary": "An understated canvas for your next big idea.",
  "domains": [
    "backgrounds"
  ],
  "tags": [
    "backgrounds",
    "css",
    "dot",
    "grid"
  ],
  "status": "stable",
  "engines": [
    "css"
  ],
  "frameworks": {
    "react": {
      "source": "designs/dot-grid/react.tsx",
      "exportName": "DotGrid",
      "usage": "import DotGrid from \"@/components/buildwithme/dot-grid/dot-grid\";\n\n<DotGrid />",
      "dependencies": {}
    },
    "vue": {
      "source": "designs/dot-grid/vue.vue",
      "exportName": "DotGrid",
      "usage": "import DotGrid from '@buildwithme/vue/dot-grid';\\n\\n<DotGrid />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/dot-grid/svelte.svelte",
      "exportName": "DotGrid",
      "usage": "import DotGrid from '@buildwithme/svelte/dot-grid';\\n\\n<DotGrid />",
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
  "style": "designs/dot-grid/dot-grid.css"
});
