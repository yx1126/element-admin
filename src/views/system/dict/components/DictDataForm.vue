<script setup lang="ts">
import { dictDataCreate, dictDataUpdate } from "@/api/system/dictType";
import type { DictData } from "#/dict";

defineOptions({
    name: "DictDataForm",
});

const {
    form,
    formRef,
    resetFields,
    onSubmit,
} = useFormRequest<DictData>({
    request: {
        add: dictDataCreate,
        edit: dictDataUpdate,
    },
    form: () => ({
        id: undefined,
        dictId: undefined,
        sort: undefined,
        label: undefined,
        value: undefined,
        type: "primary",
        cssClass: undefined,
        listClass: undefined,
        isDefault: "0",
        status: "1",
        remark: undefined,
    }),
});

const rules = defineFormRules({
    label: Require("请输入字典名称"),
    value: Require("请输入字典值"),
    type: Require("请选择标签类型", "change"),
    isDefault: Require("请选择是否默认", "change"),
    status: Require("请选择字典状态", "change"),
});

onDialogOpen(data => {
    if(data) {
        form.value = { ...form.value, ...data };
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
        <el-form-item prop="label" label="字典名称">
            <el-input v-model="form.label" placeholder="请输入字典名称" />
        </el-form-item>
        <el-form-item prop="value" label="字典值">
            <el-input v-model="form.value" placeholder="请输入字典类型" />
        </el-form-item>
        <el-form-item prop="type" label="标签类型">
            <el-select v-model="form.type" placeholder="请选择标签类型">
                <el-option value="primary" label="primary" />
                <el-option value="success" label="success" />
                <el-option value="info" label="info" />
                <el-option value="warning" label="warning" />
                <el-option value="danger" label="danger" />
            </el-select>
        </el-form-item>
        <el-form-item prop="sort" label="排序">
            <el-input-number v-model="form.sort" placeholder="请输入排序" />
        </el-form-item>
        <el-form-item prop="isDefault" label="是否默认">
            <el-radio-group v-model="form.isDefault">
                <el-radio value="1">是</el-radio>
                <el-radio value="0">否</el-radio>
            </el-radio-group>
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