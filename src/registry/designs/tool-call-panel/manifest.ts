import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "tool-call-panel",
  "title": "Tool-call panel",
  "summary": "A transparent look at what an assistant is doing.",
  "domains": [
    "ai"
  ],
  "tags": [
    "ai",
    "css",
    "tool",
    "call",
    "panel"
  ],
  "status": "stable",
  "engines": [
    "css"
  ],
  "frameworks": {
    "react": {
      "source": "designs/tool-call-panel/react.tsx",
      "exportName": "ToolCallPanel",
      "usage": "import ToolCallPanel from \"@/components/buildwithme/tool-call-panel/tool-call-panel\";\n\n<ToolCallPanel />",
      "dependencies": {}
    },
    "vue": {
      "source": "designs/tool-call-panel/vue.vue",
      "exportName": "ToolCallPanel",
      "usage": "import ToolCallPanel from '@buildwithme/vue/tool-call-panel';\\n\\n<ToolCallPanel />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/tool-call-panel/svelte.svelte",
      "exportName": "ToolCallPanel",
      "usage": "import ToolCallPanel from '@buildwithme/svelte/tool-call-panel';\\n\\n<ToolCallPanel />",
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
  "style": "designs/tool-call-panel/tool-call-panel.css"
});
