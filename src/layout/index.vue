<template>
    <component :is="LayoutMap[set.layoutMode]">
        <el-scrollbar>
            <Main />
        </el-scrollbar>
    </component>
</template>

<script setup lang="ts">
import type { LayoutMode } from "#/stores";
import type { Component } from "vue";
import Main from "./components/Main.vue";

defineOptions({
    name: "LayoutMain",
});

const set = useSetStore();

const LayoutMap: Record<LayoutMode, Component> = {
    aside: defineAsyncComponent(() => import("./mian/AsideLayout.vue")),
    top: defineAsyncComponent(() => import("./mian/TopLayout.vue")),
    mixin: defineAsyncComponent(() => import("./mian/MixinLayout.vue")),
    asideMixin: defineAsyncComponent(() => import("./mian/AsideMixinLayout.vue")),
};
</script>

<style lang="scss" scoped>
:deep(.el-header),
:deep(.el-main) {
    padding: 0;
}
:deep(.el-main) {
    background-color: #f5f7f9;
}
</style>