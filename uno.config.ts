import { defineConfig, extractorSplit } from "unocss";
import presetUno from "@unocss/preset-wind3";

export default defineConfig({
    rules: [],
    presets: [
        presetUno(),
        // presetAttributify(),
        extractorSplit,
    ],
    transformers: [],
});