<script setup lang="ts">
import { getPostList, postDelete } from "@/api/system/post";
import PostForm from "./components/PostForm.vue";
import type { Post } from "#/system";

defineOptions({
    name: "Post",
});

const { t, ti, $t, $ts } = useLocal();

const {
    query: queryForm,
    data,
    tableAttrs,
    paging,
    onSearch,
    onReset,
    onDelete,
} = useTable({
    request: getPostList,
    deleteRequest: postDelete,
    query: () => ({
        name: "",
        code: "",
        status: "",
    }),
});

const dialog = useDialog({
    component: PostForm,
    title: data => $t(`${data?.id ? "button.edit" : "button.add"}`) + t("post"),
    width: 500,
    onSubmit: onSearch,
    destroyOnClose: false,
});

const columns = defineColumns<Post>([{
    type: "selection",
}, {
    type: "index",
    label: () => $t("index"),
}, {
    label: () => t("postName"),
    prop: "name",
}, {
    label: () => t("code"),
    prop: "code",
}, {
    label: () => t("sort"),
    prop: "sort",
}, {
    label: () => $t("status.name"),
    prop: "status",
    dictType: "status",
}, {
    label: () => $t("remark"),
    prop: "remark",
}, {
    label: () => $t("createdBy"),
    prop: "createdBy",
}, {
    label: () => $t("createdAt"),
    prop: "createdAt",
}, {
    label: () => $t("operate"),
    width: 120,
    slotName: "operate",
}]);
</script>

<template>
    <div class="user layout-page">
        <table-layout :model="queryForm" @search="onSearch" @reset="onReset">
            <template #form>
                <el-form-item prop="name" :label="t('postName')">
                    <el-input v-model="queryForm.name" :placeholder="ti('postName')" clearable />
                </el-form-item>
                <el-form-item prop="code" :label="t('code')">
                    <el-input v-model="queryForm.code" :placeholder="ti('code')" clearable />
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
                    <el-button v-auth="['system:post:add']" type="primary" icon="ElePlus" @click="dialog.open()">{{ $t("button.add") }}</el-button>
                    <el-button v-auth="['system:post:del']" type="danger" icon="EleDelete" @click="onDelete()">{{ $t("button.deletes") }}</el-button>
                </template>
                <template #operate="{ row }">
                    <table-action>
                        <el-link v-auth="['system:post:edit']" icon="EleEdit" type="primary" @click="dialog.open(row)" />
                        <el-link v-auth="['system:post:del']" icon="EleDelete" type="danger" @click="onDelete(row.id)" />
                    </table-action>
                </template>
            </base-table>
            <pagination class="mt-10px" v-bind="paging" />
        </table-layout>
    </div>
</template>

<i18n lang="yaml">
zh:
  post: 岗位
  postName: 岗位名称
  code: 岗位编号
  sort: 排序
en:
  post: post
  postName: postName
  code: code
  sort: sort
</i18n>