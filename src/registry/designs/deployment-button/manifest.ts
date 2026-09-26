import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "deployment-button",
  "title": "Deployment button",
  "summary": "A stateful-looking deployment action with a compact progress signal.",
  "domains": [
    "actions"
  ],
  "tags": [
    "deploy",
    "button",
    "loading",
    "adapted"
  ],
  "status": "new",
  "engines": [
    "css"
  ],
  "frameworks": {
    "react": {
      "source": "designs/deployment-button/react.tsx",
      "exportName": "DeploymentButton",
      "usage": "import { DeploymentButton } from '@buildwithme/react';\\n\\n<DeploymentButton />",
      "dependencies": {}
    },
    "vue": {
      "source": "designs/deployment-button/vue.vue",
      "exportName": "DeploymentButton",
      "usage": "import { DeploymentButton } from '@buildwithme/vue';\\n\\n<DeploymentButton />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/deployment-button/svelte.svelte",
      "exportName": "DeploymentButton",
      "usage": "import { DeploymentButton } from '@buildwithme/svelte';\\n\\n<DeploymentButton />",
      "dependencies": {}
    }
  },
  "installation": {
    "npm": true,
    "source": true,
    "copy": true
  },
  "accessibility": {
    "summary": "Uses semantic controls, visible focus, theme-aware contrast, and reduced-motion fallbacks.",
    "features": [
      "Keyboard reachable controls",
      "Visible focus treatment",
      "Reduced-motion friendly",
      "Dark and light themes"
    ]
  },
  "props": [
    {
      "name": "label",
      "type": "string",
      "default": "Deployment button",
      "description": "Accessible display label."
    },
    {
      "name": "paused",
      "type": "boolean",
      "default": "false",
      "description": "Pauses decorative animation."
    }
  ],
  "provenance": {
    "type": "adapted",
    "creator": {
      "name": "BuildWithMe-UI contributors"
    },
    "license": "MIT",
    "upstreamUrl": "https://github.com/vercel/examples/blob/main/internal/packages/ui/src/button.tsx",
    "upstreamAuthor": "Vercel, Inc.",
    "upstreamLicense": "MIT",
    "modification": "Reimplemented as a dependency-light, monochrome, theme-aware design with React, Vue, and Svelte source variants and reduced-motion behavior."
  },
  "related": [],
  "style": "designs/deployment-button/deployment-button.css"
});
