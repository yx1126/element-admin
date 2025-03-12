import { createI18n, type MessageContext } from "vue-i18n";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
import localZh from "./langs/zh.json";
import localEn from "./langs/en.json";
import { isStr } from "@/utils/validata";
import type { Lang } from "#/stores";

function lower(value: unknown) {
    if(isStr(value)) {
        return value.slice(0, 1).toLowerCase() + value.slice(1);
    }
    return value;
}

const i18n = createI18n({
    fallbackLocale: "zh",
    legacy: false,
    messages: {
        zh: {
            edit: "修改",
            input: ({ named }: MessageContext) => `请输入${named("value")}`,
            select: ({ named }: MessageContext) => `请选择${named("value")}`,
            ...localZh,
        },
        en: {
            edit: "Edit",
            input: ({ named }: MessageContext) => {
                return `Please enter your ${lower(named("value"))}`;
            },
            select: ({ named }: MessageContext) => `Please select ${lower(named("value"))}`,
            ...localEn,
        },
    },
    modifiers: {
        lower: value => {
            return value;
        },
    },
});

export const LangMap: Record<Lang, any> = {
    zh: zhCn,
    en: en,
};

export const langList = [
    { label: "简体中文", value: "zh-CN" },
    { label: "English", value: "en" },
];

export default i18n;