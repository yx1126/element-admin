<script setup lang="ts">
import type { VNode } from "vue";

defineOptions({
    name: "CodeCard",
});

const { code } = defineProps<{
    code?: string;
}>();

defineSlots<{
    default?: () => VNode[];
}>();

const { t } = useI18n();
const message = useMessage();
const set = useSetStore();
const shiki = useShiKi();

const codeRef = useTemplateRef("codeRef");

const show = ref(false);

watch(() => [code, show.value], () => {
    renderHtml(code);
}, {
    flush: "post",
});

function renderHtml(code?: string) {
    if(!code || !codeRef.value) return;
    const codeHtml = shiki.codeToHtml(code, {
        themes: {
            light: "github-light",
            dark: "github-dark",
        },
        lang: "vue",
    });
    if(codeHtml) {
        codeRef.value.innerHTML = codeHtml;
    }
}

function onCopySuccess() {
    message.success("Copy success!");
}
</script>

<template>
    <el-card-v2 class="code-card" border="footer" hover>
        <slot />
        <template #extra>
            <div class="flex items-center gap-x-10px">
                <el-tooltip :content="t('copy-code')" placement="top">
                    <el-link :underline="false">
                        <Icon v-copy="code" v-copy:success="onCopySuccess" icon="copy" size="16" />
                    </el-link>
                </el-tooltip>
                <el-tooltip :content="t(show ? 'expand' : 'unexpand')" placement="top">
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

<style lang="scss" scoped>
:global([data-theme='dark'] .shiki),
:global([data-theme='dark'] .shiki span) {
    background-color: var(--shiki-dark-bg) !important;
    color: var(--shiki-dark) !important;
}
:global(.shiki) {
    padding: 15px;
    border-radius: 10px;
}
</style>

<i18n lang="yaml">
zh:
  copy-code: 复制代码
  expand: 展开
  unexpand: 折叠
en:
  copy-code: Copy code
  expand: Expand
  unexpand: Unexpand
</i18n>