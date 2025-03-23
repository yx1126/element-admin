import { defineConfig, extractorSplit } from "unocss";
import presetUno from "@unocss/preset-wind3";

export default defineConfig({
    presets: [
        presetUno(),
        // presetAttributify(),
        extractorSplit,
    ],
    transformers: [],
    rules: [
        [
            /^(c|text)-(primary|success|info|warning|danger)$/,
            ([,,type]) => ({ color: `var(--el-color-${type})` }),
        ],
    ],
});