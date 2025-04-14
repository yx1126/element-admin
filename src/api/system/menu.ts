import type { MenuItem } from "#/menu";
import http from "@/utils/http";

export function menuCreate(data: MenuItem) {
    return http.post("/system/menu", data);
}

export function menuUpdate(data: MenuItem) {
    return http.put("/system/menu", data);
}

export function getMenuTree<T extends object>(params?: T) {
    return http.get<MenuItem[]>("/system/menu", params);
}

export function getMenuSelectTree<T extends object>(params?: T) {
    return http.get<MenuItem[]>("/system/menu/selectTree", params);
}