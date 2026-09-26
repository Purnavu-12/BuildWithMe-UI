import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "animated-tabs",
  "title": "Animated tabs",
  "summary": "A sliding indicator with complete keyboard navigation.",
  "domains": [
    "layout"
  ],
  "tags": [
    "cards",
    "motion",
    "animated",
    "tabs",
    "layout"
  ],
  "status": "stable",
  "engines": [
    "motion"
  ],
  "frameworks": {
    "react": {
      "source": "designs/animated-tabs/react.tsx",
      "exportName": "AnimatedTabs",
      "usage": "import AnimatedTabs from \"@/components/buildwithme/animated-tabs/animated-tabs\";\n\n<AnimatedTabs />",
      "dependencies": {
        "motion": "13.4.4"
      }
    },
    "vue": {
      "source": "designs/animated-tabs/vue.vue",
      "exportName": "AnimatedTabs",
      "usage": "import AnimatedTabs from '@buildwithme/vue/animated-tabs';\\n\\n<AnimatedTabs />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/animated-tabs/svelte.svelte",
      "exportName": "AnimatedTabs",
      "usage": "import AnimatedTabs from '@buildwithme/svelte/animated-tabs';\\n\\n<AnimatedTabs />",
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
  "style": "designs/animated-tabs/animated-tabs.css"
});
