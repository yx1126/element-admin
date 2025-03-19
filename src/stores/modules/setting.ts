import { acceptHMRUpdate, defineStore } from "pinia";
import { createTheme } from "@/utils/color";
import type { SetState } from "#/stores";

const defaultSetting: SetState = {
    isShowDrawer: false, // 全局设置
    themeColor: "#409EFF", // 系统主题
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
    asideMixinCollapsed: false, // asideMixin 布局 子菜单折叠
    setPlacement: "default", // 设置位置
    isMenuFixed: false, // 是否固定侧边菜单
    isShowWatermark: true, // 是否显示水印
    isMainFull: false, // 是否显示侧边栏和标题
};

export const useSetStore = defineStore("setting", () => {
    const state: SetState = reactive(Object.assign({}, defaultSetting));

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

    watch(() => [state.navMode, state.themeColor], ([mode, color]) => {
        const root = document.documentElement;
        const colorMap = createTheme(color, mode === "dark");
        for(const key in colorMap) {
            root.style.setProperty(key, colorMap[key]);
        }
    }, {
        immediate: true,
    });

    return {
        ...toRefs(state),
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