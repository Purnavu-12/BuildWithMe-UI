import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "particle-field",
  "title": "Particle field",
  "summary": "A deterministic constellation of gently drifting points.",
  "domains": [
    "backgrounds"
  ],
  "tags": [
    "backgrounds",
    "animejs",
    "particle",
    "field"
  ],
  "status": "stable",
  "engines": [
    "animejs"
  ],
  "frameworks": {
    "react": {
      "source": "designs/particle-field/react.tsx",
      "exportName": "ParticleField",
      "usage": "import ParticleField from \"@/components/buildwithme/particle-field/particle-field\";\n\n<ParticleField />",
      "dependencies": {
        "animejs": "4.5.0"
      }
    },
    "vue": {
      "source": "designs/particle-field/vue.vue",
      "exportName": "ParticleField",
      "usage": "import ParticleField from '@buildwithme/vue/particle-field';\\n\\n<ParticleField />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/particle-field/svelte.svelte",
      "exportName": "ParticleField",
      "usage": "import ParticleField from '@buildwithme/svelte/particle-field';\\n\\n<ParticleField />",
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
  "style": "designs/particle-field/particle-field.css"
});
