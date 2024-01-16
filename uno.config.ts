import { defineConfig, presetUno, presetAttributify, type DynamicMatcher, type CSSValue } from "unocss";
import type { CSSProperties } from "vue";

function baseParseColor(color, value) {
    const result: CSSValue = {
        color,
    };
    const opacity = parseInt(value);
    if(!isNaN(opacity)) {
        result.opacity = opacity === 0 ? 0 : parseInt(value) / 100;
    }
    return result;
}

const parseColor: DynamicMatcher =  ([,,color,,,value]) => {
    return baseParseColor("#" + color, value);
};
const parseColorV2: DynamicMatcher =  ([,,color, value]) => {
    return baseParseColor(color, value);
};

const parsePercent: DynamicMatcher = ([full, n, v]) => {
    return {
        [n.startsWith("w") ? "width" : "height"]: full.endsWith("p") ? v + "%" : v + "px",
    };
};

const CSS_KEY_MAP: Record<string, keyof CSSProperties> = {
    m: "margin",
    p: "padding",
    t: "top",
    b: "bottom",
    l: "left",
    r: "right",
};

const parseDistance: DynamicMatcher = ([, nameLeft, nameRight, value]) => {
    let property = CSS_KEY_MAP[nameLeft];
    if(nameRight) {
        property += "-" + CSS_KEY_MAP[nameRight];
    }
    return {
        [property]: value + "px",
    };
};

const FLEX_CENTER: CSSProperties = {
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
};

export default defineConfig({
    rules: [
        [/^(c|color)-([a-zA-Z]+)-(\d{0,2}|100)$/, parseColorV2],
        [/^(c|color)-(([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}))(-(\d{0,2}|100))?$/, parseColor],
        [/^(w|h|width|height)-(\d+)(p?)$/, parsePercent, { autocomplete: ["(w|h|width|height)-<num>"] }],
        [/^(m|p)(t|b|l|r)?-([\.\d]+)$/, parseDistance, { autocomplete: ["(m|p)(t|b|l|r)-<num>"] }],
        ["flex-center", FLEX_CENTER as CSSValue],
    ],
    presets: [
        presetUno(),
        presetAttributify(),
    ],
});
