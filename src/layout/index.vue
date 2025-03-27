<script setup lang="ts">
import Main from "./components/Main.vue";
import type { LayoutMode } from "#/stores";
import type { AsyncComponentLoader, Component } from "vue";

defineOptions({
    name: "LayoutMain",
});

const set = useSetStore();

const LayoutMap: Record<LayoutMode, Component> = {
    aside: loadComponent(() => import("./mian/AsideLayout.vue")),
    top: loadComponent(() => import("./mian/TopLayout.vue")),
    mixin: loadComponent(() => import("./mian/MixinLayout.vue")),
    asideMixin: loadComponent(() => import("./mian/AsideMixinLayout.vue")),
};

function loadComponent<T extends Component>(loader: AsyncComponentLoader<T>): ReturnType<typeof defineAsyncComponent> {
    return defineAsyncComponent({
        loader,
        delay: 0,
        loadingComponent: h("load-icon"),
    });
}
</script>

<template>
    <component :is="LayoutMap[set.layoutMode]">
        <Main />
    </component>
</template>

<style lang="scss">
.el-header,
.el-main {
    padding: 0 !important;
}

.el-main {
    background-color: var(--page-bg-color);
    @include when-dark {
        background-color: transparent;
    }
}
</style>