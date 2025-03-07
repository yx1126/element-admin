import TransRouterView from "@/components/TransRouterView";

export function ParentLayout(name: string) {
    return defineComponent({
        name: name,
        render() {
            return h(TransRouterView);
        },
    });
}