import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { fileURLToPath, URL } from "node:url";
import Uoncss from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import AutoComponents from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import VitePluginSvgIcon from "./scripts/build-icons";
// import VueDevTools from "vite-plugin-vue-devtools";

function resolve(path: string) {
    return fileURLToPath(new URL(path, import.meta.url));
}

// https://vitejs.dev/config/
export default defineConfig({
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
            dirs: ["./src/hooks", "./src/enums", "./src/stores/modules", "./src/locales/exports"],
            imports: [
                "vue",
                "vue-router",
            ],
            resolvers: [ElementPlusResolver({ importStyle: "sass" })],
        }),
        AutoComponents({
            dts: "./types/components.d.ts",
            resolvers: [ElementPlusResolver({ importStyle: "sass" })],
            include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
            globs: ["src/components/**/index.ts"],
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
    server: {
        host: "0.0.0.0",
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/styles/golbal" as *;`,
            },
        },
    },
});
