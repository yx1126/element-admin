import http from "@/utils/http";
import type { CodeInfo } from "#/views";

export function getCode() {
    return http.get<CodeInfo>("/code");
}

export function login(data: string) {
    return http.post("/login", data);
}