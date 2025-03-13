import { TinyColor } from "@ctrl/tinycolor";

export function createTheme(value: string) {
    const color = new TinyColor(value);
    const result: Record<string, string> = {};
    result["--el-color-primary"] = value;
    for(let i = 0; i < 10; i++) {
        result[`--el-color-primary-light-${i}`] = color.mix("#fff", i * 10).toString();
    }
    result["--el-color-primary-dark-2"] = color.mix("#000", 20).toString();
    return result;
}