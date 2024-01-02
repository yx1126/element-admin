import type { MenuType } from "@/router";

export interface MenuItem {
    id: string;
    parentId: string | null;
    type: MenuType;
    path: string;
    name: string;
    icom?: string;
    keepAlive: boolean;
    permission: string;
    sort: number | null;
    visible: boolean;
}