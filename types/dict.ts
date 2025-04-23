export interface DictType extends TableModels {
    id: number;
    name: string;
    type: string;
    status: "0" | "1";
    nodeType: "0" | "1";
    remark: string;
}

export interface DictData extends TableModels {
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
}