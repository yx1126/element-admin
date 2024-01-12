<template>
    <el-config-provider :locale="local">
        <Layout />
    </el-config-provider>
</template>

<script setup lang="ts">
import { LangMap } from "@/locales";
import Layout from "@/layout/index.vue";

const lang = useLocales();

const local = computed(() => {
    return LangMap[lang.value];
});
</script>

<style lang="scss">
</style>