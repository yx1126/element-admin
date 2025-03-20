<script setup lang="ts">
import { useTransition, type UseTransitionOptions } from "@vueuse/core";

defineOptions({
    name: "CountTo",
});

const {
    value,
    options,
} = defineProps<{
    value: number;
    options?: UnRefable<UseTransitionOptions>;
}>();

const source = ref(0);

const outputValue = useTransition(source, {
    duration: 500,
    ...options,
});

watch(() => value, val => {
    source.value = val;
}, {
    immediate: true,
    flush: "post",
});
</script>

<template>
    <el-statistic :value="outputValue" />
</template>
