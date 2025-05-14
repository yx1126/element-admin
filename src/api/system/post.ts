import http from "@/utils/http";
import type { PageInfo } from "#/axios";
import type { Post } from "#/system";

export function getPostList<T extends object>(params?: T) {
    return http.get<PageInfo<Post[]>>("/system/post", params);
}

export function getPostAllList() {
    return http.get<Post[]>("/system/post/all");
}

export function postCreate(data: Post) {
    return http.post("/system/post", data);
}

export function postUpdate(data: Post) {
    return http.put("/system/post", data);
}

export function postDelete(ids: string[]) {
    return http.delete("/system/post", ids);
}