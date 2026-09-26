import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "workflow-stepper",
  "title": "Workflow stepper",
  "summary": "A clear process timeline for pending, active, and completed work.",
  "domains": [
    "workflows"
  ],
  "tags": [
    "workflow",
    "stepper",
    "progress"
  ],
  "status": "new",
  "engines": [
    "css"
  ],
  "frameworks": {
    "react": {
      "source": "designs/workflow-stepper/react.tsx",
      "exportName": "WorkflowStepper",
      "usage": "import WorkflowStepper from '@buildwithme/react/workflow-stepper';\\n\\n<WorkflowStepper />",
      "dependencies": {}
    },
    "vue": {
      "source": "designs/workflow-stepper/vue.vue",
      "exportName": "WorkflowStepper",
      "usage": "import WorkflowStepper from '@buildwithme/vue/workflow-stepper';\\n\\n<WorkflowStepper />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/workflow-stepper/svelte.svelte",
      "exportName": "WorkflowStepper",
      "usage": "import WorkflowStepper from '@buildwithme/svelte/workflow-stepper';\\n\\n<WorkflowStepper />",
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
      "default": "Workflow stepper",
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
