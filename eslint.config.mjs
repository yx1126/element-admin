// @ts-check
import { defineEslint } from "@yx1126/lint-config";

export default defineEslint({
    vue: {
        sfcBlocks: {
            blocks: {
                customBlocks: true,
            },
        },
        blockLang: {
            i18n: {
                lang: ["yaml", "json"],
                allowNoLang: true,
            },
            style: {
                lang: ["scss", "sass"],
                allowNoLang: true,
            },
        },
        rules: {
            "vue/block-order": [
                "error",
                {
                    order: ["script", "template", "style", "i18n"],
                },
            ],
        },
    },
    rules: {
        // 自定义块问题
        "@stylistic/eol-last": "off",
    },
    flatESLintConfig: [{
        files: ["**/*.vue"],
        rules: {
            "@typescript-eslint/no-unsafe-unary-minus": "off",
        },
    }],
});