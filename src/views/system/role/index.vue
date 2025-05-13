<script setup lang="tsx">
import type { Role } from "#/system";
import { getRoleList, roleDelete } from "@/api/system/role";
import DeptForm from "./components/RoleForm.vue";

defineOptions({
    name: "Role",
});

const {
    query: queryForm,
    data,
    tableAttrs,
    paging,
    onSearch,
    onReset,
    onDelete,
} = useTable({
    request: getRoleList,
    deleteRequest: roleDelete,
    query: () => ({
        name: "",
        key: "",
        status: "",
    }),
});

const dialog = useDialog<Role>({
    component: DeptForm,
    title: data => `${data?.id ? "编辑" : "新增"}部门`,
    width: 500,
    onSubmit: onSearch,
});

const columns = defineColumns<Role>([{
    type: "index",
    label: "序号",
}, {
    label: "角色名称",
    prop: "name",
}, {
    label: "角色标识",
    prop: "key",
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
</script>

<template>
    <div class="menu layout-page">
        <table-layout :model="queryForm" @search="onSearch" @reset="onReset">
            <template #form>
                <el-form-item prop="name" label="角色名称">
                    <el-input v-model="queryForm.name" placeholder="请输入角色名称" clearable />
                </el-form-item>
                <el-form-item prop="key" label="角色标识">
                    <el-input v-model="queryForm.key" placeholder="请输入角色标识" clearable />
                </el-form-item>
                <el-form-item prop="status" label="状态">
                    <el-select v-model="queryForm.status" placeholder="请选择状态" clearable>
                        <el-option value="1" label="启用" />
                        <el-option value="0" label="禁用" />
                    </el-select>
                </el-form-item>
            </template>
            <base-table
                :columns="columns"
                :data="data"
                v-bind="tableAttrs"
                @refresh="onSearch"
            >
                <template #action>
                    <el-button type="primary" icon="ElePlus" @click="dialog.open()">{{ $t("button.add") }}</el-button>
                </template>
                <template #operate="{ row }">
                    <table-action @edit="dialog.open(row)" @delete="onDelete(row.id)" />
                </template>
            </base-table>
            <pagination class="mt-10px" v-bind="paging" />
        </table-layout>
    </div>
</template>