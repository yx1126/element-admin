<template>
    <component :is="LayoutMap[set.layoutMode]">
        <router-view />
    </component>
</template>

<script setup lang="ts">
import type { LayoutMode } from "#/stores";
import type { Component } from "vue";

defineOptions({
    name: "LayoutMain"
})

const set = useSetStore();

const LayoutMap: Record<LayoutMode, Component> = {
    aside: defineAsyncComponent(() => import("./mian/AsideLayout.vue")),
    top: defineAsyncComponent(() => import("./mian/TopLayout.vue")),
    mixin: defineAsyncComponent(() => import("./mian/MixinLayout.vue")),
    asideMixin: defineAsyncComponent(() => import("./mian/AsideMixinLayout.vue")),
}
</script>

<style lang="scss" scoped>
:deep(.el-header),
:deep(.el-main) {
    padding: 0;
}
</style>