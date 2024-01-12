import type { MenuType } from "@/enum/menu";

export interface RouteMeta {
    readonly title: string;
    readonly icon?: string;
    readonly keepAlive: boolean;
}

export interface MenuItem extends RouteMeta {
    id: string;
    parentId?: Nullable<string>;
    type: MenuType;
    path: string;
    component?: string;
    permission?: Nullable<string>;
    sort: Nullable<number>;
    visible: boolean;
    children: MenuItem[];
}