import { isFn } from "@/utils/validata";
import { debounce } from "lodash-es";
import type { Result } from "#/axios";
import type { Ref } from "vue";

type Request<T, D extends any[]> = (...args: D) => Promise<Result<T>>;

export interface RequestOptions<T, D extends any[]> {
    request: Request<T, D>;
    default: T extends object ? Partial<T> : T;
    formatter?: (data: any) => T;
    immediate?: boolean;
    delay?: number;
}

export interface UseRequest<T, R extends (...args: any) => any> {
    loading: Ref<boolean>;
    data: Ref<T>;
    query: (...querys: Parameters<R>) => Promise<void>;
}

export function useRequest<T, D extends any[] = any>(options: RequestOptions<T, D>): UseRequest<T, RequestOptions<T, D>["request"]>;
export function useRequest<T, D extends any[]>(request: Request<T, D>, defaultValue: T): UseRequest<T, Request<T, D>>;
export function useRequest<T, D extends any[]>(request: Request<T, D>, defaultValue: T, immediate: boolean): UseRequest<T, Request<T, D>>;
export function useRequest<T, D extends any[]>(options: RequestOptions<T, D> | Request<T, D>, defaultValue?: T, immediate?: boolean) {
    const defOptions = isFn(options)
        ? { request: options, default: defaultValue, immediate: immediate ?? true } as RequestOptions<T, D>
        : options;

    if(!Object.hasOwn(defOptions, "default")) {
        throw new Error("[useRequest/options]: The default field cannot be empty");
    }

    const message = useMessage();

    const loading = ref(false);
    const data = ref(defOptions.default);
    const isFirst = ref(true);

    // 立即执行
    onBeforeMount(() => {
        const { immediate } = defOptions;
        if(immediate) {
            query();
        }
    });

    async function queryOnce(...query: any) {
        if(isFirst.value) {
            isFirst.value = false;
            await query(...query);
        }
    }

    async function query(...query: any) {
        try {
            loading.value = true;
            const { request, formatter } = defOptions;
            const res = await request(...query);
            const reqData: unknown = formatter ? formatter(res.data) : res.data;
            data.value = reqData;
        } catch (err: any) {
            message.error(err?.msg || err?.data?.msg || "查询失败");
        } finally {
            loading.value = false;
        }
    }

    return {
        loading,
        data,
        query,
        queryLazy: debounce(query, defOptions.delay),
        queryOnce,
    };
}