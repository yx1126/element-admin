<template>
    <el-input v-model="inputValue">
        <template v-for="slot in Object.keys($slots)" #[slot] :key="slot">
            <slot :name="slot" />
        </template>
    </el-input>
</template>

<script setup lang="ts">
import { debounce } from "lodash-es";

defineOptions({
    name: "LazyInput",
});

const modelValue = defineModel<string>();

const { delay = 500, modelModifiers = { lazy: false } } = defineProps<{
    modelModifiers?: { lazy?: boolean };
    delay?: number;
}>();

const inputValue = ref<Noable<string>>(modelValue.value);

let updateValue: ReturnType<typeof debounce>;

watch(() => delay, value => {
    updateValue = debounce((value?: string) => {
        modelValue.value = value;
    }, modelModifiers?.lazy ? value : 0);
    onWatcherCleanup(updateValue.cancel);
}, {
    immediate: true,
});

watch(inputValue, value => {
    updateValue(value);
});

watch(modelValue, value => {
    inputValue.value = value;
});
</script>