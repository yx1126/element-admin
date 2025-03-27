import type { MenuType } from "@/enums/menu";

export interface RouteMeta {
    readonly title: string;
    readonly icon?: string;
    readonly keepAlive?: boolean;
    readonly isIframe?: boolean;
    readonly link?: string;
}

export interface MenuItem extends Writable<RouteMeta> {
    id: string;
    parentId?: Nullable<string>;
    name: string;
    type: MenuType;
    path: string;
    component?: Nullable<string>;
    permission?: Nullable<string>;
    sort: Nullable<number>;
    visible?: Nullable<boolean>;
    children: MenuItem[];
}