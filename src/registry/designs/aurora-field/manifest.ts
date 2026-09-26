import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "aurora-field",
  "title": "Aurora field",
  "summary": "Slow-moving color that gives a quiet page some atmosphere.",
  "domains": [
    "backgrounds"
  ],
  "tags": [
    "backgrounds",
    "css",
    "aurora",
    "field"
  ],
  "status": "stable",
  "engines": [
    "css"
  ],
  "frameworks": {
    "react": {
      "source": "designs/aurora-field/react.tsx",
      "exportName": "AuroraField",
      "usage": "import AuroraField from \"@/components/buildwithme/aurora-field/aurora-field\";\n\n<AuroraField />",
      "dependencies": {}
    },
    "vue": {
      "source": "designs/aurora-field/vue.vue",
      "exportName": "AuroraField",
      "usage": "import AuroraField from '@buildwithme/vue/aurora-field';\\n\\n<AuroraField />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/aurora-field/svelte.svelte",
      "exportName": "AuroraField",
      "usage": "import AuroraField from '@buildwithme/svelte/aurora-field';\\n\\n<AuroraField />",
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
  "style": "designs/aurora-field/aurora-field.css"
});
