<template>
    <component :is="LayoutMap[set.layoutMode]">
        <router-view />
    </component>
</template>

<script setup lang="ts">
import type { LayoutMode } from "#/stores";

const set = useSetStore();

const LayoutMap: Record<LayoutMode, any> = {
    aside: defineAsyncComponent(() => import("./mian/AsideLayout.vue")),
    top: defineAsyncComponent(() => import("./mian/TopLayout.vue")),
    mixin: defineAsyncComponent(() => import("./mian/MixinLayout.vue")),
    asideMixin: defineAsyncComponent(() => import("./mian/AsideMixinLayout.vue")),
}
</script>

<style lang="scss" scoped></style>