import { getDictData } from "@/utils/dict";
import type { DictData } from "#/dict";

function makeMap<T>(value: string | string[]) {
    const list = typeof value === "string" ? value.split(",") : value;
    return list.reduce((pre, key) => {
        pre[key] = [] as T;
        return pre;
    }, {} as Record<string, T>);
}

export function useDict<Dict extends string>(...dicts: Dict[]) {
    const result: Record<Dict, DictData[]> = reactive(makeMap(dicts));
    onBeforeMount(() => {
        dicts.forEach(async dictType => {
            const data = await getDictData(dictType);
            result[dictType] = data;
        });
    });
    return {
        ...toRefs(result),
    };
}