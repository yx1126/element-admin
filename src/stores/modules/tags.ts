import { acceptHMRUpdate, defineStore } from "pinia";
import type { TagsState, TagItem } from "#/stores";

const defaultTags: TagItem[] = [
    { title: "主控台", name: "Console", path: "/dashboard/console", query: {}, meta: {} },
];

export const useTagStore = defineStore("tags", () => {
    const state: TagsState = reactive({
        keepTags: [...defaultTags],
        activeTags: [],
    });

    return {
        ...toRefs(state),
    };
}, {
    persistedstate: {
        storage: window.sessionStorage,
        reset: () => ({ keepTags: [...defaultTags], activeTags: [] }),
    },
});

if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTagStore, import.meta.hot));
}