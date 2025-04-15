import http from "@/utils/http";
import type {
    AxiosRequestConfig,
    AxiosResponse,
    RawAxiosRequestHeaders,
} from "axios";

type Method = "get" | "GET" | "post" | "POST" | "put" | "PUT" | "delete" | "DELETE";

class Api<T extends string> {
    private readonly path: string;
    constructor(path: string, _register?: Record<T, Method>) {
        this.path = path;
    }

    group(path: string, register?: Record<T, Method>) {
        return new Api(this.path + path, register);
    }

    requset<T = any>(params?: Omit<AxiosRequestConfig, "url">) {
        return http.request<T>({
            url: this.path,
            ...params,
        });
    }

    abortRequest<T = any>(params?: Omit<AxiosRequestConfig, "url">) {
        return http.abortRequest<T>({
            url: this.path,
            ...params,
        });
    }

    getUri(config?: Omit<AxiosRequestConfig, "url">) {
        return http.getUri({
            url: this.path,
            ...config,
        });
    }

    head<T>(params?: any, headers?: RawAxiosRequestHeaders) {
        return http.head<T>(this.path, params, headers);
    }

    options<T>(params?: any, headers?: RawAxiosRequestHeaders) {
        return http.options<T>(this.path, params, headers);
    }

    patch<T>(data?: any, headers?: RawAxiosRequestHeaders) {
        return http.patch<T>(this.path, data, headers);
    }

    get<T>(params?: any, headers?: RawAxiosRequestHeaders) {
        return http.get<T>(this.path, params, headers);
    }

    post<T>(data?: any, headers?: RawAxiosRequestHeaders) {
        return http.post<T>(this.path, data, headers);
    }

    postForm<T>(data?: Record<string, any>, headers?: RawAxiosRequestHeaders) {
        return http.postForm<T>(this.path, data, headers);
    }

    download<T = Blob, R = AxiosResponse<T>>(data?: Record<string, any>, headers?: RawAxiosRequestHeaders) {
        return http.download<T, R>(this.path, data, headers);
    }

    put<T>(data?: any, headers?: RawAxiosRequestHeaders) {
        return http.put<T>(this.path, data, headers);
    }

    delete<T>(data?: any, headers?: RawAxiosRequestHeaders) {
        return http.delete<T>(this.path, data, headers);
    }
}

export function createApi(path: string) {
    return new Api(path);
}