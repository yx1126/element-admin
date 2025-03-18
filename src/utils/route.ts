import { ParentLayout } from "@/router/layout";
import type { LocationQueryValue, RouteRecordRaw } from "vue-router";
import type { MenuItem } from "#/menu";
import { isArray, isLink } from "./validata";

/**
 * 自动导入所有目录下index.vue,index.tsx
 */
const pages = import.meta.glob([
    "@/views/**/*.{vue,tsx}",
    // 排除 component/components 文件夹
    "!@/views/**/component(s)?/**/*.{vue,tsx}",
]);

const PAGE_SUFFIX = [".vue", ".tsx", "/index.vue", "/index.tsx"];

function parsePath(data: MenuItem[]) {
    return data.reduce((pre, { path }) => {
        if(isLink(path)) path = encodeURIComponent(path);
        if(path.startsWith("/")) {
            return pre + path;
        }
        return pre + "/" + path;
    }, "");
}

function parseComponent(menu: MenuItem): RouteRecordRaw["component"] {
    if(isLink(menu.path)) {
        return pages["/src/views/iframe/index.vue"];
    }
    if(menu.type === MenuType.FOLDER) {
        return ParentLayout(menu.name);
    }
    if(menu.type === MenuType.MENU) {
        if(!menu.component) return;
        const compPath = ("/src/views/" + menu.component).replace(/\/\//g, "/");
        for(let i = 0; i < PAGE_SUFFIX.length; i++) {
            const vuePath = compPath + PAGE_SUFFIX[i];
            if(Object.hasOwn(pages, vuePath)) {
                return pages[vuePath];
            }
        }
    }
}

export function parseRoute(data: MenuItem[], parents: MenuItem[] = []): RouteRecordRaw[] {
    return data.map(menu => {
        const route: RouteRecordRaw = {
            path: parsePath([...parents, menu]),
            name: menu.name,
            meta: {
                title: menu.title,
                icon: menu.icon,
                keepAlive: !!menu.keepAlive,
                isIframe: !!menu.isIframe,
            },
            component: parseComponent(menu),
            children: parseRoute(menu.children, [...parents, menu]),
        };
        return route;
    });
}

export function formatMenuTitle(title: LocationQueryValue | LocationQueryValue[], template?: string) {
    const custom = isArray<LocationQueryValue[]>(title) ? title : [title];
    return template?.replace(/\{(\d+)\}/g, (_, i) => {
        return custom[i] || "";
    });
}

export function formatMenuList(data?: MenuItem[], parents: MenuItem[] = []) {
    return (data || []).reduce<MenuItem[]>((pre, menu) => {
        if(menu.visible) {
            pre.push({
                ...menu,
                path: parsePath([...parents, menu]),
                children: formatMenuList(menu.children, [...parents, menu]),
            });
        }
        return pre;
    }, []);
}

export function parseIcon(data?: MenuItem[], parent?: Nullable<MenuItem>): MenuItem[] {
    return (data || []).map(v => ({
        ...v,
        icon: v?.icon || parent?.icon,
        children: parseIcon(v.children, v),
    }));
}

export function getRedirectPath(data: RouteRecordRaw[] | MenuItem[]) {
    let path = "";
    while(data.length > 0) {
        path = data[0].path;
        data = data[0].children || [];
    }
    return path;
}