<script setup lang="ts">
import { getUserList, userDelete, userResetPwd } from "@/api/system/user";
import { getDeptSelectTree } from "@/api/system/dept";
import UserForm from "./components/UserForm.vue";
import type { UserInfo } from "#/system";

defineOptions({
    name: "User",
});

const message = useMessage();
const msgbox = useMessageBox();

const { data: deptTreeList } = useRequest({
    request: getDeptSelectTree,
    default: [],
    immediate: true,
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
        userName: "",
        nickName: "",
        deptId: "",
        status: "",
    }),
});

const dialog = useDialog({
    component: UserForm,
    title: data => `${data?.id ? "编辑" : "新增"}用户`,
    width: 500,
    onSubmit: onSearch,
    destroyOnClose: false,
});

const columns = defineColumns<UserInfo>([{
    type: "selection",
    selectable: row => row?.id !== 1,
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
    prop: "deptName",
}, {
    label: "状态",
    prop: "status",
    dictType: "status",
}, {
    label: "备注",
    prop: "remark",
}, {
    label: "创建时间",
    prop: "createdAt",
}, {
    label: "操作",
    width: 120,
    slotName: "operate",
}]);

function onResetPwd(row: UserInfo) {
    msgbox.confirm(`确定要重置用户“${row.userName}”的密码吗？`).then(() => {
        userResetPwd(row.id!).then(() => {
            message.success("重置成功");
        });
    });
}
</script>

<template>
    <div class="user layout-page">
        <table-layout :model="queryForm" @search="onSearch">
            <template #form>
                <el-form-item prop="userName" label="用户名">
                    <el-input v-model="queryForm.userName" placeholder="请输入用户名" clearable />
                </el-form-item>
                <el-form-item prop="nickName" label="用户昵称">
                    <el-input v-model="queryForm.nickName" placeholder="请输入用户昵称" clearable />
                </el-form-item>
                <el-form-item prop="deptId" label="部门">
                    <el-tree-select
                        v-model="queryForm.deptId"
                        :data="deptTreeList"
                        value-key="id"
                        check-strictly
                        filterable
                        clearable
                        placeholder="请选择部门"
                        :props="{ label: 'name' }"
                    />
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
                    <el-button type="danger" icon="EleDelete" @click="onDelete()">{{ $t("button.deletes") }}</el-button>
                </template>
                <template #operate="{ row }">
                    <table-action>
                        <el-link type="primary" icon="EleRefresh" @click="onResetPwd(row)" />
                        <el-link type="primary" icon="EleEdit" @click="dialog.open(row)" />
                        <el-link v-if="row.id !== 1" type="danger" icon="EleDelete" @click="onDelete(row.id)" />
                    </table-action>
                </template>
            </base-table>
            <pagination class="mt-10px" v-bind="paging" />
        </table-layout>
    </div>
</template>