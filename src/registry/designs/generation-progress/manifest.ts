import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "generation-progress",
  "title": "Generation progress",
  "summary": "Clear progress through a deterministic generation sequence.",
  "domains": [
    "ai"
  ],
  "tags": [
    "ai",
    "motion",
    "generation",
    "progress"
  ],
  "status": "stable",
  "engines": [
    "motion"
  ],
  "frameworks": {
    "react": {
      "source": "designs/generation-progress/react.tsx",
      "exportName": "GenerationProgress",
      "usage": "import GenerationProgress from \"@/components/buildwithme/generation-progress/generation-progress\";\n\n<GenerationProgress />",
      "dependencies": {
        "motion": "13.4.4"
      }
    },
    "vue": {
      "source": "designs/generation-progress/vue.vue",
      "exportName": "GenerationProgress",
      "usage": "import GenerationProgress from '@buildwithme/vue/generation-progress';\\n\\n<GenerationProgress />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/generation-progress/svelte.svelte",
      "exportName": "GenerationProgress",
      "usage": "import GenerationProgress from '@buildwithme/svelte/generation-progress';\\n\\n<GenerationProgress />",
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
  "style": "designs/generation-progress/generation-progress.css"
});
