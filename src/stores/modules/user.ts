import { acceptHMRUpdate, defineStore } from "pinia";
import router from "@/router";
import { getMenus } from "@/layout/menu";
import { parseRoute, getRedirectPath, formatMenuList } from "@/utils/route";
import { getUserInfo } from "@/api/login";
import { getAvatar } from "@/api/upload";
import type { RouteRecordRaw } from "vue-router";
import type { UserState } from "#/stores";

const getDefaultState = (): UserState => ({
    routerList: [],
    redirectName: "",
    token: "",
    userInfo: undefined,
});

export const useUserStore = defineStore("user", () => {
    const state: UserState = reactive(getDefaultState());

    async function initRoutes() {
        const menuList = await getMenus();
        const asyncRoutes = parseRoute(menuList);
        const routes: RouteRecordRaw[] = [
            { path: "/", redirect: getRedirectPath(asyncRoutes) },
            ...asyncRoutes,
        ];
        state.routerList.push(...formatMenuList(menuList));
        routes.forEach(route => {
            router.addRoute("LayoutMain", route);
        });
    }

    async function initUserInfo() {
        const res = await getUserInfo();
        state.userInfo = {
            ...res.data,
            avatar: res.data.avatar || "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
        };
    }

    function getUserAvatar() {
        return getAvatar(state.userInfo?.avatar);
    }

    return {
        ...toRefs(state),
        getUserAvatar,
        initRoutes,
        initUserInfo,
    };
}, {
    persistedstate: {
        enabled: true,
        paths: ["token"],
        reset: () => {
            useTagStore().$reset();
            return getDefaultState();
        },
    },
});

if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}