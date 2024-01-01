/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

const { defineConfig } = require("eslint-define-config");

process.env.ESLINT_TSCONFIG = JSON.stringify([
    "tsconfig.json",
    "tsconfig.app.json",
    "tsconfig.node.json",
]);

module.exports = defineConfig({
    root: true,
    extends: ["@yx1126/eslint-config"],
    rules: {
        "vue/html-self-closing": ["error", {
            html: {
                "void": "always",
                "normal": "never",
                "component": "always",
            },
            svg: "always",
            math: "always",
        }],
    },
});
