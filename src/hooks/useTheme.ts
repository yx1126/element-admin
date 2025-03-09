export function useTheme() {
    const set = useSetStore();

    const html = document.documentElement;

    const theme = computed({
        get: () => set.navMode,
        set: v => set.setState("navMode", v),
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
    };
}