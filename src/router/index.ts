import { createRouter } from "vue-router";
import { createWebHistory } from "vue-router";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import { staticRoutes } from "./staticRoutes";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...staticRoutes,
    ],
});

router.beforeEach(async (to, from, next) => {
    try {
        Nprogress.start();
        const title = useTitle("", `%s-${import.meta.env.VITE_APP_TITLE}`);
        title.value = to.matched.map(r => r.meta.title).filter(v => v).reverse().join("-");
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