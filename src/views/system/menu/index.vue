<script setup lang="tsx">
import type { MenuItem } from "#/menu";
import { getMenuTree } from "@/api/system/menu";
import MenuForm from "./components/MenuForm.vue";

defineOptions({
    name: "Menu",
});

const queryForm = ref({
    title: "",
    status: "",
});

const { data, loading, query } = useRequest<MenuItem[]>({
    request: getMenuTree,
    default: [],
    immediate: true,
});

const dialog = useDialog(MenuForm, {
    title: data => data?.form?.id ? "编辑菜单" : "新增菜单",
    width: 600,
    onSubmit: onSearch,
});

const columns = defineColumns<MenuItem>([{
    type: "selection",
}, {
    type: "index",
    label: "序号",
}, {
    label: "菜单名称",
    prop: "title",
    align: "left",
}, {
    label: "类型",
    prop: "type",
    slotName: "type",
}, {
    label: "图标",
    prop: "icon",
    slotName: "icon",
}, {
    label: "权限标识",
    prop: "permission",
}, {
    label: "访问路径",
    prop: "path",
}, {
    label: "组件路径",
    prop: "component",
}, {
    label: "状态",
    prop: "status",
    slotName: "status",
}, {
    label: "操作",
    width: 180,
    fixed: "right",
    slotName: "operate",
}], {
    align: "center",
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
            <base-table
                :columns="columns"
                :loading="loading"
                :data="data"
                row-key="id"
                border
                size="large"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            >
                <template #action>
                    <el-button type="primary" icon="ElePlus" @click="dialog.open">新增</el-button>
                </template>
                <template #icon="{ row }">
                    <Icon v-if="row.icon" :icon="row.icon" size="25" />
                </template>
                <template #type="{ row }">
                    <el-tag v-if="row.type === 0">目录</el-tag>
                    <el-tag v-else-if="row.type === 1" type="success">菜单</el-tag>
                    <el-tag v-else-if="row.type === 2" type="warning">链接</el-tag>
                    <el-tag v-else-if="row.type === 3" type="info">按钮</el-tag>
                </template>
                <template #status="{ row }">
                    <el-tag :type="row.status == 0 ? 'danger' : 'primary'">{{ row.status == 0 ? '禁用' : '启用' }}</el-tag>
                </template>
                <template #operate="{ row }">
                    <table-action @click="dialog.open(row)" />
                </template>
            </base-table>
        </table-layout>
    </div>
</template>
