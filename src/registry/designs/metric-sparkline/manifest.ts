import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "metric-sparkline",
  "title": "Metric sparkline",
  "summary": "A compact metric card pairing context with an inline trend chart.",
  "domains": [
    "data-visualization"
  ],
  "tags": [
    "chart",
    "metric",
    "dashboard"
  ],
  "status": "new",
  "engines": [
    "css"
  ],
  "frameworks": {
    "react": {
      "source": "designs/metric-sparkline/react.tsx",
      "exportName": "MetricSparkline",
      "usage": "import MetricSparkline from '@buildwithme/react/metric-sparkline';\\n\\n<MetricSparkline />",
      "dependencies": {}
    },
    "vue": {
      "source": "designs/metric-sparkline/vue.vue",
      "exportName": "MetricSparkline",
      "usage": "import MetricSparkline from '@buildwithme/vue/metric-sparkline';\\n\\n<MetricSparkline />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/metric-sparkline/svelte.svelte",
      "exportName": "MetricSparkline",
      "usage": "import MetricSparkline from '@buildwithme/svelte/metric-sparkline';\\n\\n<MetricSparkline />",
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
      "default": "Metric sparkline",
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
