import axios, {
    type AxiosInstance,
    type AxiosRequestConfig,
    type CreateAxiosDefaults,
    type AxiosInterceptorManager,
    type InternalAxiosRequestConfig,
    type AxiosResponse,
} from "axios";

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

export class Interceptors {
    service: AxiosInstance;
    static request: Parameters<AxiosInterceptorManager<InternalAxiosRequestConfig>["use"]>[] = [];
    static response: Parameters<AxiosInterceptorManager<AxiosResponse>["use"]>[] = [];
    constructor(service: AxiosInstance) {
        this.service = service;
    }
    request() {
        Interceptors.request.forEach(request => {
            this.service.interceptors.request.use(...request);
        });
    }

    response() {
        Interceptors.response.forEach(response => {
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

export class Http {

    private readonly service: AxiosInstance;

    interceptors: InterceptorsType;

    /**
     * 添加全局拦截器
     */
    static interceptors: InterceptorsStaticType = {
        request: {
            use(...args) {
                return Interceptors.request.push(args);
            },
        },
        response: {
            use(...args) {
                return Interceptors.response.push(args);
            },
        },
    };

    /**
     * 
     * @param {CreateAxiosDefaults} config 
     * @param {Boolean} use 是否使用全局拦截器
     */
    constructor(config?: CreateAxiosDefaults, use: boolean = true) {
        this.service = axios.create(config);
        if(use) {
            const interceptors = new Interceptors(this.service);
            interceptors.request();
            interceptors.response();
        }
        this.interceptors = {
            request: new InterceptorsInject(this.service, "request"),
            response: new InterceptorsInject(this.service, "response"),
        };
    }

    request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R> {
        return this.service.request(config);
    }
}