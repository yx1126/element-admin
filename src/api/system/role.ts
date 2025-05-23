import http from "@/utils/http";
import type { PageInfo } from "#/axios";
import type { Role } from "#/system";

export function getRoleList<T extends object>(params?: T) {
    return http.get<PageInfo<Role[]>>("/system/role", params);
}

export function getRoleAppList<T extends object>(params?: T) {
    return http.get<Role[]>("/system/role/all", params);
}

export function getRoleInfo(id: string) {
    return http.get<Role>("/system/role/" + id);
}

export function roleCreate(data: Role) {
    return http.post("/system/role", data);
}

export function roleUpdate(data: Role) {
    return http.put("/system/role", data);
}

export function roleDelete(ids: string[]) {
    return http.delete("/system/role", ids);
}