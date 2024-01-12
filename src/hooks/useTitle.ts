import { isString } from "@/utils/validata";
import type { MaybeRef } from "vue";

export function useTitle(title: MaybeRef<string>, template: string = "%s") {
    const value = ref(title ?? document.title ?? null);
    watch(value, (v, ov) => {
        if(isString(v) && v !== ov && document) {
            document.title = template.replaceAll("%s", v);
        }
    }, {
        immediate: true,
    });
    return value;
}