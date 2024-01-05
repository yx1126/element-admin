import type { RouteRecordRaw } from "vue-router";
import { ParentLayout } from "./layout";

export const staticRoutes: RouteRecordRaw[] = [
    {
        path: "/error",
        name: "Error",
        component: ParentLayout("Error"),
        meta: {
            title: "异常页面",
        },
        children: [
            {
                path: "404",
                name: "404",
                component: () => import("@/views/error/404.vue"),
                meta: {
                    title: "404",
                },
            },
            {
                path: "401",
                name: "401",
                component: () => import("@/views/error/401.vue"),
                meta: {
                    title: "401",
                },
            },
        ],
    },
    { path: "/:path(.*)", redirect: "/error/404" },
];