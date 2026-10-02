import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "dialog-sheet",
  "title": "Dialog sheet",
  "summary": "An adaptive modal that becomes a bottom sheet on smaller screens.",
  "domains": [
    "overlays"
  ],
  "tags": [
    "dialog",
    "sheet",
    "modal"
  ],
  "status": "new",
  "engines": [
    "css"
  ],
  "frameworks": {
    "react": {
      "source": "designs/dialog-sheet/react.tsx",
      "exportName": "DialogSheet",
      "usage": "import DialogSheet from '@buildwithme/react/dialog-sheet';\\n\\n<DialogSheet />",
      "dependencies": {}
    },
    "vue": {
      "source": "designs/dialog-sheet/vue.vue",
      "exportName": "DialogSheet",
      "usage": "import DialogSheet from '@buildwithme/vue/dialog-sheet';\\n\\n<DialogSheet />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/dialog-sheet/svelte.svelte",
      "exportName": "DialogSheet",
      "usage": "import DialogSheet from '@buildwithme/svelte/dialog-sheet';\\n\\n<DialogSheet />",
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
      "default": "Dialog sheet",
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
  "related": [],
  "style": "designs/dialog-sheet/dialog-sheet.css"
});
