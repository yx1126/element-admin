<template>
    <el-config-provider :locale="local">
        <Layout />
    </el-config-provider>
</template>

<script setup lang="ts">
import Layout from "@/layout/index.vue";
import { LangMap } from "@/locales";

const lang = useLocales();

const local = computed(() => {
    return LangMap[lang.value];
});
</script>

<style lang="scss" scoped>
</style>