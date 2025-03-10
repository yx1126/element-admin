import { acceptHMRUpdate, defineStore } from "pinia";
import { getMenus } from "@/layout/menu";
import type { RouteRecordRaw } from "vue-router";
import router from "@/router";
import { ayncStaticaRoutes } from "@/router/staticRoutes";
import { parseRoute, getRedirectPath } from "@/utils/route";

interface UserState {
    routerList: RouteRecordRaw[];
    userInfo?: {
        username: string;
        nickName: string;
        sex: number;
        avatar: string;
    };
}

export const useUserStore = defineStore("user", () => {
    const state: UserState = reactive({
        routerList: [],
        userInfo: {
            username: "admin",
            nickName: "admin",
            sex: 1,
            avatar: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
        },
    });

    async function initRoutes() {
        const menuList = await getMenus();
        const asyncRoutes = parseRoute(menuList);
        const routes: RouteRecordRaw[] = [{ path: "/", redirect: getRedirectPath(asyncRoutes) }, ...asyncRoutes, ...ayncStaticaRoutes];
        state.routerList.push(...asyncRoutes);
        // router.addRoute({ path: "/", redirect: getRedirectPath(asyncRoutes) });
        routes.forEach(route => {
            router.addRoute("LayoutMain", route);
        });
    }

    return {
        ...toRefs(state),
        initRoutes,
    };
});

if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSetStore, import.meta.hot));
}