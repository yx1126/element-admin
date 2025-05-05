import type { Dept } from "#/system";
import http from "@/utils/http";

export function getDeptTree<T extends object>(params?: T) {
    return http.get<Dept[]>("/system/dept", params);
}

export function getDeptAllList() {
    return http.get<Dept[]>("/system/dept/all");
}

export function getDeptSelectTree() {
    return http.get<Dept[]>("/system/dept/selectTree");
}

export function deptCreate(data: Dept) {
    return http.post("/system/dept", data);
}

export function deptUpdate(data: Dept) {
    return http.put("/system/dept", data);
}

export function deptDelete(ids: number[]) {
    return http.delete("/system/dept", ids);
}