import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { fileURLToPath, URL } from "node:url";
import Uoncss from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
// import AutoComponents from "unplugin-vue-components/vite";
// import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { defineConfig } from "vite";
import VitePluginSvgIcon from "./scripts/build-icons";
// import VueDevTools from "vite-plugin-vue-devtools";
import pkg from "./package.json";

function resolve(path: string) {
    return fileURLToPath(new URL(path, import.meta.url));
}

const IMPORT_FNS: Record<string, string[]> = {
    vue: ["renderSlot", "renderList", "mergeProps", "createVNode", "render"],
};

// https://vitejs.dev/config/
export default defineConfig(() => {
    return {
        resolve: {
            alias: {
                "@": resolve("./src"),
                "#": resolve("./types"),
            },
        },
        plugins: [
            vue(),
            vueJsx(),
            AutoImport({
                dts: "./types/auto-imports.d.ts",
                dirs: ["./src/hooks", "./src/enums", "./src/stores/modules"],
                dirsScanOptions: {
                    types: false,
                },
                imports: [
                    "vue",
                    "vue-router",
                    ...Object.keys(IMPORT_FNS).map(key => ({
                        [key]: IMPORT_FNS[key],
                    })),
                ],
            }),
            VueI18nPlugin({}),
            Uoncss(),
            VitePluginSvgIcon({
                paths: [resolve("./src/assets/svg/")],
                symbolId: "local-[name]",
                type: "script",
            }),
            // VueDevTools(),
        ],
        optimizeDeps: {
            include: [
                ...Object.keys(pkg.dependencies),
                "shiki/core",
                "shiki/langs/vue.mjs",
                "shiki/langs/typescript.mjs",
                "shiki/engine-javascript.mjs",
                "shiki/themes/github-dark.mjs",
                "shiki/themes/github-light.mjs",
            ],
        },
        server: {
            host: "0.0.0.0",
            port: 80,
            hmr: true,
            proxy: {
                "/api": {
                    target: "http://localhost:9000",
                    changeOrigin: true,
                },
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "@/styles/global/global" as *; @use "@/styles/global/mixins" as *;`,
                },
            },
        },
    };
});