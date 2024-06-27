import { ParentLayout } from "@/router/layout";
import type { RouteRecordRaw } from "vue-router";
import type { MenuItem } from "#/menu";
import { isLink } from "./validata";

const pages = import.meta.glob("@/views/**/*.{vue,tsx}");

const PAGE_SUFFIX = [".vue", ".tsx", "/index.vue", "/index.tsx"];

function parsePath(data: MenuItem[]) {
    return data.reduce((pre, { path }) => {
        if(path.startsWith("/")) {
            return pre + path;
        }
        return pre + "/" + path;
    }, "");
}

function parseComponent(menu: MenuItem): RouteRecordRaw["component"] {
    if(menu.type === MenuType.FOLDER) {
        return ParentLayout(menu.name);
    } else if(menu.type === MenuType.MENU) {
        if(!menu.component) return;
        const compPath = ("/src/views/" + menu.component).replace(/\/\//g, "\/");
        for(let i = 0; i < PAGE_SUFFIX.length; i++) {
            const vuePath = compPath + PAGE_SUFFIX[i];
            if(Object.hasOwn(pages, vuePath)) {
                return pages[vuePath];
            }
        }
    }
}

export function parseRoute(data: MenuItem[], parents: MenuItem[] = []): RouteRecordRaw[] {
    return data.map(menu => {
        const result: RouteRecordRaw = {
            path: isLink(menu.path) ? menu.path : parsePath([...parents, menu]),
            name: menu.name,
            meta: {
                title: menu.title,
                icon: menu.icon,
                keepAlive: menu.keepAlive,
            },
            component: parseComponent(menu),
            children: parseRoute(menu.children, [...parents, menu]),
        };
        return result;
    });
}

export function getRedirectPath(data: RouteRecordRaw[] | MenuItem[]) {
    let path = "";
    while(data.length > 0) {
        path = data[0].path;
        data = data[0].children || [];
    }
    return path;
}