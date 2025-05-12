<script setup lang="ts">
import { getUserInfo, userCreate, userUpdate } from "@/api/system/user";
import { getDeptAllList } from "@/api/system/dept";
import { getPostAllList } from "@/api/system/post";
import { getRoleAppList } from "@/api/system/role";
import type { UserInfo } from "#/system";

defineOptions({
    name: "UserForm",
});

const { t, ti, ts } = useLocal();

const { data: deptTreeList, queryOnce: onQueryDeptTree } = useRequest({
    request: getDeptAllList,
    default: [],
});

const { data: postList, queryOnce: onQueryPostList } = useRequest({
    request: getPostAllList,
    default: [],
});

const { data: roleList, queryOnce: onQueryRoleList } = useRequest({
    request: getRoleAppList,
    default: [],
});

const {
    form,
    formRef,
    resetFields,
    queryInfo,
    formLoading,
    onSubmit,
} = useFormRequest<UserInfo>({
    request: {
        add: userCreate,
        edit: userUpdate,
        info: getUserInfo,
    },
    form: () => ({
        id: undefined,
        deptId: undefined,
        postIds: [],
        userName: undefined,
        nickName: undefined,
        email: undefined,
        phone: undefined,
        sex: "2",
        avatar: undefined,
        status: "1",
        remark: undefined,
    }),
});

const rules = defineFormRules<UserInfo>({
    userName: Require(() => ti("username")),
    nickName: Require(() => ti("nickname")),
    phone: Require(() => ti("phone")),
    deptId: Require(() => ts("dept"), "change"),
});

onDialogOpen(data => {
    onQueryDeptTree();
    onQueryPostList();
    onQueryRoleList();
    if(data) {
        queryInfo(data?.id);
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
    <el-form ref="formRef" v-loading="formLoading" :rules="rules" :model="form" label-width="80px">
        <el-form-item prop="userName" :label="t('username')">
            <el-input v-model="form.userName" :disabled="!!form.id" :placeholder="ti('username')" />
        </el-form-item>
        <el-form-item prop="nickName" :label="t('nickname')">
            <el-input v-model="form.nickName" :placeholder="ti('nickname')" />
        </el-form-item>
        <el-form-item prop="phone" :label="t('phone')">
            <el-input v-model="form.phone" :placeholder="ti('phone')" />
        </el-form-item>
        <el-form-item prop="email" :label="t('email')">
            <el-input v-model="form.email" :placeholder="ti('email')" />
        </el-form-item>
        <el-form-item prop="sex" :label="t('sex')">
            <el-radio-group v-model="form.sex">
                <el-radio value="2">{{ t('sex-unknow') }}</el-radio>
                <el-radio value="0">{{ t('sex-0') }}</el-radio>
                <el-radio value="1">{{ t('sex-1') }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item prop="deptId" :label="t('dept')">
            <el-tree-select
                v-model="form.deptId"
                :data="deptTreeList"
                value-key="id"
                check-strictly
                filterable
                :default-expanded-keys="[form.deptId].filter(Boolean)"
                :placeholder="ts('dept')"
                :props="{ label: 'name' }"
            />
        </el-form-item>
        <el-form-item prop="postIds" :label="t('post')">
            <el-select v-model="form.postIds" :placeholder="ts('post')" multiple collapse-tags clearable>
                <template v-for="post in postList" :key="post.id">
                    <el-option :value="post.id!" :label="post.name" />
                </template>
            </el-select>
        </el-form-item>
        <el-form-item prop="roleIds" :label="t('role')">
            <el-select v-model="form.roleIds" :placeholder="ts('role')" multiple collapse-tags clearable>
                <template v-for="role in roleList" :key="role.id">
                    <el-option :value="role.id!" :label="role.name" />
                </template>
            </el-select>
        </el-form-item>
        <el-form-item prop="status" :label="$t('status.name')">
            <el-radio-group v-model="form.status">
                <el-radio value="1">{{ $t("status.enable") }}</el-radio>
                <el-radio value="0">{{ $t("status.disable") }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item prop="remark" :label="$t('remark')">
            <el-input v-model="form.remark" type="textarea" :rows="3" :placeholder="$t('input', [$t('remark')])" />
        </el-form-item>
    </el-form>
</template>

<i18n lang="yaml">
zh:
  username: 用户名
  nickname: 用户昵称
  dept: 部门
  phone: 手机号
  email: 邮箱
  sex: 性别
  sex-unknow: 未知
  sex-0: 男
  sex-1: 女
  post: 岗位
  role: 角色
en:
  username: username
  nickname: nickname
  dept: dept
  phone: phone
  email: email
  sex: sex
  sex-unknow: unknow
  sex-0: male
  sex-1: female
  post: post
  role: role
</i18n>