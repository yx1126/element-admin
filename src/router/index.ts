import { createRouter, type RouteLocationNormalizedGeneric } from "vue-router";
import { createWebHashHistory } from "vue-router";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import { formatMenuTitle } from "@/utils/route";
import { staticRoutes } from "./staticRoutes";
import { Configs } from "@/config";

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    strict: true,
    routes: [
        ...staticRoutes,
    ],
});

function getTitle(to: RouteLocationNormalizedGeneric) {
    const current = to.matched?.at(-1);
    const title = formatMenuTitle(to.query[Configs.queryKey], to?.meta.title) || to.meta.title;
    const before = [...(to.matched?.slice(0, -1) || []), { ...current, meta: { ...current?.meta, title } }];
    return before.map(r => r.meta.title).filter(v => v).reverse().join("-");
}

router.beforeEach(async (to, from, next) => {
    Nprogress.start();
    const title = useTitle("", `%s-${import.meta.env.VITE_APP_TITLE}`);
    title.value = getTitle(to);
    const user = useUserStore();
    if(user.token && to.path === "/login") {
        next({ path: from.fullPath, replace: true });
        return;
    }
    if(Configs.whiteList.includes(to.path)) {
        next();
        return;
    }
    if(!user.token) {
        next({ path: "/login", replace: true });
        return;
    }
    try {
        if(user.routerList.length > 0) {
            next();
        } else {
            await user.initRoutes();
            await user.initUserInfo();
            next({ path: to.fullPath, query: to.query, replace: true });
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        user.$reset();
        next({ path: "/login", replace: true });
    }
});

router.afterEach(() => {
    Nprogress.done();
});

router.onError(error => {
    console.error("路由错误", error);
});

export default router;