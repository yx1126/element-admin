<template>
    <el-config-provider :locale="local">
        <router-view />
        <el-watermark class="h-[100%] watermark" content="ElementAdmin" />
        <Setting />
    </el-config-provider>
</template>

<script setup lang="ts">
import { LangMap } from "@/locales";
import Setting from "@/layout/components/Setting.vue";

const lang = useLocales();

const local = computed(() => {
    return LangMap[lang.value];
});
</script>

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