import { createI18n } from "vue-i18n";
// @ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
// @ts-ignore
import en from "element-plus/dist/locale/en.mjs";
import type { Lang } from "#/stores";

const i18n = createI18n({
    fallbackLocale: "zh",
    messages: {},
});

export const LangMap: Record<Lang, any> = {
    "zh": zhCn,
    "en": en,
};

export default i18n;