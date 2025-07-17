import { acceptHMRUpdate, defineStore } from "pinia";
import router from "@/router";
import { parseRoute, getRedirectPath, formatMenuList } from "@/utils/route";
import { getUserInfo, getUserPermission } from "@/api/login";
import { getAvatar } from "@/api/upload";
import type { RouteRecordRaw } from "vue-router";
import type { UserState } from "#/stores";

const getDefaultState = (): UserState => ({
    routerList: [],
    redirectName: "",
    token: "",
    userInfo: undefined,
    permission: [],
});

export const useUserStore = defineStore("user", () => {
    const state: UserState = reactive(getDefaultState());

    async function initRoutes() {
        const res = await getUserPermission();
        state.permission = res.data.permission;
        const asyncRoutes = parseRoute(res.data.menus);
        const routes: RouteRecordRaw[] = [
            { path: "/", redirect: getRedirectPath(asyncRoutes) },
            ...asyncRoutes,
        ];
        state.routerList.push(...formatMenuList(res.data.menus));
        routes.forEach(route => {
            router.addRoute("LayoutMain", route);
        });
    }

    async function initUserInfo() {
        const res = await getUserInfo();
        state.userInfo = {
            ...res.data,
        };
    }

    function getUserAvatar() {
        if(!state.userInfo?.avatar) {
            return "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg";
        }
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