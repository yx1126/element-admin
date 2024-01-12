import axios, {
    mergeConfig,
    type AxiosInstance,
    type AxiosRequestConfig,
    type CreateAxiosDefaults,
    type AxiosInterceptorManager,
    type InternalAxiosRequestConfig,
    type AxiosResponse,
} from "axios";
import { isArray, isEmpty, isObject } from "../validata";
import download from "../download";
import type { ResponseResult } from "#/axios";

type AxiosRequestManager = AxiosInterceptorManager<InternalAxiosRequestConfig>;

type AxiosResponseManager = AxiosInterceptorManager<AxiosResponse>;

interface InterceptorsStaticType {
    request: Pick<AxiosRequestManager, "use">;
    response: Pick<AxiosResponseManager, "use">;
}

interface InterceptorsType {
    request: AxiosRequestManager;
    response: AxiosResponseManager;
}

export interface CreateAxios<D = any> extends CreateAxiosDefaults<D>  {
    /**
     * 是否开启全局拦截器
     * @default true
     */
    useInterceptor?: boolean;
}

class GlobalConfig {
    service: AxiosInstance;

    /**
     * 全局配置
     */
    static config: CreateAxios = {};

    /**
     * 全局拦截器
     */
    static request: Parameters<AxiosInterceptorManager<InternalAxiosRequestConfig>["use"]>[] = [];
    static response: Parameters<AxiosInterceptorManager<AxiosResponse>["use"]>[] = [];

    constructor(service: AxiosInstance) {
        this.service = service;
    }

    request() {
        GlobalConfig.request.forEach(request => {
            this.service.interceptors.request.use(...request);
        });
    }

    response() {
        GlobalConfig.response.forEach(response => {
            this.service.interceptors.response.use(...response);
        });
    }
}

class InterceptorsInject<K extends keyof InterceptorsType> implements AxiosInterceptorManager<InterceptorsType[K]> {
    service: AxiosInstance;
    type: K;
    constructor(service: AxiosInstance, type: K) {
        this.service = service;
        this.type = type;
    }
    use(...args: any) {
        return this.service.interceptors[this.type].use(...args);
    }
    eject(id: number) {
        return this.service.interceptors[this.type].eject(id);
    }
    clear() {
        this.service.interceptors[this.type].clear();
    }
}

/**
 *
 * @param {String} url
 * @param {any} params
 * @example
 *
 * // object
 * const result = matchUrl("/admin/:id/:test", { id: "20240107" });
 * console.log(result.url); // "/admin/20240107/:test"
 *
 * // array
 * const result = matchUrl("/admin/:0/:0/:1", ["20240107"]);
 * console.log(result.url); // "/admin/20240107/20240107/:1"
 */
function matchUrl(url: string, data: any) {
    (url.match(/\/:[a-z0-9]+/g) || []).forEach((k) => {
        let val = "";
        const key = k.replace(/\/:/, "");
        if(isObject<any>(data)) {
            val = data[key];
        } else if(isArray(data)) {
            const value = parseInt(key);
            if(!isNaN(value)) {
                val = data[value];
            }
        }
        if(!isEmpty(val)) {
            url = url.replace(k, "/" + val.toString());
        }
    });
    return url;
}

export class Http<D = any> {

    private readonly service: AxiosInstance;

    interceptors: InterceptorsType;

    /**
     * 添加全局拦截器
     */
    static interceptors: InterceptorsStaticType = {
        request: {
            use(...args) {
                return GlobalConfig.request.push(args);
            },
        },
        response: {
            use(...args) {
                return GlobalConfig.response.push(args);
            },
        },
    };

    /**
     * @param {CreateAxios} config
     */
    constructor(config: CreateAxios<D> = {}) {
        this.service = axios.create(mergeConfig(GlobalConfig.config, config));
        if(config?.useInterceptor ?? true) {
            const interceptors = new GlobalConfig(this.service);
            interceptors.request();
            interceptors.response();
        }
        this.interceptors = {
            request: new InterceptorsInject(this.service, "request"),
            response: new InterceptorsInject(this.service, "response"),
        };
    }

    static setConfig<D = any>(config?: CreateAxios<D>) {
        GlobalConfig.config = Object.assign({}, config);
    }

    static create<D = any>(config?: CreateAxios<D>) {
        return new Http(config);
    }

    get defaults() {
        return this.service.defaults;
    }

    get getUri() {
        return this.service.getUri;
    }

    abortRequest<T = any>(config: AxiosRequestConfig<D>) {
        const controller = new AbortController();
        const request = this.service.request<T>({
            ...config,
            signal: controller.signal,
        });
        return {
            request,
            r: request,
            abort: controller.abort,
        };
    }

    request<T = any>(config: AxiosRequestConfig<D>) {
        return this.service.request<T>(config);
    }

    get<T = any>(url: string, params?: any, headers?: AxiosRequestConfig["headers"]) {
        return this.service.get<T, ResponseResult<T>>(matchUrl(url, params), {
            params,
            headers,
        });
    }

    post<T = any>(url: string, data?: any, headers?: AxiosRequestConfig["headers"]) {
        return this.service.post<T, ResponseResult<T>>(matchUrl(url, data), data, {
            headers,
        });
    }

    postForm<T = any>(url: string, data?: any, headers?: AxiosRequestConfig["headers"]) {
        return this.service.postForm<T, ResponseResult<T>>(matchUrl(url, data), data, {
            headers,
        });
    }

    down<T = Blob>(url: string, data?: any, headers?: AxiosRequestConfig["headers"]) {
        return this.service.post<T>(matchUrl(url, data), data, {
            headers,
            responseType: "blob",
        });
    }

    download<T extends Blob = Blob>(url: string, data?: any, headers?: AxiosRequestConfig["headers"]) {
        return new Promise<AxiosResponse<T>>(async (resolve, reject) => {
            try {
                const response = await this.service.post<T>(matchUrl(url, data), data, {
                    headers,
                    responseType: "blob",
                });
                const contentDisposition = response.headers["content-disposition"];
                if(contentDisposition) {
                    const decodedHeader = decodeURIComponent(contentDisposition);
                    const texts = /filename=(.*?)$/.exec(decodedHeader || "");
                    if(texts && texts[1]) {
                        download(response.data, texts[1]);
                    }
                }
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }

    put<T = any>(url: string, data?: any, headers?: AxiosRequestConfig["headers"]) {
        return this.service.put<T, ResponseResult<T>>(matchUrl(url, data), data, {
            headers,
        });
    }

    putForm<T = any>(url: string, data?: any, headers?: AxiosRequestConfig["headers"]) {
        return this.service.putForm<T, ResponseResult<T>>(matchUrl(url, data), data, {
            headers,
        });
    }

    delete<T = any>(url: string, data?: any, headers?: AxiosRequestConfig["headers"]) {
        return this.service.delete<T, ResponseResult<T>>(matchUrl(url, data), {
            data: data,
            headers,
        });
    }
}

export default Http;