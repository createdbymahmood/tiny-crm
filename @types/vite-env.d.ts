/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly APP_JSON_MOCK_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
