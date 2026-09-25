import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "press-depth-button",
  "title": "Press-depth button",
  "summary": "A tactile, raised button with a satisfying press state.",
  "domains": [
    "actions"
  ],
  "tags": [
    "buttons",
    "css",
    "press",
    "depth",
    "button",
    "actions"
  ],
  "status": "stable",
  "engines": [
    "css"
  ],
  "frameworks": {
    "react": {
      "source": "designs/press-depth-button/react.tsx",
      "exportName": "PressDepthButton",
      "usage": "import PressDepthButton from \"@/components/buildwithme/press-depth-button/press-depth-button\";\n\n<PressDepthButton />",
      "dependencies": {}
    },
    "vue": {
      "source": "designs/press-depth-button/vue.vue",
      "exportName": "PressDepthButton",
      "usage": "import PressDepthButton from '@buildwithme/vue/press-depth-button';\\n\\n<PressDepthButton />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/press-depth-button/svelte.svelte",
      "exportName": "PressDepthButton",
      "usage": "import PressDepthButton from '@buildwithme/svelte/press-depth-button';\\n\\n<PressDepthButton />",
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
    },
    {
      "name": "label",
      "type": "string",
      "default": "Give it a push",
      "description": "Button text."
    },
    {
      "name": "onClick",
      "type": "() => void",
      "default": "undefined",
      "description": "Action callback."
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
  "style": "designs/press-depth-button/press-depth-button.css"
});
