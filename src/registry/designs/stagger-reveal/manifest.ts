import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "stagger-reveal",
  "title": "Stagger reveal",
  "summary": "Typography that arrives one word at a time.",
  "domains": [
    "typography"
  ],
  "tags": [
    "text",
    "animejs",
    "stagger",
    "reveal",
    "typography"
  ],
  "status": "stable",
  "engines": [
    "animejs"
  ],
  "frameworks": {
    "react": {
      "source": "designs/stagger-reveal/react.tsx",
      "exportName": "StaggerReveal",
      "usage": "import StaggerReveal from \"@/components/buildwithme/stagger-reveal/stagger-reveal\";\n\n<StaggerReveal />",
      "dependencies": {
        "animejs": "4.5.0"
      }
    },
    "vue": {
      "source": "designs/stagger-reveal/vue.vue",
      "exportName": "StaggerReveal",
      "usage": "import StaggerReveal from '@buildwithme/vue/stagger-reveal';\\n\\n<StaggerReveal />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/stagger-reveal/svelte.svelte",
      "exportName": "StaggerReveal",
      "usage": "import StaggerReveal from '@buildwithme/svelte/stagger-reveal';\\n\\n<StaggerReveal />",
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
      "name": "text",
      "type": "string",
      "default": "Ideas into interfaces.",
      "description": "Text revealed by word."
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
  "style": "designs/stagger-reveal/stagger-reveal.css"
});
