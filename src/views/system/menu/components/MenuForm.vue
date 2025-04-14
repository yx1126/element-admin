<script setup lang="ts">
import type { MenuItem } from "#/menu";
import { getMenuSelectTree } from "@/api/system/menu";

defineOptions({
    name: "MenuForm",
});

const { t } = useI18n();
const formRef = useTemplateRef("formRef");

const { data: treeData, query } = useRequest({
    request: getMenuSelectTree,
    default: [],
});

const form = ref<Partial<MenuItem>>({
    id: undefined,
    name: undefined,
    title: undefined,
});

onDialogOpen(data => {
    query();
    form.value = { ...data };
});

onDialogClosed(() => {
    formRef.value?.resetFields();
});

onDialogSubmit(close => {
    close();
});
</script>

<template>
    <el-form ref="formRef" :model="form">
        <el-form-item prop="name" :label="t('lastMneu')">
            <el-tree-select
                v-model="form.parentId"
                :data="treeData"
                value-key="id"
                check-strictly
                :placeholder="$t('select', [t('lastMneu')])"
                :props="{ label: 'title' }"
            />
        </el-form-item>
    </el-form>
</template>

<i18n lang="yaml">
zh:
  lastMneu: 上级菜单
en:
  lastMneu: Previous menu
</i18n>