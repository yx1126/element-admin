<template>
    <el-icon :style="style">
        <slot>
            <svg-icon v-if="isString(icon) && !(icon.startsWith('ele-') || icon.startsWith('Ele'))" :icon="icon" />
            <component :is="icon" v-else />
        </slot>
    </el-icon>
</template>


<script setup lang="ts">
import { isString } from "@/utils/validata";
import SvgIcon from "./SvgIcon.vue";
import type { CSSProperties } from "vue";

defineOptions({
    name: "Icon"
});

const props = withDefaults(defineProps<{
    icon?: string | Component;
    rotate?: string | number;
    cursor?: boolean | CSSProperties["cursor"];
}>(), {
    rotate: 0,
    default: false
});

const style = computed<CSSProperties>(() => {
    const { rotate, cursor } = props;
    return {
        transform: `rotate(${rotate}deg)`,
        cursor: cursor ? isString(cursor) ? cursor : "pointer" : undefined
    };
})

</script>
