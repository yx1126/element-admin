import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import AutoComponents from "unplugin-vue-components/vite";
import Uoncss from "unocss/vite";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { presetUno, presetAttributify } from "unocss";

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
            dirs: ["./src/hooks", "./src/stores/modules", "./src/locales/exports", "./src/utils"],
            imports: [
                "vue",
                "vue-router",
            ],
            resolvers: [ElementPlusResolver()],
        }),
        AutoComponents({
            dts: "./types/components.d.ts",
            resolvers: [ElementPlusResolver()],
        }),
        VueI18nPlugin({}),
        Uoncss({
            rules: [
                [/^(c|color)-(\d+|\w+)$/, ([,,d]) => /\d/g.test(d) ? ({ color: `#${d}` }) : void 0],
                [/^(c|color)-(\d+|\w+)-(\d+)$/, ([,,d, n]) => ({ color: /\d/g.test(d) ? `#${d}` : d, opacity: Number(n) / 1000 })],
                [/^(w|width)-(\d+)p$/, ([,,d]) => ({ width: `${d}%` })],
                [/^(h|height)-(\d+)p$/, ([,,d]) => ({ height: `${d}%` })],
            ],
            presets: [
                presetUno(),
                presetAttributify(),
            ],
        }),
    ],
    server: {
        host: "0.0.0.0",
    },
});
