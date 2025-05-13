<script setup lang="ts">
import { getPostList, postDelete } from "@/api/system/post";
import PostForm from "./components/PostForm.vue";
import type { Post } from "#/system";

defineOptions({
    name: "Post",
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
    title: data => `${data?.id ? "编辑" : "新增"}岗位`,
    width: 500,
    onSubmit: onSearch,
    destroyOnClose: false,
});

const columns = defineColumns<Post>([{
    type: "selection",
}, {
    type: "index",
    label: "序号",
}, {
    label: "岗位名称",
    prop: "name",
}, {
    label: "岗位编号",
    prop: "code",
}, {
    label: "排序",
    prop: "sort",
}, {
    label: "状态",
    prop: "status",
    dictType: "status",
}, {
    label: "备注",
    prop: "remark",
}, {
    label: "创建人",
    prop: "createdBy",
}, {
    label: "创建时间",
    prop: "createdAt",
}, {
    label: "操作",
    width: 120,
    slotName: "operate",
}]);
</script>

<template>
    <div class="user layout-page">
        <table-layout :model="queryForm" @search="onSearch" @reset="onReset">
            <template #form>
                <el-form-item prop="name" label="岗位名称">
                    <el-input v-model="queryForm.name" placeholder="请输入岗位名称" clearable />
                </el-form-item>
                <el-form-item prop="code" label="岗位编号">
                    <el-input v-model="queryForm.code" placeholder="请输入岗位编号" clearable />
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
                    <table-action @edit="dialog.open(row)" @delete="onDelete(row.id)" />
                </template>
            </base-table>
            <pagination class="mt-10px" v-bind="paging" />
        </table-layout>
    </div>
</template>