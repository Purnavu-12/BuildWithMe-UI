import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "product-grid",
  "title": "Product grid",
  "summary": "A responsive commerce shelf with clear product hierarchy and selection states.",
  "domains": [
    "commerce"
  ],
  "tags": [
    "commerce",
    "products",
    "grid",
    "adapted"
  ],
  "status": "new",
  "engines": [
    "css"
  ],
  "frameworks": {
    "react": {
      "source": "designs/product-grid/react.tsx",
      "exportName": "ProductGrid",
      "usage": "import { ProductGrid } from '@buildwithme/react';\\n\\n<ProductGrid />",
      "dependencies": {}
    },
    "vue": {
      "source": "designs/product-grid/vue.vue",
      "exportName": "ProductGrid",
      "usage": "import { ProductGrid } from '@buildwithme/vue';\\n\\n<ProductGrid />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/product-grid/svelte.svelte",
      "exportName": "ProductGrid",
      "usage": "import { ProductGrid } from '@buildwithme/svelte';\\n\\n<ProductGrid />",
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
      "default": "Product grid",
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
    "upstreamUrl": "https://github.com/vercel/registry-starter/blob/main/src/components/product-grid.tsx",
    "upstreamAuthor": "Vercel, Inc.",
    "upstreamLicense": "MIT",
    "modification": "Reimplemented as a dependency-light, monochrome, theme-aware design with React, Vue, and Svelte source variants and reduced-motion behavior."
  },
  "related": [],
  "style": "designs/product-grid/product-grid.css"
});
