<script setup lang="ts">
import { createHighlighterCore, type HighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";
import Wasm from "shiki/wasm";
import GithubDark from "shiki/themes/github-dark.mjs";
import GithubLight from "shiki/themes/github-light.mjs";
import VueLang from "shiki/langs/vue.mjs";
import TsLang from "shiki/langs/typescript.mjs";

defineOptions({
    name: "CodeCard",
});

const { code } = defineProps<{
    code?: string;
}>();

const set = useSetStore();

const codeRef = useTemplateRef("codeRef");

const highlighter = shallowRef<Nullable<HighlighterCore>>(null);

const show = ref(false);

watch(() => [code, show.value], () => {
    renderHtml();
}, {
    flush: "post",
});

onBeforeMount(async () => {
    highlighter.value = await createHighlighterCore({
        themes: [GithubDark, GithubLight],
        langs: [VueLang, TsLang],
        engine: createOnigurumaEngine(Wasm),
    });
    nextTick(renderHtml);
});

function renderHtml() {
    if(!code || !codeRef.value) return;
    const codeHtml = highlighter.value?.codeToHtml(code, {
        themes: {
            light: "github-light",
            inverted: "github-light",
            dark: "github-dark",
        },
        lang: "vue",
    });
    if(codeHtml) {
        codeRef.value.innerHTML = codeHtml;
    }
}
</script>

<template>
    <el-card-v2 class="code-card" border="footer" hover>
        <slot />
        <template #extra>
            <div class="flex items-center gap-x-10px">
                <el-tooltip content="复制代码" placement="top">
                    <el-link :underline="false">
                        <Icon icon="copy" size="16" />
                    </el-link>
                </el-tooltip>
                <el-tooltip content="展开" placement="top">
                    <el-link :underline="false">
                        <Icon icon="code" size="16" @click="show = !show" />
                    </el-link>
                </el-tooltip>
            </div>
        </template>
        <template v-if="show" #footer>
            <div ref="codeRef" class="w-100% text-14px" :data-theme="set.navMode"></div>
        </template>
    </el-card-v2>
</template>

<style lang="scss">
@each $theme in inverted,dark {
    [data-theme='#{$theme}'] .shiki,
    [data-theme='#{$theme}'] .shiki span {
        background-color: var(--shiki-#{$theme}-bg) !important;
        color: var(--shiki-#{$theme}) !important;
    }
}
</style>