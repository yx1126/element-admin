<script lang="tsx">
import { Transition, KeepAlive } from "vue";
import { RouterView } from "vue-router";
import { routerTransList } from "@/stores";
// import { TransContext } from ".";
import type { RouteLocationNormalizedLoaded } from "vue-router";

export default defineComponent({
    name: "TransRouterView",
    setup() {
        const set = useSetStore();
        const tags = useTagStore();
        const keepMitt = useMitt("keepAlive");
        const excludeName = ref("");

        const routerTrans = computed(() => set.routerTrans);
        // const transContext = inject(TransContext, "");

        const transitionMode = computed(() => {
            return routerTransList.find(r => r.value === routerTrans.value)?.mode || "default";
        });

        const keeps = computed(() => {
            const names = tags.tagList.filter(v => v.meta.keepAlive).flatMap(v => [...(v.matchedName || []), v.name]);
            return [...new Set(names)];
        });

        const excludeList = computed(() => {
            const val = ["Redirect"];
            if(excludeName.value) val.push(excludeName.value);
            return val;
        });

        // provide(TransContext, "TransRouterView");

        keepMitt.on(name => {
            excludeName.value = name;
        });
        return () => {
            return (
                <RouterView>
                    {{
                        default: ({ Component, route }: { Component: any; route: RouteLocationNormalizedLoaded }) => {
                            return (
                                <Transition name={routerTrans.value} mode={transitionMode.value} appear>
                                    <KeepAlive include={keeps.value} exclude={excludeList.value}>
                                        { Component ? <Component key={route.fullPath} /> : null }
                                    </KeepAlive>
                                </Transition>
                            );
                        },
                    }}
                </RouterView>
            );
        };
    },
});
</script>