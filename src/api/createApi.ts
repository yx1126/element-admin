import { mergeConfig, type AxiosRequestConfig } from "axios";
import http from "@/utils/http";
import { isObject } from "@/utils/validata";

type Method = | "get" | "GET" | "delete" | "DELETE" | "post" | "POST" | "put" | "PUT";
type FnType<K extends string> = "list" | "create" | "update" | "delete" | "info" | K;

interface Config<R extends string> {
    register?: Record<R, string | [Method, string]>;
    headers?: AxiosRequestConfig["headers"];
    idKey?: string;
    beforeRequest?: (type: FnType<R>, config?: AxiosRequestConfig, options?: Config<R>) => AxiosRequestConfig;
}

export type ApiBack<R extends string> = InstanceType<typeof Api> & {
    [K in R]: any
};

class Api<Data, R extends string> {
    private readonly path: string;
    private readonly config?: Config<R>;
    constructor(path: string, config?: Config<R>) {
        this.path = path;
        this.config = config;
    }

    private getConfig(type: FnType<R>, config: AxiosRequestConfig) {
        const base = mergeConfig({ headers: this.config?.headers || {} }, config);
        const _config = mergeConfig(base, { url: this.path });
        if(!this.config?.beforeRequest) return _config;
        return this.config.beforeRequest(type, _config, this.config);
    }

    group<Data = any, R extends string = any>(path: string, config?: Config<R>) {
        const base = mergeConfig({ headers: this.config?.headers || {} }, { headers: config?.headers || {} });
        return createApi<Data, R>(path, {
            idKey: this.config?.idKey,
            ...config,
            headers: base.headers,
            beforeRequest: !this.config?.beforeRequest
                ? config?.beforeRequest
                : (type, c, options) => {
                    const _config = this.config!.beforeRequest!(type as any, c, options as any);
                    if(config?.beforeRequest) {
                        return config.beforeRequest(type, config, options);
                    }
                    return _config;
                },
        });
    }

    list<T extends object = any>(params: T, headers?: AxiosRequestConfig["headers"]) {
        return http.request(this.getConfig("list", {
            headers,
            params,
            method: "get",
        }));
    }

    info(id: string | number | Data, headers?: AxiosRequestConfig["headers"]) {
        if(isObject(id)) {
            id = (id as any)[this.config?.idKey || "id"];
        }
        return http.request(this.getConfig("info", {
            headers,
            data: id,
            method: "get",
        }));
    }

    create(data: Data, headers?: AxiosRequestConfig["headers"]) {
        return http.request(this.getConfig("create", {
            headers,
            data,
            method: "post",
        }));
    }

    update(data: Data, headers?: AxiosRequestConfig["headers"]) {
        return http.request(this.getConfig("update", {
            headers,
            data,
            method: "put",
        }));
    }

    delete<T>(data: T, headers?: AxiosRequestConfig["headers"]) {
        return http.request(this.getConfig("delete", {
            headers,
            data,
            method: "delete",
        }));
    }
}

export function createApi<Data = any, R extends string = any>(...args: ConstructorParameters<typeof Api<Data, R>>) {
    return new Api<Data, R>(...args);
}