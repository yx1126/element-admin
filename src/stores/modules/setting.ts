import { acceptHMRUpdate, defineStore } from "pinia";
import { createTheme } from "@/utils/color";
import type { SetState } from "#/stores";

const defaultSetting: SetState = {
    isShowDrawer: false, // 全局设置
    primaryColor: "#409EFF", // 系统主题
    menuColor: "#001428", // 菜单颜色
    navMode: "inverted", // 导航模式
    layoutMode: "aside", // 分栏模式
    isShowLogo: true, // 显示 logo
    isShowTabs: true, // 显示 标签页
    isShowTabsIcon: true, // 显示 标签页图标
    uniqueMenuOpened: true, // 菜单单选
    isShowBreadcrumb: true, // 显示 面包屑
    isShowBreadIcon: true, // 显示 面包屑图标
    isKeepHeader: true, // 固定 顶栏
    isKeepTags: true, // 固定 标签页
    isCutMenu: false, // 切割菜单
    routerTrans: "fade", // 路由动画
    lang: "zh", // 语言
    collapsed: false, // 菜单折叠
    inverted: false, // 反转颜色
    setPlacement: "default", // 设置位置
    isMenuFixed: false, // 是否固定侧边菜单
    isShowWatermark: true, // 是否显示水印
    isMainFull: false, // 是否显示侧边栏和标题
    lastNavMode: undefined, // 记录上次navMode
};

const html = document.documentElement;

export const useSetStore = defineStore("setting", () => {
    const state: SetState = reactive(Object.assign({}, defaultSetting));

    const theme = computed({
        get: () => state.navMode,
        set: v => state.navMode = v,
    });

    const themeColor = computed({
        get: () => state.primaryColor,
        set: value => {
            state.primaryColor = value || "#409EFF";
        },
    });

    const menuBgColor = computed({
        get: () => state.menuColor,
        set: value => {
            state.menuColor = value || "#001428";
        },
    });

    watch(() => state.isKeepHeader, value => {
        if(!value) {
            state.isKeepTags = value;
        }
    }, {
        immediate: true,
    });

    watch(() => state.isKeepTags, value => {
        if(value) {
            state.isKeepHeader = value;
        }
    }, {
        immediate: true,
    });

    watch(() => state.menuColor, value => {
        document.documentElement.style.setProperty("--menu-bg-base-color", value);
    }, {
        immediate: true,
    });

    watch(() => [state.navMode, state.primaryColor], ([mode, color]) => {
        const root = document.documentElement;
        const colorMap = createTheme(color, mode === "dark");
        for(const key in colorMap) {
            root.style.setProperty(key, colorMap[key]);
        }
    }, {
        immediate: true,
    });

    watch(() => state.navMode, (value, oldValue) => {
        if(oldValue) {
            html.classList.remove(oldValue);
        }
        html.classList.add(value);
        if(oldValue && oldValue !== "dark") {
            state.lastNavMode = oldValue;
        }
    }, {
        immediate: true,
    });

    function onNavModeChange() {
        if(state.navMode !== "dark") {
            state.lastNavMode = state.navMode;
            state.navMode = "dark";
        } else {
            if(state.lastNavMode) {
                state.navMode = state.lastNavMode;
            }
            state.lastNavMode = undefined;
        }
    }

    return {
        ...toRefs(state),
        theme,
        themeColor,
        menuBgColor,
        onNavModeChange,
    };
}, {
    persistedstate: {
        enabled: true,
        reset: () => defaultSetting,
    },
});

if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSetStore, import.meta.hot));
}