import type { MenuItem } from "#/menu";
import http from "@/utils/http";

export function getMenuTree<T extends object>(params?: T) {
    return http.get<MenuItem[]>("/system/menu", params);
}