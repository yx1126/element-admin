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
const { t, $t, ti, ts, $ts } = useLocal();

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
    onReset,
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
    title: data => $t(`${data?.id ? "button.edit" : "button.add"}`) + t("user"),
    width: 500,
    onSubmit: onSearch,
    destroyOnClose: false,
});

const columns = defineColumns<UserInfo>([{
    type: "selection",
    selectable: row => row?.id !== 1,
}, {
    type: "index",
    label: () => $t("index"),
}, {
    label: () => t("username"),
    prop: "userName",
}, {
    label: () => t("nickname"),
    prop: "nickName",
}, {
    label: () => t("phone"),
    prop: "phone",
}, {
    label: () => t("dept"),
    prop: "deptName",
}, {
    label: () => $t("status.name"),
    prop: "status",
    dictType: "status",
}, {
    label: () => $t("remark"),
    prop: "remark",
}, {
    label: () => $t("createdAt"),
    prop: "createdAt",
}, {
    label: () => $t("operate"),
    width: 120,
    slotName: "operate",
}]);

function onResetPwd(row: UserInfo) {
    msgbox.confirm(t("reset", [row.userName])).then(() => {
        userResetPwd(row.id!).then(() => {
            message.success(t("resetSuccess"));
        });
    });
}
</script>

<template>
    <div class="user layout-page">
        <table-layout :model="queryForm" @search="onSearch" @reset="onReset">
            <template #form>
                <el-form-item prop="userName" :label="t('username')">
                    <el-input v-model="queryForm.userName" :placeholder="ti('username')" clearable />
                </el-form-item>
                <el-form-item prop="nickName" :label="t('nickname')">
                    <el-input v-model="queryForm.nickName" :placeholder="ti('nickname')" clearable />
                </el-form-item>
                <el-form-item prop="deptId" :label="t('dept')">
                    <el-tree-select
                        v-model="queryForm.deptId"
                        :data="deptTreeList"
                        value-key="id"
                        check-strictly
                        filterable
                        clearable
                        :placeholder="ts('dept')"
                        :props="{ label: 'name' }"
                    />
                </el-form-item>
                <el-form-item prop="status" :label="$t('status.name')">
                    <el-select v-model="queryForm.status" :placeholder="$ts('status.name')" clearable>
                        <el-option value="1" :label="$t('status.enable')" />
                        <el-option value="0" :label="$t('status.disable')" />
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

<i18n lang="yaml">
zh:
  user: 用户
  username: 用户名
  nickname: 用户昵称
  dept: 部门
  phone: 手机号
  reset: 确定要重置用户“{0}”的密码吗？
  resetSuccess: 重置成功
en:
  user: User
  username: username
  nickname: nickname
  dept: dept
  phone: phone
  reset: Are you sure you want to reset the password of the user "{0}"?
  resetSuccess: Reset successful
</i18n>