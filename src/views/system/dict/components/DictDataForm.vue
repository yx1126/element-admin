<script setup lang="ts">
import { dictDataCreate, dictDataUpdate } from "@/api/system/dictType";
import type { DictData } from "#/system";

defineOptions({
    name: "DictDataForm",
});

const { t, ti, $t, $ti, ts, $ts } = useLocal();

const {
    form,
    formRef,
    resetFields,
    queryInfoByLocal,
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
        type: "default",
        cssClass: undefined,
        listClass: undefined,
        isDefault: "0",
        status: "1",
        remark: undefined,
    }),
});

const rules = defineFormRules({
    label: Require(() => t("dictName")),
    value: Require(() => t("dictValue")),
    type: Require(() => ts("type"), "change"),
    isDefault: Require(() => ts("isDefault"), "change"),
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
        <el-form-item prop="label" :label="t('dictName')">
            <el-input v-model="form.label" :placeholder="ti('dictType')" />
        </el-form-item>
        <el-form-item prop="value" :label="t('dictValue')">
            <el-input v-model="form.value" :placeholder="ti('dictValue')" />
        </el-form-item>
        <el-form-item prop="type" :label="t('type')">
            <el-select v-model="form.type" :placeholder="ts('type')">
                <el-option value="default" label="default" />
                <el-option value="primary" label="primary" />
                <el-option value="success" label="success" />
                <el-option value="info" label="info" />
                <el-option value="warning" label="warning" />
                <el-option value="danger" label="danger" />
            </el-select>
        </el-form-item>
        <el-form-item prop="sort" :label="t('sort')">
            <el-input-number v-model="form.sort" :placeholder="ti('sort')" />
        </el-form-item>
        <el-form-item prop="isDefault" :label="t('isDefault')">
            <el-radio-group v-model="form.isDefault">
                <el-radio value="1">{{ $t('flag.yes') }}</el-radio>
                <el-radio value="0">{{ $t('flag.no') }}</el-radio>
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
  dictType: 字典类型
  dictName: 字典名称
  dictValue: 字典值
  type: 类型
  sort: 排序
  text: 文本
  tag: 标签
  isDefault: 是否默认
en:
  dictType: dictType
  dictName: dictName
  dictValue: dictValue
  type: type
  sort: sort
  text: text
  tag: tag
  isDefault: isDefault
</i18n>