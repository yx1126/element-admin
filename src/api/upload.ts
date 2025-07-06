import type { UploadAvatar } from "#/views";
import http from "@/utils/http";

export function uploadAvatar<T extends object>(data: T) {
    return http.postForm<UploadAvatar>("/file/uploadAvatar", data);
}

export function getFile(filename: string) {
    return http.down("/file/getFile", { filename });
}