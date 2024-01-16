import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import AutoComponents from "unplugin-vue-components/vite";
import Uoncss from "unocss/vite";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

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
    // css: {
    //     preprocessorOptions: {
    //         scss: {
    //             additionalData: `@use "@/styles/element-plus.scss" as *;`,
    //         },
    //     },
    // },
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
        }),
        VueI18nPlugin({}),
        Uoncss(),
    ],
    server: {
        host: "0.0.0.0",
    },
});
