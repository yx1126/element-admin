import type { FunctionDirective } from "vue";
import { auth } from "@/utils/permission";

export default ((el, binding) => {
    if(!auth(binding.value) && el.parentNode) {
        el.parentNode.removeChild(el);
    }
}) satisfies FunctionDirective<HTMLElement, string | string[]>;