import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "flowing-lines",
  "title": "Flowing lines",
  "summary": "A sequence of luminous lines, moving with a shared rhythm.",
  "domains": [
    "backgrounds"
  ],
  "tags": [
    "backgrounds",
    "animejs",
    "flowing",
    "lines"
  ],
  "status": "stable",
  "engines": [
    "animejs"
  ],
  "frameworks": {
    "react": {
      "source": "designs/flowing-lines/react.tsx",
      "exportName": "FlowingLines",
      "usage": "import FlowingLines from \"@/components/buildwithme/flowing-lines/flowing-lines\";\n\n<FlowingLines />",
      "dependencies": {
        "animejs": "4.5.0"
      }
    },
    "vue": {
      "source": "designs/flowing-lines/vue.vue",
      "exportName": "FlowingLines",
      "usage": "import FlowingLines from '@buildwithme/vue/flowing-lines';\\n\\n<FlowingLines />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/flowing-lines/svelte.svelte",
      "exportName": "FlowingLines",
      "usage": "import FlowingLines from '@buildwithme/svelte/flowing-lines';\\n\\n<FlowingLines />",
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
  "style": "designs/flowing-lines/flowing-lines.css"
});
