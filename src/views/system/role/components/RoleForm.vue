<script setup lang="ts">
import { getRoleInfo, roleCreate, roleUpdate } from "@/api/system/role";
import { getMenuAllTree } from "@/api/system/menu";
import type { Role, MenuItem } from "#/system";

defineOptions({
    name: "RoleForm",
});

const { t, $t, ti, ts } = useLocal();
const { lang } = useLocales();

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
    name: Require(() => ti("roleName")),
    key: [
        Require(() => ti("roleKey")),
        RequiredValidator((_, value, cb) => {
            if(/^[a-zA-Z0-9_-]+$/.test(value)) {
                cb();
            } else {
                cb(new Error(t("key")));
            }
        }),
    ],
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
    return tree.reduce<string[]>((pre, item) => {
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
    <el-form ref="formRef" v-loading="formLoading" :rules="rules" :model="form" :label-width="['en'].includes(lang) ? '130px' :'90px'">
        <el-form-item prop="name" :label="t('roleName')">
            <el-input v-model="form.name" :placeholder="ti('roleName')" />
        </el-form-item>
        <el-form-item prop="key" :label="t('roleKey')">
            <el-input v-model="form.key" :placeholder="ti('roleKey')" />
        </el-form-item>
        <el-form-item prop="menuIds" :label="t('menu')">
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
                :placeholder="ts('menu')"
                :props="{ label: 'title' }"
            >
                <template #header>
                    <el-checkbox :model-value="isCheckedAll" :indeterminate @change="onCheckedChange">{{ $t("checked.select-all") }}</el-checkbox>
                </template>
            </el-tree-select>
        </el-form-item>
        <el-form-item prop="sort" :label="t('sort')">
            <el-input-number v-model="form.sort" :placeholder="ts('sort')" />
        </el-form-item>
        <el-form-item prop="status" :label="$t('status.name')">
            <el-radio-group v-model="form.status">
                <el-radio value="1">{{ $t("status.enable") }}</el-radio>
                <el-radio value="0">{{ $t("status.disable") }}</el-radio>
            </el-radio-group>
        </el-form-item>
    </el-form>
</template>

<i18n lang="yaml">
zh:
  role: 角色
  roleName: 角色名称
  roleKey: 角色标识
  key: 请输入数字字母_-
  menu: 菜单权限
  updateBy: 更新人
  sort: 排序
en:
  role: role
  roleName: roleName
  roleKey: roleKey
  key: Please enter letters and numbers_-
  menu: menuPermissions
  updateBy: updateBy
  sort: sort
</i18n>