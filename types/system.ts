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

export interface DictType extends TableModels {
    id: number;
    name: string;
    type: string;
    status: "0" | "1";
    nodeType: "0" | "1";
    remark: string;
}

export interface DictData extends TableModels, Pick<DictType, "nodeType"> {
    id: number;
    dictId: number;
    sort: number;
    label: string;
    value: string;
    type: string;
    cssClass: string;
    listClass: string;
    isDefault: "0" | "1";
    status: "0" | "1";
    remark: string;
    dictType: DictType["type"];
}
