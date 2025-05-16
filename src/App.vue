<script setup lang="ts">
import { LangMap } from "@/locales";
import Setting from "@/components/Setting";
import { Configs } from "./config";
// import { decrypt, encrypt } from "@/utils/crypto";
// import { login } from "@/api/login";
// import type { LoginInfo } from "#/views";

// const info: LoginInfo = {
//     username: "admin",
//     password: "123456",
//     code: "12",
//     uuid: "11-22-33-13-55",
// };
// const str = encrypt(JSON.stringify(info));
// console.log("decrypt", decrypt(str));

const { lang } = useLocales({ immediate: true });
const set = useSetStore();

const title = import.meta.env.VITE_APP_TITLE;

const local = computed(() => {
    return LangMap[lang.value];
});

onBeforeMount(() => {
    // login(str).then(() => {});
    const { headerHeight, tagsHeight } = Configs;
    const root = document.documentElement;
    root.style.setProperty("--header-height", headerHeight + "px");
    root.style.setProperty("--tags-height", tagsHeight + "px");
});
</script>

<template>
    <el-config-provider :locale="local" v-bind="Configs.elConfigProvide">
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