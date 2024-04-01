import { acceptHMRUpdate, defineStore } from "pinia";
import type { SetState } from "#/stores";

const defaultSetting: SetState = {
    isShowDrawer: false, // 全局设置
    themeColor: "#409EFF", // 系统主题
    navMode: "dark", // 导航模式
    layoutMode: "aside",
    isShowLogo: true, // 显示 logo
    isShowTabs: true, // 显示 标签页
    uniqueMenuOpened: true, // 菜单单选
    isShowBreadcrumb: true, // 显示 面包屑
    isKeepHeader: true, // 固定 顶栏
    isKeepTags: true, // 固定 标签页
    isCutMenu: false, // 切割菜单
    routerTrans: "fade", // 路由动画
    lang: "zh", // 语言
    collapsed: false, // 菜单折叠
    asideMixinCollapsed: false, // asideMixin 布局 子菜单折叠
};

export const useSetStore = defineStore("setting", () => {

    const state: SetState = reactive(Object.assign({}, defaultSetting));

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