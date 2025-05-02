<script setup lang="tsx">
import type { Dept } from "#/system";
import { getDeptTree, deptDelete } from "@/api/system/dept";
import DeptForm from "./components/DeptForm.vue";
import type { TableActionItem } from "@/components/GlobalRegister/Table";

defineOptions({
    name: "Dept",
});

const queryForm = ref({
    name: "",
    status: "",
});

const showTable = ref(true);
const defaultExpandAll = ref(false);

const { data, loading, query } = useRequest<Dept[]>({
    request: getDeptTree,
    default: [],
    immediate: true,
});

const { onDelete } = useDataDelete({
    request: deptDelete,
    onSuccess: onSearch,
});

const dialog = useDialog<Dept>({
    component: DeptForm,
    title: data => data?.id ? "编辑部门" : "新增部门",
    width: 500,
    onSubmit: onSearch,
});

const columns = defineColumns<Dept>([{
    type: "index",
    label: "序号",
}, {
    label: "部门名称",
    prop: "name",
    align: "left",
}, {
    label: "部门负责人",
    prop: "leaderName",
}, {
    label: "联系电话",
    prop: "phone",
}, {
    label: "邮箱",
    prop: "email",
}, {
    label: "状态",
    prop: "status",
    dictType: "status",
}, {
    label: "更新人",
    prop: "updateBy",
}, {
    label: "更新时间",
    prop: "updatedAt",
}, {
    label: "操作",
    width: 120,
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

function onTaleActionClick(item: TableActionItem, row: Dept) {
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
                <el-form-item prop="name" label="部门名称">
                    <el-input v-model="queryForm.name" placeholder="请输入部门名称" clearable />
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
                <template #operate="{ row }">
                    <table-action :actions="{action: 'add', icon: 'ElePlus', append: 'before', type: 'primary'}" @click="onTaleActionClick($event, row)" />
                </template>
            </base-table>
        </table-layout>
    </div>
</template>