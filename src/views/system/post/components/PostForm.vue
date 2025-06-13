<script setup lang="ts">
import { postCreate, postUpdate } from "@/api/system/post";
import type { Post } from "#/system";

defineOptions({
    name: "UserForm",
});

const { t, ti, $t, $ti } = useLocal();
const { lang } = useLocales();

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
    name: Require(() => ti("postName")),
    code: [
        Require(() => ti("code")),
        RequiredValidator((_, value, cb) => {
            if(/^[a-zA-Z0-9_-]+$/.test(value)) {
                cb();
            } else {
                cb(new Error(t("valid")));
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
    <el-form ref="formRef" :rules="rules" :model="form" :label-width="['en'].includes(lang) ? '90px' : '80px'">
        <el-form-item prop="name" :label="t('postName')">
            <el-input v-model="form.name" :placeholder="ti('postName')" />
        </el-form-item>
        <el-form-item prop="code" :label="t('code')">
            <el-input v-model="form.code" :placeholder="ti('code')" />
        </el-form-item>
        <el-form-item prop="sort" :label="t('sort')">
            <el-input-number v-model="form.sort" :placeholder="ti('sort')" />
        </el-form-item>
        <el-form-item prop="status" :label="$t('status.name')">
            <el-radio-group v-model="form.status">
                <el-radio value="1">{{ $t('status.enable') }}</el-radio>
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
  postName: 岗位名称
  code: 岗位编号
  sort: 排序
  valid: 请输入数字字母_-
en:
  postName: postName
  code: code
  sort: sort
  valid: Please enter letters and numbers_-
</i18n>