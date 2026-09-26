import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "multi-step-form",
  "title": "Multi-step form",
  "summary": "A guided form flow with progress, validation states, and review.",
  "domains": [
    "forms"
  ],
  "tags": [
    "form",
    "steps",
    "validation"
  ],
  "status": "new",
  "engines": [
    "css"
  ],
  "frameworks": {
    "react": {
      "source": "designs/multi-step-form/react.tsx",
      "exportName": "MultiStepForm",
      "usage": "import MultiStepForm from '@buildwithme/react/multi-step-form';\\n\\n<MultiStepForm />",
      "dependencies": {}
    },
    "vue": {
      "source": "designs/multi-step-form/vue.vue",
      "exportName": "MultiStepForm",
      "usage": "import MultiStepForm from '@buildwithme/vue/multi-step-form';\\n\\n<MultiStepForm />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/multi-step-form/svelte.svelte",
      "exportName": "MultiStepForm",
      "usage": "import MultiStepForm from '@buildwithme/svelte/multi-step-form';\\n\\n<MultiStepForm />",
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
      "default": "Multi-step form",
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
