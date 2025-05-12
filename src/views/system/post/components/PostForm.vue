<script setup lang="ts">
import { postCreate, postUpdate } from "@/api/system/post";
import type { Post } from "#/system";

defineOptions({
    name: "UserForm",
});

const {
    form,
    formRef,
    resetFields,
    queryInfoByLocal,
    onSubmit,
} = useFormRequest<Post>({
    request: {
        add: postCreate,
        edit: postUpdate,
    },
    form: () => ({
        id: undefined,
        code: undefined,
        name: undefined,
        sort: 0,
        status: "1",
        remark: undefined,
    }),
});

const rules = defineFormRules<Post>({
    name: Require("请输入岗位名称"),
    code: [
        Require("请输入岗位编号"),
        RequiredValidator((_, value, cb) => {
            if(/^^[a-zA-Z0-9_-]+$$/.test(value)) {
                cb();
            } else {
                cb(new Error("请输入数字字母_-"));
            }
        }),
    ],
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
        <el-form-item prop="name" label="岗位名称">
            <el-input v-model="form.name" placeholder="请输入岗位名称" />
        </el-form-item>
        <el-form-item prop="code" label="岗位编号">
            <el-input v-model="form.code" placeholder="请输入岗位编号" />
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
        <el-form-item prop="remark" label="备注">
            <el-input v-model="form.remark" type="textarea" :rows="3" placeholder="请输入备注" />
        </el-form-item>
    </el-form>
</template>