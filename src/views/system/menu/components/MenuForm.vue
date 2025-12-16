<script setup lang="ts">
import { getMenuSelectTree, menuCreate, menuUpdate } from "@/api/system/menu";
import IconSelect from "@/components/IconSelect";
import { MenuType } from "@/enums/menu";
import type { MenuItem } from "#/system";

defineOptions({
    name: "MenuForm",
});

const { t, $t, ti, ts } = useLocal();
const { lang } = useLocales();

const { data: treeData, query } = useRequest({
    request: getMenuSelectTree,
    default: [],
    formatter: data => {
        return [{
            id: "0",
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
        parentId: "0",
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
    path: Require(() => ti("path")),
    title: Validator((_, value, cb) => {
        if(!value) {
            cb(new Error(form.value.type === 3 ? ti("title1") : ti("title2")));
        } else {
            cb();
        }
    }),
    name: [
        Require(() => ti("componentName")),
        Validator((_, value: string, cb) => {
            if(!(/^[a-zA-Z0-9]+$/.test(value))) {
                cb(new Error(t("nameValid1")));
            } else if(value.charAt(0).toUpperCase() !== value.charAt(0)) {
                cb(new Error(t("nameValid2")));
            } else {
                cb();
            }
        }),
    ],
    component: Require(() => ti("componentPath")),
    link: Require(() => ti("link2")),
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
        formRef.value?.validateField("name");
    }
}
</script>

<template>
    <el-form ref="formRef" :rules="rules" class="column-2" :model="form" :label-width="['en'].includes(lang) ? '140px' : '80px'">
        <el-form-item class="full" prop="parentId" :label="t('parent')">
            <el-tree-select
                v-model="form.parentId"
                :data="treeData"
                value-key="id"
                check-strictly
                filterable
                :default-expanded-keys="[form.parentId]"
                :placeholder="ts('parent')"
                :props="{ label: 'title' }"
            />
        </el-form-item>
        <el-form-item class="full" prop="type" :label="t('type')">
            <el-radio-group v-model="form.type" @change="clearValidate()">
                <el-radio :value="MenuType.FOLDER">{{ t('folder') }}</el-radio>
                <el-radio :value="MenuType.MENU">{{ t("menu") }}</el-radio>
                <el-radio :value="MenuType.LINK">{{ t("link") }}</el-radio>
                <el-radio :value="MenuType.BUTTON">{{ t("button") }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.type !== 3" prop="path" :label="t('path')">
            <el-input v-model="form.path" :placeholder="ti('path')" @change="onPathChange" />
        </el-form-item>
        <el-form-item prop="title" :label="form.type === 3 ? t('title1') : t('title2')">
            <el-input v-model="form.title" :placeholder="ti(`${form.type === 3 ? 'title1' : 'title2'}`)" />
        </el-form-item>
        <el-form-item v-if="form.type == 2" class="full" prop="link" :label="t('link2')">
            <el-input v-model="form.link" type="textarea" :rows="3" :placeholder="ti('link2')" />
        </el-form-item>
        <el-form-item v-if="form.type == 0 || form.type == 1" prop="name" :label="t('componentName')">
            <el-input v-model="form.name" :placeholder="ti('componentName')" />
        </el-form-item>
        <el-form-item v-if="form.type != 3" prop="icon" :label="t('icon')">
            <icon-select v-model="form.icon" clearable />
        </el-form-item>
        <el-form-item v-if="form.type == 1" class="full" prop="component" :label="t('componentPath')">
            <el-input v-model="form.component" :placeholder="ti('componentPath')" />
        </el-form-item>
        <el-form-item v-if="form.type != 0" prop="permission" :label="t('permission')">
            <el-input v-model="form.permission" :placeholder="ti('permission')" clearable />
        </el-form-item>
        <el-form-item prop="sort" :label="t('sort')">
            <el-input-number v-model="form.sort" :placeholder="ti('sort')" />
        </el-form-item>
        <el-form-item v-if="form.type != 3" prop="visible" :label="t('visible')">
            <el-radio-group v-model="form.visible">
                <el-radio value="1">{{ $t("visible.show") }}</el-radio>
                <el-radio value="0">{{ $t("visible.hide") }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.type == 2" prop="isIframe" :label="t('isIframe')">
            <el-radio-group v-model="form.isIframe">
                <el-radio value="1">{{ $t('flag.yes') }}</el-radio>
                <el-radio value="0">{{ $t('flag.no') }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.type == 1" prop="isCache" :label="t('isCache')">
            <el-radio-group v-model="form.isCache">
                <el-radio value="1">{{ $t('flag.yes') }}</el-radio>
                <el-radio value="0">{{ $t('flag.no') }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.type != 3" prop="status" :label="$t('status.name')">
            <el-radio-group v-model="form.status">
                <el-radio value="1" :label="$t('status.enable')" />
                <el-radio value="0" :label="$t('status.disable')" />
            </el-radio-group>
        </el-form-item>
    </el-form>
</template>

<i18n lang="yaml">
zh:
  parent: 上级菜单
  type: 菜单类型
  folder: 目录
  menu: 菜单
  link: 链接
  button: 按钮
  path: 路由地址
  title1: 按钮名称
  title2: 菜单名称
  link2: 超链接
  componentName: 组件名称
  icon: 图标
  componentPath: 组件路径
  permission: 权限
  sort: 排序
  visible: 显示/隐藏
  isIframe: 是否内链
  isCache: 是否缓存
  nameValid1: 请输入字母、数字
  nameValid2: 首字母必须大写
en:
  parent: parent menu
  type: menuType
  folder: folder
  menu: menu
  link: link
  button: button
  path: path
  title1: buttonName
  title2: menuName
  link2: link
  componentName: componentName
  icon: icon
  componentPath: componentPath
  permission: permission
  sort: sort
  visible: visible
  isIframe: isIframe
  isCache: isCache
  nameValid1: Please enter letters and numbers
  nameValid2: The first letter must be capitalized
</i18n>