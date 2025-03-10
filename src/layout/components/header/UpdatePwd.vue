<script setup lang="ts">
import type { FormRules } from "element-plus";

defineOptions({
    name: "UpdatePwd",
});

const formRef = useTemplateRef("formRef");
const message = useMessage();

const visible = ref(false);

const form = ref({
    password: "",
    newPwd: "",
    confirmPwd: "",
});

const rules: FormRules = {
    password: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
    newPwd: [{ required: true, message: "请输入新密码", trigger: "blur" }],
    confirmPwd: [
        { required: true, message: "请输入旧密码", trigger: "blur" },
        {
            message: "两次密码输入不一致",
            trigger: "blur",
            validator: (_, value) => value === form.value.newPwd,
        },
    ],
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
        title="修改密码"
        width="400"
        draggable
        append-to-body
        destroy-on-close
        @closed="onClosed"
    >
        <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" label-suffix="：" autocomplete="off">
            <el-form-item label="旧密码" prop="password">
                <el-input v-model="form.password" name="pdw" type="password" placeholder="请输入旧密码" show-password clearable />
            </el-form-item>
            <el-form-item label="新密码" prop="newPwd">
                <el-input v-model="form.newPwd" name="pdw" type="password" placeholder="请输入新密码" show-password clearable />
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPwd">
                <el-input v-model="form.confirmPwd" name="pdw" type="password" placeholder="请再次输入新密码" show-password clearable />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="onCancel">取消</el-button>
            <el-button type="primary" @click="onSubmit">提交</el-button>
        </template>
    </el-dialog>
</template>
