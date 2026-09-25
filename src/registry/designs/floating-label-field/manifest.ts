import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "floating-label-field",
  "title": "Floating label field",
  "summary": "A polished input whose label responds to focus and content.",
  "domains": [
    "forms"
  ],
  "tags": [
    "input",
    "field",
    "form"
  ],
  "status": "new",
  "engines": [
    "css"
  ],
  "frameworks": {
    "react": {
      "source": "designs/floating-label-field/react.tsx",
      "exportName": "FloatingLabelField",
      "usage": "import FloatingLabelField from '@buildwithme/react/floating-label-field';\\n\\n<FloatingLabelField />",
      "dependencies": {}
    },
    "vue": {
      "source": "designs/floating-label-field/vue.vue",
      "exportName": "FloatingLabelField",
      "usage": "import FloatingLabelField from '@buildwithme/vue/floating-label-field';\\n\\n<FloatingLabelField />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/floating-label-field/svelte.svelte",
      "exportName": "FloatingLabelField",
      "usage": "import FloatingLabelField from '@buildwithme/svelte/floating-label-field';\\n\\n<FloatingLabelField />",
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
      "default": "Floating label field",
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
