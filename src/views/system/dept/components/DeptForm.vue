<script setup lang="ts">
import { getDeptSelectTree, deptCreate, deptUpdate } from "@/api/system/dept";
import { getUserAllList } from "@/api/system/user";
import type { Dept } from "#/system";

defineOptions({
    name: "DeptForm",
});

const { data: treeData, query } = useRequest({
    request: getDeptSelectTree,
    default: [],
    formatter: data => {
        return [{
            id: 0,
            name: "顶级部门",
            children: data,
        }];
    },
});

const { data: userList, query: onQueryUserList } = useRequest({
    request: getUserAllList,
    default: [],
});

const {
    form,
    formRef,
    resetFields,
    queryInfoByLocal,
    onSubmit,
} = useFormRequest<Dept>({
    request: {
        add: deptCreate,
        edit: deptUpdate,
    },
    form: () => ({
        id: undefined,
        parentId: 0,
        name: undefined,
        leaderId: undefined,
        email: undefined,
        phone: undefined,
        sort: 0,
        status: "1",
    }),
});

const rules = defineFormRules({
    name: Require("请输入部门名称"),
});

onDialogOpen(data => {
    query();
    onQueryUserList();
    if(data) {
        queryInfoByLocal({ ...form.value, ...data });
    }
});

onDialogClosed(() => {
    resetFields();
});

onDialogSubmit(async (instance, close) => {
    try {
        instance.loading = true;
        await onSubmit();
        close();
    } finally {
        instance.loading = false;
    }
});
</script>

<template>
    <el-form ref="formRef" :rules="rules" :model="form" label-width="90px">
        <el-form-item prop="parentId" label="上级菜单">
            <el-tree-select
                v-model="form.parentId"
                :data="treeData"
                value-key="id"
                check-strictly
                filterable
                :default-expanded-keys="[form.parentId]"
                placeholder="请选择上级菜单"
                :props="{ label: 'name' }"
            />
        </el-form-item>
        <el-form-item prop="name" label="部门名称">
            <el-input v-model="form.name" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item prop="leaderId" label="部门负责人">
            <el-select
                v-model="form.leaderId"
                :data="treeData"
                clearable
                filterable
                placeholder="请选择部门负责人"
            >
                <template v-for="item in userList" :key="item.id">
                    <el-option :value="item.id!" :label="item.userName">
                        <span class="float-left">{{ item.userName }}</span>
                        <span class="float-right text-13px text-[var(--el-text-color-secondary)]">
                            {{ item.nickName }}
                        </span>
                    </el-option>
                </template>
            </el-select>
        </el-form-item>
        <el-form-item prop="sort" label="排序">
            <el-input-number v-model="form.sort" placeholder="请输入排序" />
        </el-form-item>
        <el-form-item prop="status" label="状态">
            <el-radio-group v-model="form.status">
                <el-radio value="1">启用</el-radio>
                <el-radio value="0">禁用</el-radio>
            </el-radio-group>
        </el-form-item>
    </el-form>
</template>