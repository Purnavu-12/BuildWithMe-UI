import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "command-palette",
  "title": "Command palette",
  "summary": "A keyboard-first command surface with grouped actions and fast filtering.",
  "domains": [
    "navigation"
  ],
  "tags": [
    "command",
    "keyboard",
    "search"
  ],
  "status": "new",
  "engines": [
    "css"
  ],
  "frameworks": {
    "react": {
      "source": "designs/command-palette/react.tsx",
      "exportName": "CommandPalette",
      "usage": "import CommandPalette from '@buildwithme/react/command-palette';\\n\\n<CommandPalette />",
      "dependencies": {}
    },
    "vue": {
      "source": "designs/command-palette/vue.vue",
      "exportName": "CommandPalette",
      "usage": "import CommandPalette from '@buildwithme/vue/command-palette';\\n\\n<CommandPalette />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/command-palette/svelte.svelte",
      "exportName": "CommandPalette",
      "usage": "import CommandPalette from '@buildwithme/svelte/command-palette';\\n\\n<CommandPalette />",
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
      "default": "Command palette",
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
