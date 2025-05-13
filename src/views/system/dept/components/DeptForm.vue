<script setup lang="ts">
import { getDeptSelectTree, deptCreate, deptUpdate } from "@/api/system/dept";
import { getUserAllList } from "@/api/system/user";
import type { Dept } from "#/system";

defineOptions({
    name: "DeptForm",
});

const { t, $t, ts, ti } = useLocal();
const { lang } = useLocales();

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
    name: Require(() => ti("deptName")),
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
    <el-form ref="formRef" :rules="rules" :model="form" :label-width="['en'].includes(lang) ? '100px' : '90px'">
        <el-form-item prop="parentId" :label="t('parent')">
            <el-tree-select
                v-model="form.parentId"
                :data="treeData"
                value-key="id"
                check-strictly
                filterable
                :default-expanded-keys="[form.parentId]"
                :placeholder="ts('parent')"
                :props="{ label: 'name' }"
            />
        </el-form-item>
        <el-form-item prop="name" :label="t('deptName')">
            <el-input v-model="form.name" :placeholder="ti('deptName')" />
        </el-form-item>
        <el-form-item prop="leaderId" :label="t('leader')">
            <el-select
                v-model="form.leaderId"
                :data="treeData"
                clearable
                filterable
                :placeholder="ts('leader')"
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
        <el-form-item prop="sort" :label="t('sort')">
            <el-input-number v-model="form.sort" :placeholder="ti('sort')" />
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
  parent: 上级部门
  deptName: 部门名称
  leader: 部门负责人
  sort: 排序
en:
  parent: parent dept
  deptName: deptName
  leader: leader
  sort: 排序
</i18n>