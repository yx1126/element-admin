import { defineConfig, presetUno, presetAttributify, type DynamicMatcher, type CSSValue  } from "unocss";

/**
 * parse color
 * @example
 * c-f0000 -> color: #f0000
 * c-f0000-25 -> color: #f0000; opacity: 0.25
 */
const colorParse: DynamicMatcher =  ([,,color,,,value]) => {
    const result: CSSValue = {
        color: "#" + color,
    };
    const opacity = parseInt(value);
    if(!isNaN(opacity)) {
        result.opacity = opacity === 0 ? 0 : parseInt(value) / 100;
    }
    return result;
};
const colorParseV2: DynamicMatcher =  ([,,color, value]) => {
    const result: CSSValue = {
        color,
    };
    const opacity = parseInt(value);
    if(!isNaN(opacity)) {
        result.opacity = opacity === 0 ? 0 : parseInt(value) / 100;
    }
    return result;
};

/**
 * parse width and height
 * @example
 * w-100p -> width: 100%
 * w-100 -> width: 100px
 */
const parsePercent: DynamicMatcher = ([full, n, v]) => {
    return {
        [n.startsWith("w") ? "width" : "height"]: full.endsWith("p") ? v + "%" : v + "px",
    };
};

export default defineConfig({
    rules: [
        [/^(c|color)-([a-zA-Z]+)-(\d{0,2}|100)$/, colorParseV2],
        [/^(c|color)-(([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}))(-(\d{0,2}|100))?$/, colorParse],
        [/^(w|h|width|height)-(\d+)(p?)$/, parsePercent],
    ],
    presets: [
        presetUno(),
        presetAttributify(),
    ],
});
