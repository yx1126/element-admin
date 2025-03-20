import type { RouteMeta } from "vue-router";
import type { MenuItem } from "./menu";

export type NavTheme = "light" | "inverted" | "dark";

export type LayoutMode = "aside" | "top" | "mixin" | "asideMixin";

export type RouterTrans = "fade" | "scale" | "scale-slide" | "null";

export type SetPlacement = "default" | "header" | "drawer";

export type Lang = "zh" | "en";

export interface SetState {
    isShowDrawer: boolean;
    themeColor: string;
    navMode: NavTheme;
    layoutMode: LayoutMode;
    isShowLogo: boolean;
    isShowTabs: boolean;
    isShowTabsIcon: boolean;
    uniqueMenuOpened: boolean;
    isShowBreadcrumb: boolean;
    isShowBreadIcon: true;
    isKeepHeader: boolean;
    isKeepTags: boolean;
    isCutMenu: boolean;
    routerTrans: RouterTrans;
    lang: Lang;
    collapsed: boolean;
    inverted: boolean;
    setPlacement: SetPlacement;
    isMenuFixed: boolean;
    isShowWatermark: boolean;
    isMainFull: boolean;
}

export interface TagItem {
    closable?: boolean;
    title: string;
    name: string;
    path: string;
    matchedName?: string[];
    query: Record<string, any>;
    meta: RouteMeta;
    type: "keepTags" | "activeTags";
}

export interface TagsState {
    keepTags: TagItem[];
    activeTags: TagItem[];
    oldRoute: string;
}

export interface UserState {
    routerList: MenuItem[];
    userInfo?: {
        username: string;
        nickName: string;
        sex: number;
        avatar: string;
    };
}