import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "media-gallery",
  "title": "Media gallery",
  "summary": "A keyboard-friendly gallery with thumbnails and an immersive stage.",
  "domains": [
    "media"
  ],
  "tags": [
    "gallery",
    "media",
    "carousel"
  ],
  "status": "new",
  "engines": [
    "css"
  ],
  "frameworks": {
    "react": {
      "source": "designs/media-gallery/react.tsx",
      "exportName": "MediaGallery",
      "usage": "import MediaGallery from '@buildwithme/react/media-gallery';\\n\\n<MediaGallery />",
      "dependencies": {}
    },
    "vue": {
      "source": "designs/media-gallery/vue.vue",
      "exportName": "MediaGallery",
      "usage": "import MediaGallery from '@buildwithme/vue/media-gallery';\\n\\n<MediaGallery />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/media-gallery/svelte.svelte",
      "exportName": "MediaGallery",
      "usage": "import MediaGallery from '@buildwithme/svelte/media-gallery';\\n\\n<MediaGallery />",
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
      "default": "Media gallery",
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
