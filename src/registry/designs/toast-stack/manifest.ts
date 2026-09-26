import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "toast-stack",
  "title": "Toast stack",
  "summary": "An announced notification queue with dismiss and timeout controls.",
  "domains": [
    "feedback"
  ],
  "tags": [
    "toast",
    "notification",
    "status"
  ],
  "status": "new",
  "engines": [
    "css"
  ],
  "frameworks": {
    "react": {
      "source": "designs/toast-stack/react.tsx",
      "exportName": "ToastStack",
      "usage": "import ToastStack from '@buildwithme/react/toast-stack';\\n\\n<ToastStack />",
      "dependencies": {}
    },
    "vue": {
      "source": "designs/toast-stack/vue.vue",
      "exportName": "ToastStack",
      "usage": "import ToastStack from '@buildwithme/vue/toast-stack';\\n\\n<ToastStack />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/toast-stack/svelte.svelte",
      "exportName": "ToastStack",
      "usage": "import ToastStack from '@buildwithme/svelte/toast-stack';\\n\\n<ToastStack />",
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
      "default": "Toast stack",
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
