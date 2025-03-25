import { routerTransList } from "@/stores";
import { KeepAlive, Transition } from "vue";
import type { RouteLocationNormalizedLoaded } from "vue-router";

export default defineComponent({
    name: "TransRouterView",
    props: {
        transition: { type: Boolean, default: true },
    },
    setup(props) {
        const set = useSetStore();
        const tags = useTagStore();

        const routerTrans = computed(() => set.routerTrans);

        const transitionMode = computed(() => {
            return routerTransList.find(r => r.value === routerTrans.value)?.mode || "default";
        });

        const keeps = computed(() => {
            const names = tags.tagList.filter(v => v.meta.keepAlive).flatMap(v => [...(v.matchedName || []), v.name]);
            return [...new Set(names)];
        });

        return () => {
            const { transition } = props;
            return (
                <router-view>
                    {{
                        default: ({ Component, route }: { Component: any; route: RouteLocationNormalizedLoaded }) => {
                            return (
                                <Transition name={routerTrans.value} mode={transitionMode.value}>
                                    <KeepAlive include={keeps.value} exclude={["Redirect"]}>
                                        <Component key={transition ? route.fullPath : undefined} />
                                    </KeepAlive>
                                </Transition>
                            );
                        },
                    }}
                </router-view>
            );
        };
    },
});
