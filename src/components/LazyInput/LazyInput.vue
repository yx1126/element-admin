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

let updateValue: Nullable<ReturnType<typeof debounce>> = null;

watch(() => delay, value => {
    updateValue = debounce((value?: string) => {
        modelValue.value = value;
    }, modelModifiers?.lazy ? value : 0);
    onWatcherCleanup(() => {
        updateValue?.cancel();
        updateValue = null;
    });
}, {
    immediate: true,
});

watch(inputValue, value => {
    if(updateValue) {
        updateValue(value);
    }
});

watch(modelValue, value => {
    inputValue.value = value;
});
</script>

<template>
    <el-input v-model="inputValue" v-bind="$attrs">
        <template v-for="slot in Object.keys($slots)" #[slot] :key="slot">
            <slot :name="slot" />
        </template>
    </el-input>
</template>