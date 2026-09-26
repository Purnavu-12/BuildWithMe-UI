import { defineManifest } from '../../schema';

export default defineManifest({
  "schemaVersion": 2,
  "id": "account-login-card",
  "title": "Account login card",
  "summary": "A compact authentication surface with labeled fields and clear submission hierarchy.",
  "domains": [
    "forms"
  ],
  "tags": [
    "login",
    "form",
    "account",
    "adapted"
  ],
  "status": "new",
  "engines": [
    "css"
  ],
  "frameworks": {
    "react": {
      "source": "designs/account-login-card/react.tsx",
      "exportName": "AccountLoginCard",
      "usage": "import { AccountLoginCard } from '@buildwithme/react';\\n\\n<AccountLoginCard />",
      "dependencies": {}
    },
    "vue": {
      "source": "designs/account-login-card/vue.vue",
      "exportName": "AccountLoginCard",
      "usage": "import { AccountLoginCard } from '@buildwithme/vue';\\n\\n<AccountLoginCard />",
      "dependencies": {}
    },
    "svelte": {
      "source": "designs/account-login-card/svelte.svelte",
      "exportName": "AccountLoginCard",
      "usage": "import { AccountLoginCard } from '@buildwithme/svelte';\\n\\n<AccountLoginCard />",
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
      "default": "Account login card",
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
    "upstreamUrl": "https://github.com/vercel/registry-starter/blob/main/src/components/login.tsx",
    "upstreamAuthor": "Vercel, Inc.",
    "upstreamLicense": "MIT",
    "modification": "Reimplemented as a dependency-light, monochrome, theme-aware design with React, Vue, and Svelte source variants and reduced-motion behavior."
  },
  "related": [],
  "style": "designs/account-login-card/account-login-card.css"
});
