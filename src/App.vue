<template>
    <el-config-provider :locale="local">
        <router-view />
    </el-config-provider>
</template>

<script setup lang="ts">
import { LangMap } from "@/locales";
import icons from "virtual:svg-icons-list";

const lang = useLocales();

console.log(icons);

const local = computed(() => {
    return LangMap[lang.value];
});
</script>

<style lang="scss"></style>