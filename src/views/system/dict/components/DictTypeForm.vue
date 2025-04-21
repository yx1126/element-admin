<script setup lang="ts">
import { dictTypeCreate, dictTypeUpdate } from "@/api/system/dictType";
import type { DictType } from "#/dict";

defineOptions({
    name: "DictTypeForm",
});

const {
    form,
    formRef,
    resetFields,
    loading,
    onSubmit,
} = useFormRequest<DictType>({
    request: {
        add: dictTypeCreate,
        edit: dictTypeUpdate,
    },
    form: () => ({
        id: undefined,
        name: undefined,
        type: undefined,
        status: "1",
        remark: undefined,
    }),
});

const rules = defineFormRules({
    name: Require("请输入字典名称"),
    type: Require("请输入字典类型"),
    status: Require("请选择字典状态"),
});

onDialogOpen(data => {
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
    <el-form ref="formRef" v-loading="loading" :rules="rules" :model="form" label-width="80px">
        <el-form-item prop="name" label="字典名称">
            <el-input v-model="form.name" placeholder="请输入字典名称" />
        </el-form-item>
        <el-form-item prop="type" label="字典类型">
            <el-input v-model="form.type" placeholder="请输入字典类型" />
        </el-form-item>
        <el-form-item prop="status" label="状态">
            <el-radio-group v-model="form.status">
                <el-radio value="0">禁用</el-radio>
                <el-radio value="1">启用</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item prop="remark" label="备注">
            <el-input v-model="form.remark" type="textarea" :rows="3" placeholder="请输入备注" />
        </el-form-item>
    </el-form>
</template>