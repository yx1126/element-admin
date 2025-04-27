<script setup lang="tsx">
import type { MenuItem } from "#/menu";
import { getMenuTree, menuDelete } from "@/api/system/menu";
import MenuForm from "./components/MenuForm.vue";
import type { TableActionItem } from "@/components/GlobalRegister/Table";

defineOptions({
    name: "Menu",
});

const queryForm = ref({
    title: "",
    status: "",
});

const showTable = ref(true);
const defaultExpandAll = ref(false);

const { data, loading, query } = useRequest<MenuItem[]>({
    request: getMenuTree,
    default: [],
    immediate: true,
});

const { onDelete } = useDataDelete({
    request: menuDelete,
    onSuccess: onSearch,
});

const dialog = useDialog<MenuItem>({
    component: MenuForm,
    title: data => data?.id ? "编辑菜单" : "新增菜单",
    width: 600,
    onSubmit: onSearch,
});

const columns = defineColumns<MenuItem>([{
    type: "index",
    label: "序号",
}, {
    label: "菜单名称",
    prop: "title",
    align: "left",
}, {
    label: "组件名称",
    prop: "name",
}, {
    label: "类型",
    prop: "type",
    slotName: "type",
    width: 100,
}, {
    label: "图标",
    prop: "icon",
    slotName: "icon",
    width: 80,
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
    label: "排序",
    prop: "sort",
    width: 80,
}, {
    label: "显示/隐藏",
    prop: "visible",
    slotName: "visible",
    width: 100,
}, {
    label: "状态",
    prop: "status",
    slotName: "status",
    width: 80,
}, {
    label: "更新人",
    prop: "updateBy",
}, {
    label: "更新时间",
    prop: "updatedAt",
    width: 180,
}, {
    label: "操作",
    width: 120,
    fixed: "right",
    slotName: "operate",
}]);

function onSearch() {
    query(queryForm.value);
}

function onExpand() {
    showTable.value = false;
    defaultExpandAll.value = !defaultExpandAll.value;
    nextTick(() => {
        showTable.value = true;
    });
}

function onTaleActionClick(item: TableActionItem, row: MenuItem) {
    if(item.action === "add") {
        dialog.open({ parentId: row.id });
    } else if(item.action === "edit") {
        dialog.open(row);
    } else if(item.action === "delete") {
        if(!row.id) return;
        onDelete(row.id);
    }
}
</script>

<template>
    <div class="menu layout-page">
        <table-layout :model="queryForm" @search="onSearch">
            <template #form>
                <el-form-item prop="title" label="菜单名称">
                    <el-input v-model="queryForm.title" placeholder="请输入菜单名称" clearable />
                </el-form-item>
                <el-form-item prop="status" label="状态">
                    <el-select v-model="queryForm.status" placeholder="请选择状态" clearable>
                        <el-option value="0" label="禁用" />
                        <el-option value="1" label="启用" />
                    </el-select>
                </el-form-item>
            </template>
            <base-table
                v-if="showTable"
                :columns="columns"
                :loading="loading"
                :data="data"
                row-key="id"
                border
                size="large"
                :default-expand-all
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                @refresh="onSearch"
            >
                <template #action>
                    <el-button type="primary" icon="ElePlus" @click="dialog.open()">{{ $t("button.add") }}</el-button>
                    <el-button type="warning" :icon="defaultExpandAll ? 'EleArrowDown' : 'EleArrowRight'" @click="onExpand">展开/折叠</el-button>
                </template>
                <template #icon="{ row }">
                    <Icon v-if="row.icon" :icon="row.icon" size="20" />
                </template>
                <template #type="{ row }">
                    <DictLabel :value="row.type" type="menu_type" />
                </template>
                <template #visible="{ row }">
                    <el-tag v-if="row.visible == 1">显示</el-tag>
                    <el-tag v-else type="danger">隐藏</el-tag>
                </template>
                <template #status="{ row }">
                    <el-tag :type="row.status == 0 ? 'danger' : 'primary'">{{ row.status == 0 ? '禁用' : '启用' }}</el-tag>
                </template>
                <template #operate="{ row }">
                    <table-action :actions="{action: 'add', icon: 'ElePlus', append: 'before', type: 'primary'}" @click="onTaleActionClick($event, row)" />
                </template>
            </base-table>
        </table-layout>
    </div>
</template>