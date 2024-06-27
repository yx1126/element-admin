<template>
    <el-input v-model="inputValue">
        <template v-for="slot in Object.keys($slots)" #[slot] :key="slot">
            <slot :name="slot" />
        </template>
    </el-input>
</template>

<script setup lang="ts">
import debounce, { type DebounceFn } from "@/utils/debounce";

const modelValue = defineModel<string>();

const props = withDefaults(defineProps<{
    modelModifiers?: { lazy?: boolean };
    delay?: number;
}>(), {
    modelModifiers: () => ({ lazy: false }),
    delay: 500
})

const inputValue = ref<Noable<string>>(modelValue.value);

let updateValue: DebounceFn<(value?: string) => void>;

watch(() => props.delay, () => {
    if(updateValue) {
        updateValue.cancel();
    }
    updateValue = debounce(function(value?: string) {
        modelValue.value = value;
    }, props.modelModifiers?.lazy ? props.delay : 0);
}, {
    immediate: true,
    deep: true
})

watch(inputValue, (value) => {
    updateValue(value);
});

watch(modelValue, (value) => {
    inputValue.value = value;
})
</script>