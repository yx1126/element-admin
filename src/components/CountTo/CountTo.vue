<script setup lang="ts">
import { useTransition, type UseTransitionOptions } from "@vueuse/core";

defineOptions({
    name: "CountTo",
});

const {
    value,
    options,
    duration = 500,
} = defineProps<{
    value: number;
    duration?: number;
    options?: UnRefable<Omit<UseTransitionOptions, "duration">>;
}>();

const source = ref(0);

const outputValue = useTransition(source, {
    ...options,
    duration,
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
