import http from "@/utils/http";
import type { CodeInfo } from "#/views";
import type { MenuItem, UserInfo } from "#/system";

export function getCode() {
    return http.get<CodeInfo>("/code");
}

export function login(data: string) {
    return http.post<string>("/login", data);
}

export function logout() {
    return http.post("/logout");
}

export function getUserInfo() {
    return http.get<UserInfo>("/auth/getUserInfo");
}

export function getUserPermission() {
    return http.get<{ menus: MenuItem[]; permission: string[] }>("/auth/permission");
}