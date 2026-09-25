import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "sortable-data-table",
  "title": "Sortable data table",
  "summary": "A dense data table with accessible sorting and row actions.",
  "domains": [
    "data-display"
  ],
  "tags": [
    "table",
    "sort",
    "data"
  ],
  "status": "new",
  "engines": [
    "css"
  ],
  "frameworks": {
    "react": {
      "source": "designs/sortable-data-table/react.tsx",
      "exportName": "SortableDataTable",
      "usage": "import SortableDataTable from '@buildwithme/react/sortable-data-table';\\n\\n<SortableDataTable />",
      "dependencies": {}
    },
    "vue": {
      "source": "designs/sortable-data-table/vue.vue",
      "exportName": "SortableDataTable",
      "usage": "import SortableDataTable from '@buildwithme/vue/sortable-data-table';\\n\\n<SortableDataTable />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/sortable-data-table/svelte.svelte",
      "exportName": "SortableDataTable",
      "usage": "import SortableDataTable from '@buildwithme/svelte/sortable-data-table';\\n\\n<SortableDataTable />",
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
      "default": "Sortable data table",
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
