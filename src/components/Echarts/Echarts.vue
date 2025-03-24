<script lang="ts" setup>
import * as Echarts from "echarts";
import { useResizeObserver } from "@vueuse/core";
import type { EChartsOption, ECharts as EchartsInstance } from "echarts";

const {
    options,
    renderer = "canvas",
    dark,
    beforeRender,
    afterRender,
} = defineProps<{
    options: EChartsOption;
    renderer?: "svg" | "canvas";
    dark?: boolean;
    beforeRender?: (echarts: typeof Echarts) => void;
    afterRender?: (instance: EchartsInstance, echarts: typeof Echarts) => void;
}>();

const set = useSetStore();

const echartsRef = useTemplateRef("echartsRef");
const echarts = shallowRef<Nullable<EchartsInstance>>(null);

useResizeObserver(echartsRef, onResize);

watch(() => options, value => {
    setOption(value);
}, {
    deep: true,
    flush: "post",
});

watch(() => [renderer, dark], init);

onMounted(init);

onScopeDispose(() => {
    if(echarts.value) echarts.value.dispose();
});

async function init() {
    if(echarts.value) echarts.value.dispose();
    await nextTick();
    if(beforeRender) beforeRender(Echarts);
    echarts.value = Echarts.init(echartsRef.value!, dark || set.navMode === "dark" ? "dark" : undefined, {
        renderer: renderer,
    });
    setOption(options);
    if(afterRender) {
        afterRender(echarts.value!, Echarts);
    }
}

function setOption(options?: EChartsOption) {
    echarts.value?.setOption({
        backgroundColor: dark ? undefined : "transparent",
        ...options,
    });
}

function onRefresh() {
    onClear();
    onResize();
    setOption(options);
}

function onResize() {
    echarts.value?.resize();
}

function onClear() {
    echarts.value?.clear();
}

defineExpose({
    onRefresh,
    onResize,
    onClear,
    setOption,
    instance: echarts,
});
</script>

<template>
    <div class="w-[100%] h-[100%] overflow-hidden">
        <div ref="echartsRef" class="w-[100%] h-[100%]" />
    </div>
</template>