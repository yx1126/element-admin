<script setup lang="ts">
import { LangMap } from "@/locales";
import Setting from "@/components/Setting";
import { buttonConfig, messageConfig } from "./config";

const { lang } = useLocales({ immediate: true });

const local = computed(() => {
    return LangMap[lang.value];
});
</script>

<template>
    <el-config-provider :locale="local" :button="buttonConfig" :message="messageConfig">
        <router-view />
        <el-watermark class="h-[100%] watermark" content="ElementAdmin" />
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