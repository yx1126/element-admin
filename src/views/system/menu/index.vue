<script setup lang="ts">
import type { MenuItem } from "#/menu";
import { getMenuTree } from "@/api/system/menu";

defineOptions({
    name: "Menu",
});

const queryForm = ref({
    title: "",
    status: "",
});

const { data, loading, query } = useRequest<MenuItem[]>({
    request: getMenuTree,
    default: [],
    immediate: true,
});

function onSearch() {
    query(queryForm.value);
}
</script>

<template>
    <div class="menu">
        <table-layout :model="queryForm" @search="onSearch">
            <template #form>
                <el-form-item prop="title" label="菜单名称">
                    <el-input v-model="queryForm.title" placeholder="请输入菜单名称" clearable />
                </el-form-item>
            </template>
            <el-table v-loading="loading" :data="data" border>
                <el-table-column label="菜单名称" prop="title" />
            </el-table>
        </table-layout>
    </div>
</template>
