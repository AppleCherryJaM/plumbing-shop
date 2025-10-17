/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // добавьте другие переменные по мере необходимости
  // readonly VITE_OTHER_VAR?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}