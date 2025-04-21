import type { DictType } from "#/dict";
import http from "@/utils/http";

export function dictTypeList<T extends object>(params?: T) {
    return http.get<DictType[]>("/system/dictType", params);
}

export function dictTypeCreate(data: DictType) {
    return http.post("/system/dictType", data);
}

export function dictTypeUpdate(data: DictType) {
    return http.put("/system/dictType", data);
}

export function dictTypeDelete(ids: number[]) {
    return http.delete("/system/dictType", ids);
}