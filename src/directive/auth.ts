import type { FunctionDirective } from "vue";

export default ((el, binding) => {
    binding.value;
}) satisfies FunctionDirective<HTMLElement, string[]>;