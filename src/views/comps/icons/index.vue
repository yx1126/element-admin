<script setup lang="ts">
import IconSelect from "@/components/IconSelect";
import LazyInput from "@/components/LazyInput";
import { EleIconNames, LocalIconNames } from "@/components/GlobalRegister/Icon";
import CodeCard from "@/components/CodeCard";
import { copy } from "@/utils/clipboard";

defineOptions({
    name: "Icons",
});

const message = useMessage();
const { t } = useI18n();

const selectIcon = ref("");
const iconName = ref("");
const tabsActive = ref<"element" | "local" | "">("");
const copyType = ref(false);

const code = `<script setup lang="ts">
import { ref } from "vue";
import IconSelect from "@/components/IconSelect";

const selectIcon = ref("");
<\/script>

<template>
    <icon-select v-model="selectIcon" class="w-240px" clearable />
</template>
`;

const iconList = computed(() => {
    return {
        element: !iconName.value ? EleIconNames : EleIconNames.filter(v => v.includes(iconName.value)),
        local: !iconName.value ? LocalIconNames : LocalIconNames.filter(v => v.includes(iconName.value)),
    };
});

function onCopy(icon: string) {
    if(copyType.value) {
        icon = `<Icon icon="${icon}" />`;
    }
    copy(icon).then(() => {
        message.success("copy success!");
    });
}
</script>

<template>
    <div class="icons">
        <code-card :header="t('icon-title')" :code>
            <icon-select v-model="selectIcon" class="w-240px" clearable />
        </code-card>
        <el-card class="mt-12px" shadow="hover">
            <div class="mb-12px flex items-center gap-12px">
                <lazy-input v-model.lazy="iconName" class="w-240px" :placeholder="$t('input', [t('icon-name')])" clearable />
                <span>copy: </span>
                <el-switch v-model="copyType" inline-prompt active-text="code" inactive-text="name" />
            </div>
            <el-alert :title="t('choose')" type="warning" show-icon />
            <el-tabs v-model="tabsActive">
                <el-tab-pane :label="t('element')" name="element" lazy>
                    <div v-if="iconList.element.length" class="grid grid-cols-5 grid-rows-[repeat(auto-fill,66px)] gap-[8px_12px]">
                        <template v-for="icon in iconList.element" :key="icon">
                            <div class="icon-box">
                                <div>
                                    <Icon :icon size="26" />
                                    <span>{{ icon }}</span>
                                </div>
                                <el-link class="link" type="primary" :underline="false" @click="onCopy(icon)">copy</el-link>
                            </div>
                        </template>
                    </div>
                    <el-empty v-else />
                </el-tab-pane>
                <el-tab-pane :label="t('local')" name="local" lazy>
                    <div v-if="iconList.local.length" class="grid grid-cols-5 grid-rows-[repeat(auto-fill,66px)] gap-[8px_12px]">
                        <template v-for="icon in iconList.local" :key="icon">
                            <div class="icon-box">
                                <div>
                                    <Icon :icon size="26" />
                                    <span>{{ icon }}</span>
                                </div>
                                <el-link class="link" type="primary" :underline="false" @click="onCopy(icon)">copy</el-link>
                            </div>
                        </template>
                    </div>
                    <el-empty v-else />
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<style lang="scss" scoped>
.icons {
    .icon-box {
        padding: 20px 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid var(--border-light-color);
        transition: color var(--el-transition-duration), background-color var(--el-transition-duration);
        will-change: background-color, color;
        border-radius: 3px;
        &:hover {
            box-shadow: var(--el-box-shadow-light);
            .link {
                display: inline-block;
            }
        }
        &:nth-child(odd) {
            background-color: rgb(250, 250, 252);
        }
        @include when-dark {
            border-color: var(--border-dark-color);
            &:nth-child(odd) {
                background-color: transparent;
            }
        }
        &>div {
            display: flex;
            align-items: center;
            gap: 10px;
            &>span {
                font-size: 12px;
            }
        }
        .link {
            display: none;
        }
    }
}
</style>

<i18n lang="yaml">
zh:
  icon-title: 图标选择器
  element: Element Plus 图标
  local: 本地图标
  icon-name: 图标名称
  choose: 选中查看图标
en:
  icon-title: Icon Selector
  element: Element Plus Icons
  local: Local Icons
  icon-name: Icon name
  choose: Select the View icon.
</i18n>