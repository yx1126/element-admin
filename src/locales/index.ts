import { createI18n } from "vue-i18n";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
import type { Lang } from "#/stores";
import type { SelectOption } from "#/element";

const i18n = createI18n({
    fallbackLocale: "zh",
    messages: {},
});

export const LangMap: Record<Lang, any> = {
    zh: zhCn,
    en: en,
};

export const langList: SelectOption[] = [
    { label: "简体中文", value: "zh-CN" },
    { label: "English", value: "enUS" },
];

export default i18n;