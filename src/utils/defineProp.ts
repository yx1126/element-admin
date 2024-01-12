import type { PropType } from "vue";


export function defineProp<T>(val: unknown) {
    return val as PropType<T>;
}
