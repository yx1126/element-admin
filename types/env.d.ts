/// <reference types="vite/client" />

export interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_BASE_URL: string;
    readonly VITE_PUBLIC_PATH: string;
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}