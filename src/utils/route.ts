import { isArray, isLink } from "./validata";
import { ParentLayout } from "@/router/layout";
import type { LocationQueryValue, RouteRecordRaw } from "vue-router";
import type { MenuItem } from "#/system";

/**
 * 自动导入所有目录下index.vue,index.tsx
 */
const pages = import.meta.glob([
    "@/views/**/*.{vue,tsx}",
    // 排除 component/components 文件夹
    "!@/views/**/component(s)?/**/*.{vue,tsx}",
]);

const PAGE_SUFFIX = [".vue", ".tsx", "/index.vue", "/index.tsx"];

/**
 * 解析路径
 */
function parsePath(data: MenuItem[]) {
    return data.reduce((pre, { path }) => {
        if(isLink(path)) path = encodeURIComponent(path);
        if(path.startsWith("/")) {
            return pre + path;
        }
        return pre + "/" + path;
    }, "");
}

/**
 * 解析组件
 */
function parseComponent(menu: MenuItem): RouteRecordRaw["component"] {
    // iframe
    if(menu.type === MenuType.LINK) {
        return pages["/src/views/iframe/index.vue"];
    }
    // 目录
    if(menu.type === MenuType.FOLDER) {
        return ParentLayout(menu.name);
    }
    // 菜单
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

/**
 * 格式化路由
 */
export function parseRoute(data: MenuItem[], parents: MenuItem[] = []): RouteRecordRaw[] {
    return data.map(menu => {
        const route: RouteRecordRaw = {
            path: parsePath([...parents, menu]),
            name: menu.name,
            meta: {
                title: menu.title,
                icon: menu.icon,
                isCache: menu.isCache,
                isIframe: menu.isIframe,
                link: menu.link,
            },
            component: parseComponent(menu),
            children: parseRoute(menu.children || [], [...parents, menu]),
        };
        if(route.children.length > 0) {
            route.redirect = route.children.at(0)?.path;
        }
        return route;
    });
}

/**
 * 格式化标题
 * @example
 * ```js
 * const query = ["test", "test1"];
 * const template = "{0}-{1}";
 * formatMenuTitle(query, template);  // "test-test1"
 *
 * const template = "{0}-{1}-{2}";
 * formatMenuTitle(query, template);  // "test-test1-"
 *
 * const template = "{0}-{1}-{2|test2}";
 * formatMenuTitle(query, template);  // "test-test1-test2"
 * ```
 */
export function formatMenuTitle(title: LocationQueryValue | LocationQueryValue[], template?: string) {
    const custom = isArray<LocationQueryValue[]>(title) ? title : [title];
    return template?.replace(/\{(\d+)(\|(.*))?\}/g, (...args) => {
        return custom[args[1]] || args[3] || "";
    });
}

/**
 * 格式化菜单路径
 */
export function formatMenuList(data?: MenuItem[], parents: MenuItem[] = []) {
    return (data || []).reduce<MenuItem[]>((pre, menu) => {
        if(menu.visible === "1") {
            pre.push({
                ...menu,
                path: parsePath([...parents, menu]),
                children: formatMenuList(menu.children, [...parents, menu]),
            });
        }
        return pre;
    }, []);
}

/**
 * 菜单没有图标取上级图标
 */
export function parseIcon(data?: MenuItem[], parent?: Nullable<MenuItem>): MenuItem[] {
    return (data || []).map(v => {
        const icon = v?.icon || parent?.icon;
        return {
            ...v,
            icon,
            children: parseIcon(v.children, { ...v, icon }),
        };
    });
}

export function getRedirectPath(data: RouteRecordRaw[] | MenuItem[]) {
    let path = "";
    while(data.length > 0) {
        path = data[0].path;
        data = data[0].children || [];
    }
    return path;
}