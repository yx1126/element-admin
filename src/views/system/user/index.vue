<script setup lang="ts">
import { getUserList, userDelete } from "@/api/system/user";
import type { UserInfo } from "#/system";
import type { TableActionItem } from "@/components/GlobalRegister/Table";
import UserForm from "./components/UserForm.vue";

defineOptions({
    name: "User",
});

const {
    query: queryForm,
    data,
    tableAttrs,
    paging,
    onSearch,
    onDelete,
} = useTable({
    request: getUserList,
    deleteRequest: userDelete,
    query: () => ({
        userName: undefined,
        nickName: undefined,
        deptId: undefined,
        status: undefined,
    }),
});

const dialog = useDialog({
    component: UserForm,
    title: data => `${data?.id ? "编辑" : "新增"}用户`,
    width: 500,
});

const columns = defineColumns([{
    type: "selection",
}, {
    type: "index",
    label: "序号",
}, {
    label: "用户名",
    prop: "userName",
}, {
    label: "用户昵称",
    prop: "nickName",
}, {
    label: "手机号",
    prop: "phone",
}, {
    label: "所属部门",
    prop: "depeName",
}, {
    label: "状态",
    prop: "status",
    dictType: "status",
}, {
    label: "创建时间",
    prop: "createdAt",
    width: defineColumns.dateTime,
}, {
    label: "操作",
    width: 120,
    slotName: "operate",
}]);

function onTaleActionClick(item: TableActionItem, row: UserInfo) {
    if(item.action === "edit") {
        dialog.open(row);
    } else if(item.action === "delete") {
        if(!row.id) return;
        onDelete(row.id);
    }
}
</script>

<template>
    <div class="user layout-page">
        <table-layout :model="queryForm" @search="onSearch">
            <template #form>
                <el-form-item prop="title" label="用户名">
                    <el-input v-model="queryForm.title" placeholder="请输入用户名" clearable />
                </el-form-item>
                <el-form-item prop="status" label="状态">
                    <el-select v-model="queryForm.status" placeholder="请选择状态" clearable>
                        <el-option value="0" label="禁用" />
                        <el-option value="1" label="启用" />
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
                    <el-button type="danger" icon="EleDelete">{{ $t("button.deletes") }}</el-button>
                </template>
                <template #operate="{ row }">
                    <table-action @click="onTaleActionClick($event, row)" />
                </template>
            </base-table>
            <pagination class="mt-10px" v-bind="paging" />
        </table-layout>
    </div>
</template>