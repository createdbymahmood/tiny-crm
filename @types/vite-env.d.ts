/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly APP_JSON_MOCK_URL: string;
  readonly APP_JWT_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
