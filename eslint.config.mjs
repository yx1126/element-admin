import { defineFlatConfig } from "eslint-define-config";
import pluginVue from "eslint-plugin-vue";
import tseslint, { parser as TsParser } from "typescript-eslint";
import VueParser from "vue-eslint-parser";
import jsonc from "eslint-plugin-jsonc";
import yml from "eslint-plugin-yml";

export default defineFlatConfig([
    ...tseslint.configs.recommended,
    ...pluginVue.configs["flat/recommended"],
    ...jsonc.configs["flat/recommended-with-jsonc"],
    ...yml.configs["flat/standard"],
    {
        languageOptions: {
            ecmaVersion: "latest",
            parserOptions: {
                sourceType: "module",
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        ignores: [
            "**/node_modules",
            "**/dist",
            "**/out",
        ],
    },
    {
        files: ["*.yaml", "*.yml"],
        rules: {
            "spaced-comment": "off",
        },
    },
    {
        files: ["*.json", "*.json5", "*.jsonc"],
        rules: {
            "jsonc/array-bracket-newline": ["error",
                {
                    "multiline": true,
                    "minItems": null,
                },
            ],
            "jsonc/array-bracket-spacing": ["error", "never"],
            "jsonc/indent": ["error", 4],
            "jsonc/comma-dangle": ["error", "never"],
            "jsonc/comma-style": ["error", "last"],
            "jsonc/key-spacing": ["error",
                {
                    "beforeColon": false,
                    "afterColon": true,
                    "mode": "strict",
                },
            ],
            "jsonc/object-curly-newline": ["error", { multiline: true, consistent: true }],
            "jsonc/object-curly-spacing": ["error", "always"],
            "jsonc/quotes": ["error", "double"],
        }
    },
    {
        files: ["package.json"],
        rules: {
            "jsonc/sort-keys": [
                "error",
                {
                    pathPattern: "^$",
                    order: [
                        "name",
                        "version",
                        "private",
                        "packageManager",
                        "description",
                        "type",
                        "keywords",
                        "license",
                        "author",
                        "contributors",
                        "funding",
                        "files",
                        "main",
                        "module",
                        "exports",
                        "unpkg",
                        "jsdelivr",
                        "browser",
                        "bin",
                        "man",
                        "directories",
                        "homepage",
                        "repository",
                        "bugs",
                        "publishConfig",
                        "scripts",
                        "peerDependencies",
                        "peerDependenciesMeta",
                        "optionalDependencies",
                        "dependencies",
                        "devDependencies",
                        "engines",
                        "config",
                        "overrides",
                        "pnpm",
                        "husky",
                        "lint-staged",
                        "eslintConfig",
                    ],
                },
                {
                    pathPattern: "^(?:dev|peer|optional|bundled)?[Dd]ependencies$",
                    order: { type: "asc" },
                },
                {
                    pathPattern: "^exports.*$",
                    order: [
                        "types",
                        "import",
                        "require",
                        "default",
                    ],
                },
            ],
        },
    },
    {
        files: [
            "**/*.js",
            "**/*.cjs",
            "**/*.mjs",
        ],
        rules: {
            "array-callback-return": ["error", {
                allowImplicit: true,
                checkForEach: true
            }],
            "constructor-super": "error",
            "for-direction": "error",
            "getter-return": "error",
            "no-async-promise-executor": "off",
            "no-case-declarations": "error",
            "no-class-assign": "error",
            "no-compare-neg-zero": "error",
            "no-cond-assign": "error",
            "no-const-assign": "error",
            "no-constant-binary-expression": "error",
            "no-constant-condition": "error",
            "no-control-regex": "error",
            "no-debugger": "error",
            "no-dupe-args": "error",
            "no-dupe-class-members": "error",
            "no-dupe-else-if": "error",
            "no-dupe-keys": "error",
            "no-duplicate-case": "error",
            "no-duplicate-imports": ["error", {
                includeExports: true
            }],
            "no-empty-character-class": "error",
            "no-empty-pattern": "error",
            "no-ex-assign": "error",
            "no-fallthrough": "error",
            "no-func-assign": "error",
            "no-import-assign": "error",
            "no-invalid-regexp": "error",
            "no-irregular-whitespace": "error",
            "no-loss-of-precision": "error",
            "no-misleading-character-class": "error",
            "no-new-native-nonconstructor": "error",
            "no-obj-calls": "error",
            "no-promise-executor-return": "error",
            "no-prototype-builtins": "error",
            "no-self-assign": "error",
            "no-self-compare": "error",
            "no-setter-return": "error",
            "no-sparse-arrays": "error",
            "no-template-curly-in-string": "off",
            "no-this-before-super": "error",
            "no-undef": "off",
            "no-unexpected-multiline": "error",
            "no-unmodified-loop-condition": "off",
            "no-unreachable": "error",
            "no-unsafe-finally": "error",
            "no-unsafe-negation": "error",
            "no-unsafe-optional-chaining": "error",
            "no-unused-vars": ["error", {
                "varsIgnorePattern": "^_",
                "argsIgnorePattern": "^_"
            }],
            "no-use-before-define": ["error", {
                functions: false,
                classes: false,
                variables: true,
                allowNamedExports: false,
            }],
            "no-useless-backreference": "error",
            "no-useless-catch": "error",
            "no-useless-escape": "off",
            "require-yield": "error",
            "use-isnan": "error",
            "valid-typeof": "error",
            "no-unused-private-class-members": "error",

            // Suggestions
            "block-scoped-var": "error",
            "no-alert": "error",
            "no-console": "error",
            "no-delete-var": "error",
            "no-else-return": ["error", {
                allowElseIf: false,
            }],
            "no-empty": "error",
            "no-eval": "error",
            "no-extra-bind": "error",
            "no-global-assign": "error",
            "no-label-var": "error",
            "no-redeclare": "error",
            "no-regex-spaces": "error",
            "no-unused-labels": "error",
            "no-var": "error",
            "no-with": "error",
            "prefer-const": "error",
            "func-name-matching": "error",
            "no-extra-boolean-cast": "error",
            "no-nonoctal-decimal-escape": "error",
            "no-shadow-restricted-names": "error",
            "no-throw-literal": "error",

            // Deprecated
            "no-new-symbol": "error",
            "array-bracket-spacing": ["error", "never"],
            "arrow-spacing": "error",
            "block-spacing": "error",
            "brace-style": ["error", "1tbs", {
                allowSingleLine: true,
            }],
            "comma-spacing": "error",
            "comma-style": "error",
            "computed-property-spacing": "error",
            "func-call-spacing": "error",
            "function-call-argument-newline": ["error", "consistent"],
            "function-paren-newline": "error",
            "implicit-arrow-linebreak": "error",
            "indent": ["error", 4],
            "jsx-quotes": "error",
            "key-spacing": ["error", {
                "mode": "strict",
            }],
            "keyword-spacing": ["error", {
                overrides: {
                    "if": { "after": false },
                    "for": { "after": false },
                    "while": { "after": false },
                    "switch": { "after": false },
                },
            }],
            "no-multi-spaces": "error",
            "no-multiple-empty-lines": ["error", {
                max: 1
            }],
            "no-whitespace-before-property": "error",
            "object-curly-spacing": ["error", "always"],
            "padded-blocks": ["error", "never"],
            "quotes": ["error", "double", {
                allowTemplateLiterals: true,
                avoidEscape: false
            }],
            "rest-spread-spacing": "error",
            "space-before-blocks": "error",
            "space-before-function-paren": ["error", {
                "anonymous": "never",
                "named": "never",
                "asyncArrow": "always",
            }],
            "space-in-parens": "error",
            "switch-colon-spacing": "error",
            "template-curly-spacing": "error",
            "template-tag-spacing": "error",
        },
    },
    {
        files: [
            "**/*.ts",
            "**/*.cts",
            "**/*.mts",
        ],
        languageOptions: {
            parserOptions: {
                project: ["./tsconfig.json", "./tsconfig.app.json", "./tsconfig.node.json"],
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            "@typescript-eslint/adjacent-overload-signatures": "error",
            "@typescript-eslint/ban-types": [
                "error",
                {
                    extendDefaults: true,
                    types: {
                        Function: false,
                    },
                },
            ],
            "@typescript-eslint/block-spacing": "error",
            "@typescript-eslint/brace-style": ["error", "1tbs", {
                allowSingleLine: true,
            }],
            "@typescript-eslint/comma-spacing": "error",
            "@typescript-eslint/no-array-delete": "error",
            "@typescript-eslint/no-duplicate-enum-values": "error",
            "@typescript-eslint/no-duplicate-type-constituents": "error",
            "@typescript-eslint/ban-ts-comment": "off",
            "@typescript-eslint/no-non-null-assertion": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-extra-non-null-assertion": "error",
            "@typescript-eslint/no-for-in-array": "error",
            "@typescript-eslint/no-import-type-side-effects": "error",
            "@typescript-eslint/no-inferrable-types": "error",
            "@typescript-eslint/no-loss-of-precision": "error",
            "@typescript-eslint/no-meaningless-void-operator": "error",
            "@typescript-eslint/no-misused-new": "error",
            "@typescript-eslint/no-namespace": "error",
            "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
            "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
            "@typescript-eslint/no-redundant-type-constituents": "error",
            "@typescript-eslint/no-require-imports": "error",
            "@typescript-eslint/no-this-alias": "error",
            "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
            "@typescript-eslint/no-unnecessary-condition": "off",
            "@typescript-eslint/no-unnecessary-qualifier": "error",
            "@typescript-eslint/no-unnecessary-template-expression": "error",
            "@typescript-eslint/no-unnecessary-type-arguments": "error",
            "@typescript-eslint/no-unsafe-declaration-merging": "error",
            "@typescript-eslint/no-unsafe-enum-comparison": "error",
            "@typescript-eslint/no-unsafe-unary-minus": "error",
            "@typescript-eslint/no-unused-vars": ["error", {
                "varsIgnorePattern": "^_",
                "argsIgnorePattern": "^_"
            }],
            "@typescript-eslint/no-use-before-define": ["error", {
                functions: false,
                classes: false,
                variables: true,
                allowNamedExports: false,
            }],
            "@typescript-eslint/no-var-requires": "off",
            "@typescript-eslint/only-throw-error": "error",
            "@typescript-eslint/prefer-literal-enum-member": "error",
            "@typescript-eslint/space-before-blocks": "error",
            "@typescript-eslint/space-before-function-paren": ["error", {
                "anonymous": "never",
                "named": "never",
                "asyncArrow": "always",
            }],
            "@typescript-eslint/no-dynamic-delete": "error",

            // Deprecated
            "@typescript-eslint/func-call-spacing": "error",
            "@typescript-eslint/indent": ["error", 4],
            "@typescript-eslint/key-spacing": ["error", {
                "mode": "strict",
            }],
            "@typescript-eslint/keyword-spacing": ["error", {
                overrides: {
                    "if": { "after": false },
                    "for": { "after": false },
                    "while": { "after": false },
                    "switch": { "after": false },
                },
            }],
            "@typescript-eslint/object-curly-spacing": ["error", "always"],
            "@typescript-eslint/quotes": ["error", "double", {
                allowTemplateLiterals: true,
                avoidEscape: false
            }],
        },
    },
    {
        files: ["**/*.vue"],
        languageOptions: {
            parser: VueParser,
            parserOptions: {
                parser: TsParser,
            },
            globals: {
                defineProps: "readonly",
                defineEmits: "readonly",
                defineExpose: "readonly",
                withDefaults: "readonly",
            },
        },
        rules: {
            "vue/html-indent": ["error", 4],
            "vue/script-indent": ["error", 4, {
                baseIndent: 0,
                switchCase: 1,
            }],
            "vue/html-quotes": ["error", "double", { "avoidEscape": true }],
            "vue/max-attributes-per-line": ["error", {
                "singleline": {
                    "max": 12,
                },
                "multiline": {
                    "max": 1,
                },
            }],
            "vue/require-default-prop": "off",
            "vue/v-slot-style": ["error", {
                "atComponent": "shorthand",
                "default": "shorthand",
                "named": "shorthand",
            }],
            "vue/no-v-html": "error",
            "vue/singleline-html-element-content-newline": "off",
            "vue/one-component-per-file": "off",
            "vue/no-reserved-component-names": "off",
            "vue/html-self-closing": ["error", {
                "html": {
                    "void": "never",
                    "normal": "any",
                    "component": "always"
                },
                svg: "always",
                math: "always"
            }],
            "vue/component-name-in-template-casing": ["error", "kebab-case", {
                "ignores": ["/^[A-Z][a-z0-9]+$/"]
            }],
        },
    },
    {
        rules: {
            "vue/multi-word-component-names": "off",
        }
    }
]);