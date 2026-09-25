import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "expandable-card",
  "title": "Expandable card",
  "summary": "A compact card that makes room for the whole story.",
  "domains": [
    "layout"
  ],
  "tags": [
    "cards",
    "motion",
    "expandable",
    "card",
    "layout"
  ],
  "status": "stable",
  "engines": [
    "motion"
  ],
  "frameworks": {
    "react": {
      "source": "designs/expandable-card/react.tsx",
      "exportName": "ExpandableCard",
      "usage": "import ExpandableCard from \"@/components/buildwithme/expandable-card/expandable-card\";\n\n<ExpandableCard />",
      "dependencies": {
        "motion": "13.4.4"
      }
    },
    "vue": {
      "source": "designs/expandable-card/vue.vue",
      "exportName": "ExpandableCard",
      "usage": "import ExpandableCard from '@buildwithme/vue/expandable-card';\\n\\n<ExpandableCard />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/expandable-card/svelte.svelte",
      "exportName": "ExpandableCard",
      "usage": "import ExpandableCard from '@buildwithme/svelte/expandable-card';\\n\\n<ExpandableCard />",
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
  "style": "designs/expandable-card/expandable-card.css"
});
