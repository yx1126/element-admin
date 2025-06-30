import http from "@/utils/http";

export function uploadAvatar<T extends object>(data: T) {
    return http.postForm("/upload/avatar", data);
}