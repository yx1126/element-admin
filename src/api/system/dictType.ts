import type { PageInfo } from "#/axios";
import type { DictType, DictData } from "#/system";
import http from "@/utils/http";

export function dictList() {
    return http.get<DictType[]>("/system/dict");
}

export function dictAllList(dictType: string) {
    return http.get<DictData[]>("/system/dict/data/" + dictType);
}

export function dictCreate(data: DictType) {
    return http.post("/system/dict", data);
}

export function dictUpdate(data: DictType) {
    return http.put("/system/dict", data);
}

export function dictDelete(ids: number[]) {
    return http.delete("/system/dict", ids);
}

export function dictDataList<T extends object>(params: T) {
    return http.get<PageInfo<DictData[]>>("/system/dict/data", params);
}

export function dictDataCreate(data: DictData) {
    return http.post("/system/dict/data", data);
}

export function dictDataUpdate(data: DictData) {
    return http.put("/system/dict/data", data);
}

export function dictDataDelete(ids: number[]) {
    return http.delete("/system/dict/data", ids);
}