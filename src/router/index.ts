import { createRouter, createWebHistory } from "vue-router";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        
    ],
});

export enum MenuType {
    FOLDER = 0, // 目录
    MENU = 1,   // 菜单
    BUTTON = 2, // 按钮
}

router.beforeEach(async (to, from, next) => {
    Nprogress.start();
    const title = useTitle("", `%s-${import.meta.env.VITE_APP_TITLE}`);
    title.value = to.matched.map(r => r.meta.title).filter(v => v).reverse().join("-");
    const route = useRouteStore();
    if(route.routerList.length > 0) {
        next();
    } else {
        await route.initRoutes();
        next(to);
    }
});

router.afterEach(() => {
    Nprogress.done();
});

router.onError(error => {
    console.error("路由错误", error);
});


export default router;
