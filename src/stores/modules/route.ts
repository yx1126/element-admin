import { defineStore } from "pinia";
import { getMenus } from "@/layout/menu";
import type { MenuItem } from "#/menu";
import type { RouteRecordRaw } from "vue-router";
import { ParentLayout } from "@/router/layout";
import { MenuType } from "@/router";
import router from "@/router";
import { staticRoutes } from "@/router/staticRoutes";

function formatPath(data: MenuItem[]) {
    return data.reduce((pre, { path }) => {
        if(path.startsWith("/")) {
            return pre + path;
        }
        return pre + "/" + path;
    }, "");
}

function formateComp(pages: Record<string, any>, menu: MenuItem): RouteRecordRaw["component"] {
    if(menu.type === MenuType.FOLDER) {
        return ParentLayout("realPath");
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

function formatRoute(data: MenuItem[], pages: Record<string, any>, parents: MenuItem[]): RouteRecordRaw[] {
    return data.map(menu => {
        const realPath = formatPath([...parents, menu]);
        const result: RouteRecordRaw = {
            path: realPath,
            name: realPath,
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

interface RouteState {
    routerList: RouteRecordRaw[];
}

export const useRouteStore = defineStore("route", () => {

    const state: RouteState = reactive({
        routerList: [],
    });

    async function initRoutes() {
        const pages: Record<string, () => Promise<any>> = import.meta.glob("@/views/**/*.{vue,tsx}");
        const menuList = await getMenus();
        const asyncRoutes = [...formatRoute(menuList, pages, []), ...staticRoutes];
        state.routerList.push(...asyncRoutes);
        asyncRoutes.forEach(route => {
            router.addRoute(route);
        });
    }

    return {
        ...toRefs(state),
        initRoutes,
    };
});