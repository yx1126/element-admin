import type { MenuItem } from "#/menu";

export const menuList: MenuItem[] = [
    {
        id: "1",
        type: 0,
        path: "/dashboard",
        name: "Dashboard",
        title: "Dashboard",
        icon: "dashboard",
        keepAlive: false,
        visible: true,
        sort: 1,
        children: [
            {
                id: "1-1",
                type: 1,
                path: "/console",
                name: "Console",
                title: "主控台",
                sort: 1,
                keepAlive: false,
                visible: true,
                component: "/dashboard/console",
                children: [],
            },
            {
                id: "1-2",
                type: 1,
                path: "/workbench",
                name: "Workbench",
                title: "工作台",
                keepAlive: false,
                visible: true,
                sort: 2,
                component: "/dashboard/workbench",
                children: [],
            },
        ],
    },
    {
        id: "2",
        type: 0,
        path: "/error",
        name: "Error",
        title: "异常页面",
        icon: "question",
        keepAlive: false,
        visible: true,
        sort: 2,
        children: [
            {
                id: "2-1",
                type: 1,
                path: "404",
                name: "404",
                title: "404",
                icon: "404",
                keepAlive: false,
                visible: true,
                sort: 2,
                component: "/error/404",
                children: [],
            },
            {
                id: "2-2",
                type: 1,
                path: "401",
                name: "401",
                title: "401",
                keepAlive: false,
                visible: true,
                sort: 2,
                component: "/error/401",
                children: [],
            },
        ],
    },
    {
        id: "3",
        type: 1,
        path: "https://github.com/yx1126",
        name: "Github",
        title: "Github",
        icon: "github",
        sort: 3,
        children: [],
    },
];

export function getMenus() {
    return new Promise<MenuItem[]>((resolve) => {
        resolve(menuList);
    });
}