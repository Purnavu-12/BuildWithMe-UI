import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "border-trace-button",
  "title": "Border-trace button",
  "summary": "A moving highlight that traces the edge of your next action.",
  "domains": [
    "actions"
  ],
  "tags": [
    "buttons",
    "css",
    "border",
    "trace",
    "button",
    "actions"
  ],
  "status": "stable",
  "engines": [
    "css"
  ],
  "frameworks": {
    "react": {
      "source": "designs/border-trace-button/react.tsx",
      "exportName": "BorderTraceButton",
      "usage": "import BorderTraceButton from \"@/components/buildwithme/border-trace-button/border-trace-button\";\n\n<BorderTraceButton />",
      "dependencies": {}
    },
    "vue": {
      "source": "designs/border-trace-button/vue.vue",
      "exportName": "BorderTraceButton",
      "usage": "import BorderTraceButton from '@buildwithme/vue/border-trace-button';\\n\\n<BorderTraceButton />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/border-trace-button/svelte.svelte",
      "exportName": "BorderTraceButton",
      "usage": "import BorderTraceButton from '@buildwithme/svelte/border-trace-button';\\n\\n<BorderTraceButton />",
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
      "default": "Explore the possibilities",
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
  "style": "designs/border-trace-button/border-trace-button.css"
});
