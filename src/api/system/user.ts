import http from "@/utils/http";
import type { PageInfo } from "#/axios";
import type { UserInfo } from "#/system";

export function getUserList<T extends object>(params?: T) {
    return http.get<PageInfo<UserInfo[]>>("/system/user", params);
}

export function getUserAllList<T extends object>(params?: T) {
    return http.get<UserInfo[]>("/system/user/all", params);
}

export function getUserInfo(id: number) {
    return http.get("/system/user/" + id);
}

export function userCreate(data: UserInfo) {
    return http.post("/system/user", data);
}

export function userUpdate(data: UserInfo) {
    return http.put("/system/user", data);
}

export function userDelete(ids: number[]) {
    return http.delete("/system/user", ids);
}

export function userResetPwd(id: number) {
    return http.put(`/system/user/reset/${id}`);
}