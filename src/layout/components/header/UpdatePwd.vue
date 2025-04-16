<script setup lang="ts">
import type { FormRules } from "element-plus";

defineOptions({
    name: "UpdatePwd",
});

const formRef = useTemplateRef("formRef");
const message = useMessage();
const { t, ti } = useLocal();

const visible = ref(false);

const form = ref({
    password: "",
    newPwd: "",
    confirmPwd: "",
});

const rules: FormRules = {
    password: [Require(() => ti("oldPwd"))],
    newPwd: [Require(() => ti("newPwd"))],
    confirmPwd: [{
        required: true,
        trigger: "blur",
        message: () => t("conifrm2"),
    }, {
        message: () => t("notSame"),
        trigger: "blur",
        validator: (_, value) => value === form.value.newPwd,
    }],
};

function open() {
    visible.value = true;
}

function onSubmit() {
    formRef.value?.validate(valid => {
        if(valid) {
            message.success("保存成功");
            onCancel();
        }
    });
}

function onCancel() {
    visible.value = false;
}

function onClosed() {
    formRef.value?.resetFields();
}

defineExpose({
    open,
});
</script>

<template>
    <el-dialog
        v-model="visible"
        :title="t('title')"
        width="400"
        draggable
        append-to-body
        destroy-on-close
        @closed="onClosed"
    >
        <el-form ref="formRef" :model="form" :rules="rules" label-position="top" label-suffix="：" autocomplete="off">
            <el-form-item :label="t('oldPwd')" prop="password">
                <el-input v-model="form.password" type="password" :placeholder="$t('input', [t('oldPwd')])" show-password clearable />
            </el-form-item>
            <el-form-item :label="t('newPwd')" prop="newPwd">
                <el-input v-model="form.newPwd" type="password" :placeholder="$t('input', [t('newPwd')])" show-password clearable />
            </el-form-item>
            <el-form-item :label="t('conifrm')" prop="confirmPwd">
                <el-input v-model="form.confirmPwd" type="password" :placeholder="t('conifrm2')" show-password clearable />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="onCancel">{{ $t("button.cancel") }}</el-button>
            <el-button type="primary" @click="onSubmit">{{ $t("button.submit") }}</el-button>
        </template>
    </el-dialog>
</template>

<i18n lang="yaml">
zh:
  title: 修改密码
  oldPwd: 旧密码
  newPwd: 新密码
  conifrm: 确认密码
  conifrm2: 请再次输入新密码
  notSame: 两次密码输入不一致
en:
  title: Change Password
  oldPwd: old Password
  newPwd: new Password
  conifrm: Confirm Password
  conifrm2: Please enter your new password again
  notSame: The two passwords you entered do not match
</i18n>