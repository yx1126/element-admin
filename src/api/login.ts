import http from "@/utils/http";

export function login(data: string) {
    return http.post("/login", data);
}