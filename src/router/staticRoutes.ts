import type { RouteRecordRaw } from "vue-router";

export const staticRoutes: RouteRecordRaw[] = [
    {
        path: "/login",
        name: "Login",
        meta: {
            title: "登录",
            isCache: "0",
        },
        component: () => import("@/views/login/index.vue"),
    },
    {
        path: "/",
        name: "LayoutMain",
        meta: {
            title: "",
            isCache: "1",
        },
        component: () => import("@/layout/index.vue"),
        // 扁平化
        children: [{
            path: "/person",
            name: "Person",
            component: () => import("@/views/person/index.vue"),
            meta: {
                title: "个人中心",
                isCache: "0",
            },
            children: [],
        }, {
            path: "/iframe/:link",
            name: "Iframe",
            component: () => import("@/views/iframe/index.vue"),
            meta: {
                title: "{0|iframe}",
                isCache: "0",
            },
            children: [],
        }, {
            path: "/redirect/:path*",
            name: "Redirect",
            component: () => import("@/views/redirect/index.vue"),
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