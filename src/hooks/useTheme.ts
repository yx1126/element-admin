import {} from "@/stores/modules/setting";

export function useTheme() {
    const set = useSetStore();

    const html = document.documentElement;

    const theme = computed({
        get: () => set.navMode,
        set: v => set.setState("navMode", v),
    });

    const themeColor = computed({
        get: () => set.themeColor,
        set: value => {
            set.setState("themeColor", value || "#409EFF");
        },
    });

    watch(() => set.navMode, (value, oldValue) => {
        if(oldValue) {
            html.classList.remove(oldValue);
        }
        html.classList.add(value);
    }, {
        immediate: true,
    });

    return {
        theme,
        themeColor,
    };
}