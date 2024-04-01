<template>
    <el-icon>
        <slot>
            <svg-icon v-if="isString(icon) && !(icon.startsWith('ele-') || icon.startsWith('Ele'))" :icon="icon" :style="style" />
            <component :is="icon" v-else :style="style" />
        </slot>
    </el-icon>
</template>


<script setup lang="ts">
import { isString } from "@/utils/validata";
import SvgIcon from "./SvgIcon.vue";
import { defineProp } from "@/utils/defineProp";
import type { CSSProperties } from "vue";

defineOptions({
    name: "Icon"
});

const props = defineProps({
    icon: { type: defineProp<string | Component>([String, Object, Function]) },
    rotate: { type: [String, Number], validator: (value) => /^\d+$/.test(String(value)), default: 0 }
});

const style = computed<CSSProperties>(() => {
    const { rotate } = props;
    return {
        transform: `rotate(${rotate}deg)`,
    };
})

</script>
