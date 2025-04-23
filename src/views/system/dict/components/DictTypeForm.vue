<script setup lang="ts">
import { dictCreate, dictUpdate } from "@/api/system/dictType";
import type { DictType } from "#/dict";

defineOptions({
    name: "DictTypeForm",
});

const {
    form,
    formRef,
    resetFields,
    onSubmit,
} = useFormRequest<DictType>({
    request: {
        add: dictCreate,
        edit: dictUpdate,
    },
    form: () => ({
        id: undefined,
        name: undefined,
        type: undefined,
        nodeType: "0",
        status: "1",
        remark: undefined,
    }),
});

const rules = defineFormRules({
    name: Require("请输入字典名称"),
    type: Require("请输入字典类型"),
    nodeType: Require("请选择节点类型", "change"),
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
        <el-form-item prop="name" label="字典名称">
            <el-input v-model="form.name" placeholder="请输入字典名称" />
        </el-form-item>
        <el-form-item prop="type" label="字典类型">
            <el-input v-model="form.type" placeholder="请输入字典类型" />
        </el-form-item>
        <el-form-item prop="nodeType" label="节点类型">
            <el-radio-group v-model="form.nodeType">
                <el-radio value="0">文本</el-radio>
                <el-radio value="1">标签</el-radio>
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