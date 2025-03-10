<template>
    <el-icon :style="style">
        <slot>
            <svg-icon v-if="isStr(icon) && !(icon.startsWith('ele-') || icon.startsWith('Ele'))" :icon="icon" />
            <component :is="icon" v-else />
        </slot>
    </el-icon>
</template>

<script setup lang="ts">
import { isStr } from "@/utils/validata";
import SvgIcon from "./SvgIcon.vue";
import type { CSSProperties, Component } from "vue";

defineOptions({
    name: "Icon",
});

const { rotate = 0, cursor = false } = defineProps<{
    icon?: string | Component;
    rotate?: string | number;
    cursor?: boolean | CSSProperties["cursor"];
}>();

const style = computed<CSSProperties>(() => {
    return {
        transform: `rotate(${rotate}deg)`,
        cursor: cursor ? isStr(cursor) ? cursor : "pointer" : undefined,
    };
});
</script>