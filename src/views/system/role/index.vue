<script setup lang="tsx">
import type { Role } from "#/system";
import { getRoleList, roleDelete } from "@/api/system/role";
import DeptForm from "./components/RoleForm.vue";

defineOptions({
    name: "Role",
});

const { t, $t, ti, $ts } = useLocal();

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
    title: data => $t(`${data?.id ? "button.edit" : "button.add"}`) + t("role"),
    width: 500,
    onSubmit: onSearch,
});

const columns = defineColumns<Role>([{
    type: "index",
    label: () => $t("index"),
}, {
    label: () => t("roleName"),
    prop: "name",
}, {
    label: () => t("roleKey"),
    prop: "key",
}, {
    label: () => $t("status.name"),
    prop: "status",
    dictType: "status",
}, {
    label: () => $t("updatedBy"),
    prop: "updatedBy",
}, {
    label: () => $t("updatedAt"),
    prop: "updatedAt",
}, {
    label: () => $t("operate"),
    width: 120,
    slotName: "operate",
}]);
</script>

<template>
    <div class="menu layout-page">
        <table-layout :model="queryForm" @search="onSearch" @reset="onReset">
            <template #form>
                <el-form-item prop="name" :label="t('roleName')">
                    <el-input v-model="queryForm.name" :placeholder="ti('roleName')" clearable />
                </el-form-item>
                <el-form-item prop="key" :label="t('roleKey')">
                    <el-input v-model="queryForm.key" :placeholder="ti('roleKey')" clearable />
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
                </template>
                <template #operate="{ row }">
                    <table-action @edit="dialog.open(row)" @delete="onDelete(row.id)" />
                </template>
            </base-table>
            <pagination class="mt-10px" v-bind="paging" />
        </table-layout>
    </div>
</template>

<i18n lang="yaml">
zh:
  role: 角色
  roleName: 角色名称
  roleKey: 角色标识
  updateBy: 更新人
en:
  role: role
  roleName: roleName
  roleKey: roleKey
  updateBy: updateBy
</i18n>