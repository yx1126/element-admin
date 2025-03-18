<script setup lang="ts">
import { LangMap } from "@/locales";
import Setting from "@/components/Setting";
import { buttonConfig, messageConfig, LayoutConfig } from "./config";

const { lang } = useLocales({ immediate: true });
const set = useSetStore();

const title = import.meta.env.VITE_APP_TITLE;

const local = computed(() => {
    return LangMap[lang.value];
});

onBeforeMount(() => {
    const { headerHeight, tagsHeight } = LayoutConfig;
    const root = document.documentElement;
    root.style.setProperty("--header-height", headerHeight + "px");
    root.style.setProperty("--tags-height", tagsHeight + "px");
});
</script>

<template>
    <el-config-provider :locale="local" :button="buttonConfig" :message="messageConfig">
        <router-view />
        <el-watermark v-if="set.isShowWatermark" class="h-[100%] watermark" :content="title" />
        <Setting />
    </el-config-provider>
</template>

<style lang="scss">
.watermark {
    position: fixed !important;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 100000;
    pointer-events: none;
}
</style>