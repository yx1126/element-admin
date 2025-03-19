import { createRouter, type RouteLocationNormalizedGeneric } from "vue-router";
import { createWebHistory } from "vue-router";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import { formatMenuTitle } from "@/utils/route";
import { staticRoutes } from "./staticRoutes";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...staticRoutes,
    ],
});

function getTitle(to: RouteLocationNormalizedGeneric) {
    const current = to.matched.at(-1) as any;
    const before = [...to.matched.slice(0, -1)];
    before.push({
        ...current,
        meta: {
            ...current?.meta,
            title: formatMenuTitle(to.query.tagName, to?.meta.title) || to?.meta.title,
        },
    });
    return before.map(r => r.meta.title).filter(v => v).reverse().join("-");
}

router.beforeEach(async (to, _, next) => {
    try {
        Nprogress.start();
        const title = useTitle("", `%s-${import.meta.env.VITE_APP_TITLE}`);
        title.value = getTitle(to);
        const route = useUserStore();
        if(route.routerList.length > 0) {
            next();
        } else {
            await route.initRoutes();
            next({ path: to.fullPath, query: to.query, replace: true });
        }
    } catch (error) {
        console.error(error);
    }
});

router.afterEach(() => {
    Nprogress.done();
});

router.onError(error => {
    console.error("路由错误", error);
});

export default router;