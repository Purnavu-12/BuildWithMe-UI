import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "elastic-stack",
  "title": "Elastic stack",
  "summary": "An expanding horizontal stack that reveals focused actions without losing context.",
  "domains": [
    "layout"
  ],
  "tags": [
    "stack",
    "expand",
    "hover",
    "adapted"
  ],
  "status": "new",
  "engines": [
    "css"
  ],
  "frameworks": {
    "react": {
      "source": "designs/elastic-stack/react.tsx",
      "exportName": "ElasticStack",
      "usage": "import { ElasticStack } from '@buildwithme/react';\\n\\n<ElasticStack />",
      "dependencies": {}
    },
    "vue": {
      "source": "designs/elastic-stack/vue.vue",
      "exportName": "ElasticStack",
      "usage": "import { ElasticStack } from '@buildwithme/vue';\\n\\n<ElasticStack />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/elastic-stack/svelte.svelte",
      "exportName": "ElasticStack",
      "usage": "import { ElasticStack } from '@buildwithme/svelte';\\n\\n<ElasticStack />",
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
      "default": "Elastic stack",
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
    "upstreamUrl": "https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/elastic-stack.tsx",
    "upstreamAuthor": "Ashutoshx7",
    "upstreamLicense": "MIT",
    "modification": "Reimplemented as a dependency-light, monochrome, theme-aware design with React, Vue, and Svelte source variants and reduced-motion behavior."
  },
  "related": [],
  "style": "designs/elastic-stack/elastic-stack.css"
});
