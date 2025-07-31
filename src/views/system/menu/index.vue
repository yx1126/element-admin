<script setup lang="tsx">
import { getMenuTree, menuDelete } from "@/api/system/menu";
import MenuForm from "./components/MenuForm.vue";
import type { MenuItem } from "#/system";

defineOptions({
    name: "Menu",
});

const { t, $t, ti, $ts } = useLocal();
const { lang } = useLocales();

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
    title: data => $t(`${data?.id ? "button.edit" : "button.add"}`) + t("menu"),
    width: () => ["en"].includes(lang.value) ? 800 : 600,
    onSubmit: onSearch,
});

const columns = defineColumns<MenuItem>([{
    type: "index",
    label: () => $t("index"),
}, {
    label: () => t("menuName"),
    prop: "title",
    align: "left",
}, {
    label: () => t("componentName"),
    prop: "name",
}, {
    label: () => t("type"),
    prop: "type",
    width: 100,
    dictType: "menu_type",
}, {
    label: () => t("icon"),
    prop: "icon",
    slotName: "icon",
    width: 80,
}, {
    label: () => t("permission"),
    prop: "permission",
}, {
    label: () => t("path"),
    prop: "path",
}, {
    label: () => t("component"),
    prop: "component",
}, {
    label: () => t("sort"),
    prop: "sort",
    width: 80,
}, {
    label: () => t("visible"),
    prop: "visible",
    slotName: "visible",
    width: 100,
}, {
    label: () => $t("status.name"),
    prop: "status",
    width: 80,
    dictType: "status",
}, {
    label: () => $t("updatedBy"),
    prop: "updateBy",
}, {
    label: () => $t("updatedAt"),
    prop: "updatedAt",
    width: 180,
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
</script>

<template>
    <div class="menu layout-page">
        <table-layout :model="queryForm" @search="onSearch">
            <template #form>
                <el-form-item prop="title" :label="t('menuName')">
                    <el-input v-model="queryForm.title" :placeholder="ti('menuName')" clearable />
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
                    <el-button v-auth="['system:menu:add']" type="primary" icon="ElePlus" @click="dialog.open()">{{ $t("button.add") }}</el-button>
                    <el-button v-auth="['system:menu:del']" type="warning" :icon="defaultExpandAll ? 'EleArrowDown' : 'EleArrowRight'" @click="onExpand">{{ $t("button.ExpandCollapse") }}</el-button>
                </template>
                <template #icon="{ row }">
                    <Icon v-if="row.icon" :icon="row.icon" size="20" />
                </template>
                <template #visible="{ row }">
                    <el-tag v-if="row.visible == 1">显示</el-tag>
                    <el-tag v-else type="danger">隐藏</el-tag>
                </template>
                <template #operate="{ row }">
                    <table-action>
                        <el-link v-if="![2,3].includes(row.type)" v-auth="['system:menu:add']" type="primary" icon="ElePlus" @click="dialog.open({ parentId: row.id })" />
                        <el-link v-auth="['system:menu:edit']" icon="EleEdit" type="primary" @click="dialog.open(row)" />
                        <el-link v-auth="['system:menu:del']" icon="EleDelete" type="danger" @click="onDelete(row.id)" />
                    </table-action>
                </template>
            </base-table>
        </table-layout>
    </div>
</template>

<i18n lang="yaml">
zh:
  menu: 菜单
  menuName: 菜单名称
  componentName: 组件名称
  type: 类型
  icon: 图标
  permission: 权限标识
  path: 路由地址
  component: 组件路径
  sort: 排序
  visible: 显示/隐藏
en:
  menu: menu
  menuName: menu name
  componentName: componentName
  type: type
  icon: icon
  permission: permission
  path: path
  component: componentPath
  sort: sort
  visible: visible
</i18n>