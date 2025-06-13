<script setup lang="ts">
import type { LoginInfo } from "#/views";
import { getCode, login } from "@/api/login";
import Logo from "@/layout/components/Logo.vue";
import LangSelect from "@/components/LangSelect";
import { encrypt } from "@/utils/crypto";

defineOptions({
    name: "Login",
});

const formRef = useTemplateRef("formRef");

const router = useRouter();
const set = useSetStore();
const { t, ti } = useLocal();

const { data: codeData, query: onCodeChange } = useRequest(getCode, {});

const loading = ref(false);
const form = ref<Omit<LoginInfo, "uuid">>({
    username: "",
    password: "",
    code: "",
});

const rules = defineFormRules<Omit<LoginInfo, "uuid">>({
    username: Require(() => ti("username")),
    password: Require(() => ti("password")),
    code: Require(() => ti("code")),
});

function onLogin() {
    formRef.value?.validate(async valid => {
        if(valid) {
            try {
                loading.value = true;
                await login(encrypt(form.value));
                router.replace("/");
            } finally {
                loading.value = false;
            }
        }
    });
}
</script>

<template>
    <div class="size-full login-wrapper">
        <el-scrollbar>
            <div class="action">
                <lang-select class="h-[100%]" type="dropdown">
                    <div class="action-item">
                        <Icon icon="language" />
                    </div>
                </lang-select>
                <div class="action-item" @click="set.onNavModeChange">
                    <Icon :icon="set.navMode === 'dark' ? 'light' : 'dark'" />
                </div>
            </div>
            <div class="w-[380px] h-[calc(100%-100px)] p-[20px] m-[100px_auto]">
                <div class="text-[38px] flex justify-center mb-[20px]">
                    <Logo theme="light" size="38" width="auto" />
                </div>
                <el-form ref="formRef" :model="form" :rules size="large">
                    <el-form-item prop="username">
                        <el-input v-model="form.username" :placeholder="ti('username')" />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="form.password" show-password :placeholder="ti('password')" />
                    </el-form-item>
                    <el-form-item prop="code">
                        <div class="w-full grid grid-cols-[1fr_100px] gap-[10px]">
                            <el-input v-model="form.code" :placeholder="ti('code')" clearable />
                            <el-image class="w-[100%] h-[40px] border border-[var(--el-border-color)] border-solid cursor-pointer" :src="codeData.image" alt="验证码" @click="onCodeChange" />
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="w-full" :loading type="primary" @click="onLogin">{{ t('login') }}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-scrollbar>
    </div>
</template>

<style lang="scss" scoped>
.login-wrapper {
    .action {
        height: 42px;
        position: fixed;
        border-radius: 42px;
        display: flex;
        align-items: center;
        right: 20px;
        top: 20px;
        padding: 5px 15px;
        box-shadow: var(--el-box-shadow-light);
        @include when-dark {
            box-shadow: var(--el-box-shadow-dark);
        }
        &-item {
            width: 32px;
            height: 32px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}
</style>

<i18n lang="yaml">
zh:
  username: 用户名
  password: 密码
  code: 验证码
  login: 登录
en:
  username: username
  password: password
  code: code
  login: Login
</i18n>