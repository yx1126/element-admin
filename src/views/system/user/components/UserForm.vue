<script setup lang="ts">
import { userCreate, userUpdate } from "@/api/system/user";
import type { UserInfo } from "#/system";

defineOptions({
    name: "UserForm",
});

const {
    form,
    formRef,
    resetFields,
    queryInfoByLocal,
    onSubmit,
} = useFormRequest<UserInfo>({
    request: {
        add: userCreate,
        edit: userUpdate,
    },
    form: () => ({
        id: undefined,
        deptId: undefined,
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
    userName: Require("请输入用户名"),
    nickName: Require("请输入用户昵称"),
    phone: Require("请输入手机号"),
});

onDialogOpen(data => {
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
    <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
        <el-form-item prop="userName" label="用户名">
            <el-input v-model="form.userName" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item prop="nickName" label="用户昵称">
            <el-input v-model="form.nickName" placeholder="请输入用户昵称" />
        </el-form-item>
        <el-form-item prop="avatar" label="用户头像">
            <el-input v-model="form.avatar" placeholder="请输入用户头像" />
        </el-form-item>
        <el-form-item prop="phone" label="手机号">
            <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
            <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item prop="sex" label="性别">
            <!-- <el-select v-model="form.sex" placeholder="请选择性别">
                <el-option value="2" label="未知" />
                <el-option value="0" label="男" />
                <el-option value="1" label="女" />
                </el-select> -->
            <el-radio-group v-model="form.sex">
                <el-radio value="2">未知</el-radio>
                <el-radio value="0">男</el-radio>
                <el-radio value="1">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item prop="deptId" label="部门">
            <el-select v-model="form.deptId" placeholder="请选择部门">
                <!-- <el-option value="2" label="未知" /> -->
            </el-select>
        </el-form-item>
        <el-form-item prop="status" label="状态">
            <el-radio-group v-model="form.status">
                <el-radio value="1">启用</el-radio>
                <el-radio value="0">禁用</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item prop="remark" label="备注">
            <el-input v-model="form.remark" type="textarea" :rows="3" placeholder="请输入备注" />
        </el-form-item>
    </el-form>
</template>