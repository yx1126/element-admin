import type { MenuType } from "@/enums/menu";
import type { NumFlag } from "./views";

export interface RouteMeta {
    readonly title: string;
    readonly icon?: string;
    readonly isCache?: NumFlag;
    readonly isIframe?: NumFlag;
    readonly link?: string;
}

export interface MenuItem extends Writable<RouteMeta>, TableModels {
    parentId?: number;
    name: string;
    type: MenuType;
    path: string;
    component?: string;
    permission?: string;
    sort: number;
    visible?: NumFlag;
    status?: NumFlag;
    children: MenuItem[];
}

export interface DictType extends TableModels {
    name: string;
    type: string;
    status: NumFlag;
    nodeType: NumFlag;
    remark: string;
}

export interface DictData extends TableModels, Pick<DictType, "nodeType"> {
    dictId: number;
    sort: number;
    label: string;
    value: string;
    type: string;
    cssClass: string;
    listClass: string;
    isDefault: NumFlag;
    status: NumFlag;
    remark: string;
    dictType: DictType["type"];
}

export interface DictLabelProps {
    options?: (Partial<DictData> & Record<string, any>)[];
    type?: string;
    labelKey?: string;
    valueKey?: string;
}

export interface UserInfo extends TableModels {
    deptId: number;
    postIds: number[];
    userName: string;
    nickName: string;
    userType: string;
    email: string;
    phone: string;
    sex: NumFlag | "2";
    avatar: string;
    password: string;
    loginIp?: string;
    loginDate?: string;
    status: NumFlag;
    remark: string;
}

export interface Dept extends TableModels {
    parentId: number;
    name: string;
    sort: number;
    leaderId?: number;
    leaderName?: string;
    phone?: string;
    email?: string;
    status: NumFlag;
    children: Dept[];
}

export interface Post extends TableModels {
    code: string;
    name: string;
    sort: number;
    status: NumFlag;
    remark: string;
}

export interface Role extends TableModels {
    name: string;
    key: string;
    sort: number;
    status: NumFlag;
    remark: string;
    menuIds: number[];
}