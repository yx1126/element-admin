import type { Lang } from "#/stores";
import { useI18n } from "vue-i18n";

function setHtmlLang(value: Lang) {
    document.documentElement.setAttribute("lang", value);
}

interface LocalesOptions {
    immediate?: boolean;
}

export type I18nBack = ReturnType<typeof useI18n>;

interface LocalBack extends I18nBack {
    $t: I18nBack["t"];
    ti: I18nBack["t"];
    ts: I18nBack["t"];
    tv: I18nBack["t"];
    tp: I18nBack["t"];
    $ti: I18nBack["t"];
    $ts: I18nBack["t"];
    $tv: I18nBack["t"];
    $tp: I18nBack["t"];
}

export function useLocal(...args: Parameters<typeof useI18n>): LocalBack {
    const i18n = useI18n(...args);
    const { t } = useI18n({ useScope: "global" });

    // input placeholder t
    function ti(...args: Parameters<I18nBack["t"]>) {
        return t("input", [i18n.t(...args)]);
    }
    function $ti(...args: Parameters<I18nBack["t"]>) {
        return t("input", [t(...args)]);
    }

    // select placeholder t
    function ts(...args: Parameters<I18nBack["t"]>) {
        return t("select", [i18n.t(...args)]);
    }
    function $ts(...args: Parameters<I18nBack["t"]>) {
        return t("select", [t(...args)]);
    }

    // form rules validator t
    function tv(...args: Parameters<I18nBack["t"]>) {
        return t("valid.not-null", [i18n.t(...args)]);
    }
    function $tv(...args: Parameters<I18nBack["t"]>) {
        return t("valid.not-null", [t(...args)]);
    }

    return {
        ...i18n as any,
        $t: t,
        ti,
        ts,
        tv,
        $ti,
        $ts,
        $tv,
    };
}

export function useLocales(options?: LocalesOptions) {
    const set = useSetStore();

    const { locale } = useI18n({
        useScope: "global",
    });

    const lang = computed<Lang>({
        get() {
            return set.lang;
        },
        set: setLang,
    });

    onBeforeMount(() => {
        if(options?.immediate) {
            setLang(lang.value);
        }
    });

    function setLang(value: Lang) {
        set.setState("lang", value);
        setHtmlLang(value);
        locale.value = value;
    }

    return {
        lang,
        setLang,
    };
}