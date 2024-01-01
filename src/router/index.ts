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

export default router;
