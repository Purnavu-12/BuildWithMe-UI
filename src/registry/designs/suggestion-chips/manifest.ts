import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "suggestion-chips",
  "title": "Suggestion chips",
  "summary": "Small invitations that make a blank canvas less blank.",
  "domains": [
    "ai"
  ],
  "tags": [
    "ai",
    "motion",
    "suggestion",
    "chips"
  ],
  "status": "stable",
  "engines": [
    "motion"
  ],
  "frameworks": {
    "react": {
      "source": "designs/suggestion-chips/react.tsx",
      "exportName": "SuggestionChips",
      "usage": "import SuggestionChips from \"@/components/buildwithme/suggestion-chips/suggestion-chips\";\n\n<SuggestionChips />",
      "dependencies": {
        "motion": "13.4.4"
      }
    },
    "vue": {
      "source": "designs/suggestion-chips/vue.vue",
      "exportName": "SuggestionChips",
      "usage": "import SuggestionChips from '@buildwithme/vue/suggestion-chips';\\n\\n<SuggestionChips />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/suggestion-chips/svelte.svelte",
      "exportName": "SuggestionChips",
      "usage": "import SuggestionChips from '@buildwithme/svelte/suggestion-chips';\\n\\n<SuggestionChips />",
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
      "name": "options",
      "type": "string[]",
      "default": "three example prompts",
      "description": "Selectable prompt suggestions."
    },
    {
      "name": "onSelect",
      "type": "(value: string) => void",
      "default": "undefined",
      "description": "Receives selected prompt."
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
  "style": "designs/suggestion-chips/suggestion-chips.css"
});
