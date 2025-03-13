import { createI18n } from "vue-i18n";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
import localZh from "./langs/zh.json";
import localEn from "./langs/en.json";
import type { Lang } from "#/stores";

const i18n = createI18n({
    fallbackLocale: "zh",
    legacy: false,
    messages: {
        zh: localZh,
        en: localEn,
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
    { label: "简体中文", value: "zh" },
    { label: "English", value: "en" },
];

export default i18n;