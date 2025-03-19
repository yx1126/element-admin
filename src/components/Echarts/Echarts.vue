<script lang="ts" setup>
import * as Echarts from "echarts";
import type { EChartsCoreOption, ECharts as EchartsInstance } from "echarts";

const {
    options,
    renderer = "canvas",
    dark,
} = defineProps<{
    options: EChartsCoreOption;
    renderer?: "svg" | "canvas";
    dark?: boolean;
}>();

const set = useSetStore();

const echartsRef = useTemplateRef("echartsRef");
const echarts = shallowRef<Nullable<EchartsInstance>>(null);

const defaultOptions = computed(() => {
    return {
        backgroundColor: dark ? undefined : "transparent",
        ...options,
    };
});

watch([() => set.collapsed, () => set.asideMixinCollapsed], () => {
    setTimeout(() => {
        refresh();
    }, 300);
});

watch(() => options, options => {
    echarts.value?.setOption(options);
});

watch([() => renderer, () => dark, () => set.navMode], () => {
    if(dark) return;
    init();
});

onMounted(() => {
    init();
});

onUnmounted(() => {
    if(echarts.value) echarts.value.dispose();
});

function init() {
    if(echarts.value) echarts.value.dispose();
    echarts.value = Echarts.init(echartsRef.value!, dark ? "dark" : set.navMode === "dark" ? "dark" : undefined, {
        renderer: renderer,
    });
    echarts.value.setOption(defaultOptions.value);
    if(set.layoutMode === "asideMixin") {
        setTimeout(resize, 300);
    }
}

function refresh() {
    clear();
    resize();
    echarts.value?.setOption(defaultOptions.value);
}

function resize() {
    echarts.value?.resize();
}

function clear() {
    echarts.value?.clear();
}

defineExpose({
    refresh,
    resize,
    clear,
    instance: echarts,
});
</script>

<template>
    <div class="w-[100%] h-[100%] overflow-hidden">
        <div ref="echartsRef" class="w-[100%] h-[100%]" />
    </div>
</template>