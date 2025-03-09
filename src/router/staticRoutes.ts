import type { RouteRecordRaw } from "vue-router";

export const staticRoutes: RouteRecordRaw[] = [
    {
        path: "/login",
        name: "Login",
        meta: {
            title: "登录",
            keepAlive: false,
        },
        component: () => import("@/views/login/index.vue"),
    },
    {
        path: "/",
        name: "LayoutMain",
        meta: {
            title: "",
            keepAlive: true,
        },
        component: () => import("@/layout/index.vue"),
        children: [{
            path: "/person",
            name: "Person",
            component: () => import("@/views/person/index.vue"),
            meta: {
                title: "个人中心",
                keepAlive: false,
            },
            children: [],
        }, {
            path: "/:pathMatch(.*)",
            name: "NotFound",
            component: () => import("@/views/error/404.vue"),
            meta: {
                title: "404",
            },
        }],
    },
];

export const ayncStaticaRoutes: RouteRecordRaw[] = [
    // { path: "/:path(.*)", redirect: "/error/404" },
];