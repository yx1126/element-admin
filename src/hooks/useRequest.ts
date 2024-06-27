import type { Result } from "#/axios";
import { isArray, isFunction as isFn, isObject } from "@/utils/validata";
import type { Ref } from "vue";


type Request<T, D extends any[]> = (...args: D) => Promise<Result<T>>;


export interface RequestOptions<T, D extends any[]> {
    request: Request<T, D>;
    default: T extends object ? Partial<T> : T;
    formatter?: (data: T) => T;
    immediate?: boolean;
    // 对象是否合并
    assign?: boolean;
    // 数组是否合并
    concat?: boolean;
}

export interface UseRequest<T, R extends (...args: any) => any> {
    loading: Ref<boolean>;
    data: Ref<T>;
    query: (...querys: Parameters<R>) => Promise<void>;
}

/**
 * @param options 配置
 */
export function useRequest<T, D extends any[] = any>(options: RequestOptions<T, D>): UseRequest<T, RequestOptions<T, D>["request"]>;
/**
 *
 * @param request 请求方法
 * @param defaultValue 默认值
 */
export function useRequest<T, D extends any[]>(request: Request<T, D>, defaultValue: T): UseRequest<T, Request<T, D>>;
/**
 *
 * @param request 请求方法
 * @param defaultValue 默认值
 * @param immediate `onBeforeMount` 里立即执行 `request` 方法
 */
export function useRequest<T, D extends any[]>(request: Request<T, D>, defaultValue: T, immediate: boolean): UseRequest<T, Request<T, D>>;
export function useRequest<T, D extends any[]>(options: RequestOptions<T, D> | Request<T, D>, defaultValue?: T, immediate?: boolean) {
    const defOptions = Object.assign(
        {
            assign: true,
        },
        isFn(options) ? { request: options, default: defaultValue, immediate: immediate ?? true } : options,
    ) as RequestOptions<T, D>;

    if(!Object.hasOwn(defOptions, "default")) {
        throw new Error("[useRequest/options]: The default field cannot be empty");
    }

    const loading = ref(false);
    const data = ref(defOptions.default) as Ref;

    async function query(...query: any) {
        try {
            loading.value = true;
            const { request, formatter, assign, concat } = defOptions;
            const res = await request(...query);
            const reqData: unknown = formatter ? formatter(res.data) : res.data;
            if(isObject(data.value) && isObject(reqData) && assign) {
                data.value = Object.assign(data.value, reqData);
            } else if(isArray(data.value) && isArray(reqData) && concat) {
                data.value = [...data.value, ...reqData];
            } else {
                data.value = reqData;
            }
        } catch (err: any) {
            // @ts-ignore
            ElMessage.error(err?.msg || err?.data?.msg || "查询失败");
        } finally {
            loading.value = false;
        }
    }

    // 立即执行
    onBeforeMount(() => {
        const { immediate } = defOptions;
        if(immediate) {
            query();
        }
    });

    return {
        loading,
        data,
        query,
    };
}
