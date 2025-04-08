<script setup lang="ts">
import type { MenuItem } from "#/menu";
import { getMenuTree } from "@/api/system/menu";

defineOptions({
    name: "Menu",
});

const queryForm = ref({
    title: "",
    status: "",
});

const columns = defineColumns<MenuItem>([{
    type: "index",
    label: "序号",
    width: 80,
}, {
    label: "菜单名称",
    prop: "title",
    align: "left",
}, {
    label: "图标",
    prop: "icon",
    slotName: "icon",
}, {
    label: "访问路径",
    prop: "path",
}, {
    label: "组件路径",
    prop: "component",
}, {
    label: "操作",
    width: 180,
    fixed: "right",
}], {
    align: "center",
});

const { data, loading, query } = useRequest<MenuItem[]>({
    request: getMenuTree,
    default: [],
    immediate: true,
});

function onSearch() {
    query(queryForm.value);
}
</script>

<template>
    <div class="menu">
        <table-layout :model="queryForm" @search="onSearch">
            <template #form>
                <el-form-item prop="title" label="菜单名称">
                    <el-input v-model="queryForm.title" placeholder="请输入菜单名称" clearable />
                </el-form-item>
            </template>
            <base-table :columns="columns" :loading="loading" :data="data" row-key="id" border size="large" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
                <template #icon="{row}">
                    <Icon v-if="row.icon" :icon="row.icon" size="25" />
                </template>
            </base-table>
        </table-layout>
    </div>
</template>
