/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_ID_INSTANCE: number
  readonly VITE_API_TOKEN_INSTANCE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}