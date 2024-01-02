import type { Lang } from "#/stores";


function setLang(value: Lang) {
    document.documentElement.setAttribute("lang", value);
}

export function useLocales() {
    const set = useSetStore();
    const { locale } = useI18n();

    onBeforeMount(() => {
        setLang(set.lang);
        locale.value = set.lang;
    });

    return computed<Lang>({
        get() {
            return set.lang;
        },
        set(value) {
            set.setState("lang", value);
            setLang(set.lang);
            locale.value = set.lang;
        },
    });
}