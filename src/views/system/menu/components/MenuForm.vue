<script setup lang="ts">
import type { MenuItem } from "#/menu";
import { getMenuSelectTree, menuCreate, menuUpdate } from "@/api/system/menu";
import IconSelect from "@/components/IconSelect";
import type { FormRules } from "element-plus";

defineOptions({
    name: "MenuForm",
});

const { t } = useI18n();
const { t: $t } = useI18n({ useScope: "global" });

const { data: treeData, query } = useRequest({
    request: getMenuSelectTree,
    default: [],
    formatter: data => {
        return [{
            id: 0,
            title: "顶级菜单",
            children: data,
        }];
    },
});

const {
    form,
    formRef,
    resetFields,
    clearValidate,
    loading,
    onSubmit,
} = useFormRequest<MenuItem>({
    request: {
        add: menuCreate,
        edit: menuUpdate,
    },
    form: () => ({
        id: undefined,
        title: undefined,
        icon: undefined,
        isCache: "0",
        isIframe: undefined,
        link: undefined,
        parentId: 0,
        name: undefined,
        type: 0,
        path: undefined,
        component: undefined,
        permission: undefined,
        sort: 0,
        visible: "1",
        status: "1",
    }),
});

const rules: FormRules = {
    path: Required("路由地址"),
    title: Required((_, value, cb) => {
        if(!value) {
            cb(new Error($t("input", [form.value.type === 3 ? "按钮名称" : "菜单名称"])));
        } else {
            cb();
        }
    }),
    name: Required("组件名称"),
    component: Required("组件路径"),
    link: Required("超链接"),
};

onDialogOpen(data => {
    query();
    if(data) {
        form.value = { ...form.value, ...data };
    }
});

onDialogClosed(() => {
    resetFields();
});

onDialogSubmit(async close => {
    await onSubmit();
    close();
});
</script>

<template>
    <el-form ref="formRef" v-loading="loading" :rules="rules" class="column-2" :model="form" label-width="80px">
        <el-form-item class="full" prop="parentId" :label="t('lastMneu')">
            <el-tree-select
                v-model="form.parentId"
                :data="treeData"
                value-key="id"
                check-strictly
                filterable
                :default-expanded-keys="[form.parentId]"
                :placeholder="$t('select', [t('lastMneu')])"
                :props="{ label: 'title' }"
            />
        </el-form-item>
        <el-form-item class="full" prop="type" label="菜单类型">
            <el-radio-group v-model="form.type" @change="clearValidate()">
                <el-radio :value="0">目录</el-radio>
                <el-radio :value="1">菜单</el-radio>
                <el-radio :value="2">链接</el-radio>
                <el-radio :value="3">按钮</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.type !== 3" prop="path" label="路由地址">
            <el-input v-model="form.path" placeholder="请输入路由地址" />
        </el-form-item>
        <el-form-item prop="title" :label="form.type === 3 ? '按钮名称' : '菜单名称'">
            <el-input v-model="form.title" :placeholder="`请输入${form.type === 3 ? '按钮名称' : '菜单名称'}`" />
        </el-form-item>
        <el-form-item v-if="form.type == 2" class="full" prop="link" label="超链接">
            <el-input v-model="form.link" type="textarea" :rows="3" placeholder="请输入超链接" />
        </el-form-item>
        <el-form-item v-if="form.type == 0 || form.type == 1" prop="name" label="组件名称">
            <el-input v-model="form.name" placeholder="请输入组件名称" />
        </el-form-item>
        <el-form-item v-if="form.type != 3" prop="icon" label="图标">
            <icon-select v-model="form.icon" clearable />
        </el-form-item>
        <el-form-item v-if="form.type == 1" class="full" prop="component" label="组件路径">
            <el-input v-model="form.component" placeholder="请输入组件路径" />
        </el-form-item>
        <el-form-item v-if="form.type != 0" prop="permission" label="权限">
            <el-input v-model="form.permission" placeholder="请输入权限" clearable />
        </el-form-item>
        <el-form-item prop="sort" label="排序">
            <el-input-number v-model="form.sort" placeholder="请输入排序" />
        </el-form-item>
        <el-form-item v-if="form.type != 3" prop="visible" label="显示/隐藏">
            <el-radio-group v-model="form.visible">
                <el-radio value="1">显示</el-radio>
                <el-radio value="0">隐藏</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.type == 2" prop="isCache" label="是否缓存">
            <el-radio-group v-model="form.isCache">
                <el-radio value="1">是</el-radio>
                <el-radio value="0">否</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.type != 3" prop="visible" label="启用/禁用">
            <el-radio-group v-model="form.status">
                <el-radio value="1">启用</el-radio>
                <el-radio value="0">禁用</el-radio>
            </el-radio-group>
        </el-form-item>
    </el-form>
</template>

<i18n lang="yaml">
zh:
  lastMneu: 上级菜单
en:
  lastMneu: Previous menu
</i18n>