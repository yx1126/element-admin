import type { Lang } from "#/stores";

function setHtmlLang(value: Lang) {
    document.documentElement.setAttribute("lang", value);
}

interface LocalesOptions {
    immediate?: boolean;
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