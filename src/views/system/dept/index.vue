<script setup lang="tsx">
import type { Dept } from "#/system";
import { getDeptTree, deptDelete } from "@/api/system/dept";
import DeptForm from "./components/DeptForm.vue";
import type { TableActionItem } from "@/components/GlobalRegister/Table";

defineOptions({
    name: "Dept",
});

const { t, $t, ti, $ts } = useLocal();

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
    title: data => $t(`${data?.id ? "button.edit" : "button.add"}`) + t("dept"),
    width: 500,
    onSubmit: onSearch,
});

const columns = defineColumns<Dept>([{
    type: "index",
    label: () => $t("index"),
}, {
    label: () => t("deptName"),
    prop: "name",
    align: "left",
}, {
    label: () => t("leader"),
    prop: "leader.nickName",
}, {
    label: () => t("phone"),
    prop: "leader.phone",
}, {
    label: () => t("email"),
    prop: "leader.email",
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
                <el-form-item prop="name" :label="t('deptName')">
                    <el-input v-model="queryForm.name" :placeholder="ti('deptName')" clearable />
                </el-form-item>
                <el-form-item prop="status" :label="$t('status.name')">
                    <el-select v-model="queryForm.status" :placeholder="$ts('status.name')" clearable>
                        <el-option value="1" :label="$t('status.enable')" />
                        <el-option value="0" :label="$t('status.disable')" />
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
                    <el-button type="warning" :icon="defaultExpandAll ? 'EleArrowDown' : 'EleArrowRight'" @click="onExpand">{{ $t("button.ExpandCollapse") }}</el-button>
                </template>
                <template #operate="{ row }">
                    <table-action :actions="{action: 'add', icon: 'ElePlus', append: 'before', type: 'primary'}" @click="onTaleActionClick($event, row)" />
                </template>
            </base-table>
        </table-layout>
    </div>
</template>

<i18n lang="yaml">
zh:
  dept: 部门
  deptName: 部门名称
  leader: 部门负责人
  phone: 联系电话
  email: 邮箱
en:
  dept: dept
  deptName: deptName
  leader: leader
  phone: phone
  email: email
</i18n>