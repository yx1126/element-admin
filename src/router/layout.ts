import { RouterView } from "vue-router";

export function ParentLayout(name: string) {
    return defineComponent({
        name: name,
        render() {
            return h(RouterView);
        },
    });
}