<template>
    <el-config-provider ref="configRef" :locale="local">
        <router-view />
    </el-config-provider>
</template>

<script setup lang="ts">
import { LangMap } from "@/locales";

const lang = useLocales();

const local = computed(() => {
    return LangMap[lang.value];
});
</script>

<style lang="sass"></style>