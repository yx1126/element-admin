// @ts-check
import { defineEslint } from "@yx1126/lint-config";

export default defineEslint({
    vue: {
        sfcBlocks: {
            blocks: {
                customBlocks: true,
            },
        },
        rules: {
            "vue/block-lang": ["error", {
                script: {
                    lang: ["ts", "tsx"],
                },
                i18n: {
                    lang: "yaml",
                },
            }],
        },
    },
    rules: {
        "@stylistic/eol-last": "off",
    },
});