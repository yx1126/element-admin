import type { Directive } from "vue";
import drag, { type DragOptions } from "@/utils/drag";

export default {
    created(el, binding) {
        el.__v_drag_stop = drag(el, binding.value);
    },
    updated(el, binding) {
        if(el.__v_drag_stop) {
            el.__v_drag_stop();
        }
        el.__v_drag_stop = drag(el, binding.value);
    },
    beforeUnmount(el) {
        if(el.__v_drag_stop) {
            el.__v_drag_stop();
        }
    },
} satisfies Directive<any, DragOptions>;