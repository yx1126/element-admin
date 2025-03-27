import TransRouterView from "@/components/TransRouterView";

export function ParentLayout(name: string) {
    return defineComponent({
        name,
        render() {
            return h("div", { class: "parent-layout" }, h(TransRouterView));
        },
    });
}