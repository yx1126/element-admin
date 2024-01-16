import { defineStore } from "pinia";
import { getMenus } from "@/layout/menu";
import type { RouteRecordRaw } from "vue-router";
import router from "@/router";
import { ayncStaticaRoutes } from "@/router/staticRoutes";
import { parseRoute, getRedirectPath } from "@/utils/route";



interface RouteState {
    routerList: RouteRecordRaw[];
}

export const useRouteStore = defineStore("route", () => {

    const state: RouteState = reactive({
        routerList: [],
    });

    async function initRoutes() {
        const menuList = await getMenus();
        const asyncRoutes = parseRoute(menuList);
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