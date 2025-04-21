import type { MenuType } from "@/enums/menu";

export interface RouteMeta {
    readonly title: string;
    readonly icon?: string;
    readonly isCache?: "0" | "1";
    readonly isIframe?: "0" | "1";
    readonly link?: string;
}

export interface MenuItem extends Writable<RouteMeta>, TableModels {
    id: number;
    parentId?: number;
    name: string;
    type: MenuType;
    path: string;
    component?: string;
    permission?: string;
    sort: number;
    visible?: "0" | "1";
    status?: "0" | "1";
    children: MenuItem[];
}