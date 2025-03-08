import { routerTransList } from "@/stores/modules/setting";
import { KeepAlive, Transition } from "vue";
import type { RouteLocationNormalizedLoaded } from "vue-router";

export default defineComponent({
    name: "TransRouterView",
    props: {
        transition: { type: Boolean, default: true },
    },
    setup(props) {
        const set = useSetStore();

        const routerTrans = computed(() => set.routerTrans);

        const transitionMode = computed(() => {
            return routerTransList.find(r => r.value === routerTrans.value)?.mode || "default";
        });

        return () => {
            const { transition } = props;
            return (
                <router-view>
                    {{
                        default: ({ Component, route }: { Component: any; route: RouteLocationNormalizedLoaded }) => {
                            const comp = (
                                <KeepAlive include={[]} exclude={["Redirect"]}>
                                    <Component key={transition ? route.fullPath : undefined} />
                                </KeepAlive>
                            );
                            if(transition) {
                                return (
                                    <Transition name={routerTrans.value} mode={transitionMode.value}>
                                        <comp />
                                    </Transition>
                                );
                            }
                            return comp;
                        },
                    }}
                </router-view>
            );
        };
    },
});
