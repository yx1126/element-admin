import { acceptHMRUpdate, defineStore } from "pinia";
import type { TagsState, TagItem } from "#/stores";

const defaultTags: TagItem[] = [
    { title: "主控台", name: "Console", closable: false, path: "/dashboard/console", query: {}, meta: {}, type: "keepTags" },
];

type TagsType = TagItem["type"];

export const useTagStore = defineStore("tags", () => {
    const state: TagsState = reactive({
        keepTags: [...defaultTags],
        activeTags: [],
        oldRoute: "",
    });

    const tagList = computed(() => [...state.keepTags, ...state.activeTags]);

    function insert(type: TagsType, value: TagItem) {
        if(!value.path || !value.title || !value.name || value.path.startsWith("/dashboard/console")) return;
        const tag = [...state.keepTags, ...state.activeTags].find(t => t.path === value.path);
        if(tag) return;
        state[type].push(value);
    }

    // base 移除
    function baseRemove(type: TagsType, path: string, direction: "this" | "left" | "right" | "other" | "all" = "this") {
        const index = state[type].findIndex(t => t.path === path);
        if(index === -1 && ["this", "left", "right"].includes(direction)) return;
        switch(direction) {
        case "this":
            state[type].splice(index, 1);
            break;
        case "left":
            state[type].splice(0, index);
            break;
        case "right":
            state[type].splice(index + 1, state[type].length);
            break;
        case "other":
            state[type] = [state[type].find(t => t.path === path)!];
            break;
        case "all":
            state[type] = [];
            break;
        default:
            break;
        }
    }
    // 移除
    function remove(path: string) {
        baseRemove("keepTags", path);
        baseRemove("activeTags", path);
    }
    // 移除左边
    function removeLeft(path: string) {
        baseRemove("activeTags", path, "left");
    }
    // 移除右边
    function removeRight(path: string) {
        baseRemove("activeTags", path, "right");
    }
    // 移除 其他
    function removeOther(path: string) {
        baseRemove("activeTags", path, "other");
    }
    // 移除 全部
    function removeAll(path: string) {
        baseRemove("activeTags", path, "all");
    }
    // 保持固定
    function keepFixed(path: string) {
        const tag = state.activeTags.find(t => t.path === path);
        if(!tag) return;
        remove(path);
        insert("keepTags", { ...tag, type: "keepTags", closable: false });
    }
    // 解除固定
    function removeFixed(path: string) {
        const tag = state.keepTags.find(t => t.path === path);
        if(!tag) return;
        remove(path);
        insert("activeTags", { ...tag, type: "activeTags", closable: true });
    }

    return {
        ...toRefs(state),
        tagList,
        insert,
        remove,
        removeLeft,
        removeRight,
        removeOther,
        removeAll,
        keepFixed,
        removeFixed,
    };
}, {
    persistedstate: {
        enabled: true,
        storage: window.sessionStorage,
        reset: () => ({ keepTags: [...defaultTags], activeTags: [] }),
    },
});

if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTagStore, import.meta.hot));
}