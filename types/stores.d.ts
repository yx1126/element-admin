export type NavTheme = "light" | "dark";

export type LayoutMode = "aside" | "top" | "mixin" | "asideMixin";

export type RouterTrans = "fade" | "scale" | "scale-slide" | "null";

export type Lang = "zh" | "en";

export interface SetState {
    isShowDrawer: boolean;
    themeColor: string;
    navMode: NavTheme;
    layoutMode: LayoutMode;
    isShowLogo: boolean;
    isShowTabs: boolean;
    uniqueMenuOpened: boolean;
    isShowBreadcrumb: boolean;
    isKeepHeader: boolean;
    isKeepTags: boolean;
    isCutMenu: boolean;
    routerTrans: RouterTrans;
    lang: Lang;
    collapsed: boolean;
    asideMixinCollapsed: boolean;
}