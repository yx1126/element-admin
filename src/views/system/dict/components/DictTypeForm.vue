<script setup lang="ts">
import { dictCreate, dictUpdate } from "@/api/system/dictType";
import type { DictType } from "#/system";

defineOptions({
    name: "DictTypeForm",
});

const { t, ti, $t, $ti, ts, $ts } = useLocal();

const {
    form,
    formRef,
    resetFields,
    queryInfoByLocal,
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
    name: Require(() => t("dictName")),
    type: Require(() => t("dictType")),
    nodeType: Require(() => ts("dictType"), "change"),
    status: Require(() => $ts("status.name"), "change"),
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
        <el-form-item prop="name" :label="t('dictName')">
            <el-input v-model="form.name" :placeholder="ti('dictName')" />
        </el-form-item>
        <el-form-item prop="type" :label="t('dictType')">
            <el-input v-model="form.type" :placeholder="ti('dictType')" />
        </el-form-item>
        <el-form-item prop="nodeType" :label="t('dictType')">
            <el-radio-group v-model="form.nodeType">
                <el-radio value="0">{{ t("text") }}</el-radio>
                <el-radio value="1">{{ t("tag") }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item prop="status" :label="$t('status.name')">
            <el-radio-group v-model="form.status">
                <el-radio value="1">{{ $t("status.enable") }}</el-radio>
                <el-radio value="0">{{ $t("status.disable") }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item prop="remark" :label="$t('remark')">
            <el-input v-model="form.remark" type="textarea" :rows="3" :placeholder="$ti('remark')" />
        </el-form-item>
    </el-form>
</template>

<i18n lang="yaml">
zh:
  dict: 字典
  dictType: 字典类型
  dictName: 字典名称
  sort: 排序
  text: 文本
  tag: 标签
en:
  dict: dict
  dictType: dictType
  dictName: dictName
  sort: sort
  text: text
  tag: tag
</i18n>