<script setup lang="ts">
import { getMenuSelectTree, menuCreate, menuUpdate } from "@/api/system/menu";
import IconSelect from "@/components/IconSelect";
import { MenuType } from "@/enums/menu";
import type { MenuItem } from "#/system";

defineOptions({
    name: "MenuForm",
});

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
    queryInfoByLocal,
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
        isIframe: "0",
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

const rules = defineFormRules({
    path: Require("请输入路由地址"),
    title: Validator((_, value, cb) => {
        if(!value) {
            cb(new Error(form.value.type === 3 ? "请输入按钮名称" : "请输入菜单名称"));
        } else {
            cb();
        }
    }),
    name: [
        Require("请输入组件名称"),
        Validator((_, value: string, cb) => {
            if(!(/^[a-zA-Z0-9]+$/.test(value))) {
                cb(new Error("请输入字母、数字"));
            } else if(value.charAt(0).toUpperCase() !== value.charAt(0)) {
                cb(new Error("首字母必须大写"));
            } else {
                cb();
            }
        }),
    ],
    component: Require("请输入组件路径"),
    link: Require("请输入超链接"),
});

onDialogOpen(data => {
    query();
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

function onPathChange(path: string) {
    if(form.value.type != MenuType.MENU) return;
    let name = path.split("/").at(-1);
    if(name) {
        name = name.replace(/-\w/g, match => match.replace("-", "").toUpperCase());
        form.value.name = name.charAt(0).toUpperCase() + name.slice(1);
    }
}
</script>

<template>
    <el-form ref="formRef" :rules="rules" class="column-2" :model="form" label-width="80px">
        <el-form-item class="full" prop="parentId" label="上级菜单">
            <el-tree-select
                v-model="form.parentId"
                :data="treeData"
                value-key="id"
                check-strictly
                filterable
                :default-expanded-keys="[form.parentId]"
                placeholder="请选择上级菜单"
                :props="{ label: 'title' }"
            />
        </el-form-item>
        <el-form-item class="full" prop="type" label="菜单类型">
            <el-radio-group v-model="form.type" @change="clearValidate()">
                <el-radio :value="MenuType.FOLDER">目录</el-radio>
                <el-radio :value="MenuType.MENU">菜单</el-radio>
                <el-radio :value="MenuType.LINK">链接</el-radio>
                <el-radio :value="MenuType.BUTTON">按钮</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.type !== 3" prop="path" label="路由地址">
            <el-input v-model="form.path" placeholder="请输入路由地址" @change="onPathChange" />
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
        <el-form-item v-if="form.type == 2" prop="isCache" label="是否内链">
            <el-radio-group v-model="form.isIframe">
                <el-radio value="1">是</el-radio>
                <el-radio value="0">否</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.type == 1" prop="isCache" label="是否缓存">
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