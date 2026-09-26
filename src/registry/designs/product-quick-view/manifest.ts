import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "product-quick-view",
  "title": "Product quick view",
  "summary": "A product detail overlay with media, options, and purchase action.",
  "domains": [
    "commerce"
  ],
  "tags": [
    "product",
    "quick-view",
    "commerce"
  ],
  "status": "new",
  "engines": [
    "css"
  ],
  "frameworks": {
    "react": {
      "source": "designs/product-quick-view/react.tsx",
      "exportName": "ProductQuickView",
      "usage": "import ProductQuickView from '@buildwithme/react/product-quick-view';\\n\\n<ProductQuickView />",
      "dependencies": {}
    },
    "vue": {
      "source": "designs/product-quick-view/vue.vue",
      "exportName": "ProductQuickView",
      "usage": "import ProductQuickView from '@buildwithme/vue/product-quick-view';\\n\\n<ProductQuickView />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/product-quick-view/svelte.svelte",
      "exportName": "ProductQuickView",
      "usage": "import ProductQuickView from '@buildwithme/svelte/product-quick-view';\\n\\n<ProductQuickView />",
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
      "default": "Product quick view",
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
