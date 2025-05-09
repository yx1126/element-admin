<script setup lang="ts">
import { getRoleInfo, roleCreate, roleUpdate } from "@/api/system/role";
import { getMenuAllTree } from "@/api/system/menu";
import type { Role, MenuItem } from "#/system";

defineOptions({
    name: "RoleForm",
});

const { data: menuTreeList, queryOnce: onQueryMenuList } = useRequest({
    request: getMenuAllTree,
    default: [],
});

const {
    form,
    formRef,
    formLoading,
    resetFields,
    queryInfo,
    onSubmit,
} = useFormRequest<Role>({
    request: {
        info: getRoleInfo,
        add: roleCreate,
        edit: roleUpdate,
    },
    form: () => ({
        id: undefined,
        name: undefined,
        key: undefined,
        menuIds: [],
        sort: 0,
        status: "1",
    }),
});

const menuIds = computed(() => getTreeIds(menuTreeList.value));

const isCheckedAll = computed(() => {
    return menuIds.value.length > 0 && form.value.menuIds.length === menuIds.value.length;
});

const indeterminate = computed(() => {
    const formMenus = form.value.menuIds.length;
    return formMenus > 0 && formMenus < menuIds.value.length;
});

const rules = defineFormRules<Role>({
    name: Require("请输入角色名称"),
    key: Require("请输入角色标识"),
});

onDialogOpen(data => {
    onQueryMenuList();
    if(data) {
        queryInfo(data.id);
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

function getTreeIds(tree: MenuItem[]) {
    return tree.reduce<number[]>((pre, item) => {
        pre.push(item.id!, ...getTreeIds(item?.children || []));
        return pre;
    }, []);
}

function onCheckedChange() {
    if(isCheckedAll.value) {
        form.value.menuIds = [];
    } else {
        form.value.menuIds = menuIds.value;
    }
}
</script>

<template>
    <el-form ref="formRef" v-loading="formLoading" :rules="rules" :model="form" label-width="90px">
        <el-form-item prop="name" label="角色名称">
            <el-input v-model="form.name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item prop="key" label="角色标识">
            <el-input v-model="form.key" placeholder="请输入角色标识" />
        </el-form-item>
        <el-form-item prop="menuIds" label="上级菜单">
            <el-tree-select
                v-model="form.menuIds"
                :data="menuTreeList"
                value-key="id"
                check-strictly
                filterable
                multiple
                collapse-tags
                show-checkbox
                clearable
                :default-expanded-keys="form.menuIds || []"
                placeholder="请选择菜单权限"
                :props="{ label: 'title' }"
            >
                <template #header>
                    <el-checkbox :model-value="isCheckedAll" :indeterminate @change="onCheckedChange">{{ $t("checked.select-all") }}</el-checkbox>
                </template>
            </el-tree-select>
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