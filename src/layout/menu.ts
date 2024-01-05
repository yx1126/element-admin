import type { MenuItem } from "#/menu";

export const menuList: MenuItem[] = [
    {
        id: "1",
        type: 0,
        path: "/dashboard",
        title: "首页",
        keepAlive: false,
        visible: false,
        sort: 1,
        children: [
            {
                id: "1-1",
                type: 1,
                path: "/console",
                title: "主控台",
                sort: 1,
                children: [],
                keepAlive: false,
                visible: false,
                component: "/dashboard/console",
            },
            {
                id: "1-2",
                type: 1,
                path: "/workbench",
                title: "工作台",
                keepAlive: false,
                visible: false,
                sort: 2,
                children: [],
                component: "/dashboard/workbench",
            },
        ],
    },
];

export function getMenus() {
    return new Promise<MenuItem[]>((resolve) => {
        resolve(menuList);
    });
}