import { defineStore } from "pinia";
import { getMenus } from "@/layout/menu";
import type { MenuItem } from "#/menu";
import type { RouteRecordRaw } from "vue-router";
import { ParentLayout } from "@/router/layout";
import router from "@/router";
import { ayncStaticaRoutes } from "@/router/staticRoutes";

function formatPath(data: MenuItem[]) {
    return data.reduce((pre, { path }) => {
        if(path.startsWith("/")) {
            return pre + path;
        }
        return pre + "/" + path;
    }, "");
}

/**
 * 获取页面名称
 * @param {String} path menu path
 */
export function getMenuRouteName(path: string) {
    const names = path.toLowerCase().split(/\_|\/|\-/).filter(v => v);
    return names.map(v => v.substring(0, 1).toUpperCase() + v.substring(1)).join("");
}

function formateComp(pages: Record<string, any>, menu: MenuItem): RouteRecordRaw["component"] {
    if(menu.type === MenuType.FOLDER) {
        return ParentLayout(getMenuRouteName(menu.path));
    } else if(menu.type === MenuType.MENU) {
        if(!menu.component) return;
        const compPath = ("/src/views/" + menu.component).replace(/\/\//g, "\/");
        const defPath = compPath + ".vue";
        if(Object.hasOwn(pages, defPath)) {
            return pages[defPath];
        }
        const indexPath = compPath + "/index.vue";
        if(Object.hasOwn(pages, indexPath)) {
            return pages[indexPath];
        }
    }
}

function formatRoute(data: MenuItem[], pages: Record<string, any>, parents: MenuItem[] = []): RouteRecordRaw[] {
    return data.map(menu => {
        const realPath = formatPath([...parents, menu]);
        const result: RouteRecordRaw = {
            path: realPath,
            name: getMenuRouteName(menu.path),
            meta: {
                title: menu.title,
                icon: menu.icon,
                keepAlive: menu.keepAlive,
            },
            component: formateComp(pages, menu),
            children: formatRoute(menu.children, pages, [...parents, menu]),
        };
        return result;
    });
}

export function getRedirectPath(data: RouteRecordRaw[] | MenuItem[]) {
    let path: string = "";
    while(data.length > 0) {
        path = data[0].path;
        data = data[0].children || [];
    }
    return path;
}

interface RouteState {
    routerList: RouteRecordRaw[];
}

export const useRouteStore = defineStore("route", () => {

    const state: RouteState = reactive({
        routerList: [],
    });

    async function initRoutes() {
        const pages = import.meta.glob("@/views/**/*.{vue,tsx}");
        const menuList = await getMenus();
        const asyncRoutes = formatRoute(menuList, pages);
        const routes: RouteRecordRaw[] = [{ path: "/", redirect: getRedirectPath(asyncRoutes) }, ...asyncRoutes, ...ayncStaticaRoutes];
        state.routerList.push(...asyncRoutes);
        routes.forEach(route => {
            router.addRoute(route);
        });
    }

    return {
        ...toRefs(state),
        initRoutes,
    };
});