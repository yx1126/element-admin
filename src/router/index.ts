import { createRouter, createWebHistory } from "vue-router";
import { ParentLayout } from "./layout";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: "/", redirect: "/dashboard/workbench" },
        {
            path: "/dashboard",
            name: "Dashboard",
            // redirect: "",
            component: ParentLayout("Dashboard"),
            meta: {
                title: "Dashboard",
            },
            children: [
                {
                    path: "workbench",
                    name: "Workbench",
                    component: () => import("@/views/dashboard/workbench/index.vue"),
                    meta: {
                        title: "工作台",
                    },
                },
            ],
        },
    ],
});

export enum MenuType {
    BUTTON = 0,
    MENU = 1,
    FOLDER = 2,
}

router.beforeEach((to, from, next) => {
    const title = useTitle("", `%s-${import.meta.env.VITE_APP_TITLE}`);
    title.value = to.matched.map(r => r.meta.title).filter(v => v).reverse().join("-");
    next();
});

router.afterEach(() => {
    
});

router.onError(error => {
    console.error("路由错误", error);
});


export default router;
