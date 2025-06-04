<script setup lang="ts">
import type { LoginInfo } from "#/views";
import { getCode } from "@/api/login";
import Logo from "@/layout/components/Logo.vue";
import LangSelect from "@/components/LangSelect";

defineOptions({
    name: "Login",
});

const formRef = useTemplateRef("formRef");

const router = useRouter();
const set = useSetStore();
const { t, ti } = useLocal();

const { data: codeData, query: onCodeChange } = useRequest(getCode, {});

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
    formRef.value?.validate(valid => {
        if(valid) {
            router.replace("/");
        }
    });
}
</script>

<template>
    <div class="size-full">
        <el-scrollbar>
            <div class="h-[42px] fixed rounded-[42px] flex items-center right-[20px] top-[20px] shadow-[var(--el-box-shadow-dark)] px-[15px] py-[5px]">
                <lang-select class="h-[100%]" type="dropdown">
                    <div class="size-[32px] cursor-pointer box-center">
                        <Icon icon="language" />
                    </div>
                </lang-select>
                <div class="size-[32px] cursor-pointer box-center" @click="set.onNavModeChange">
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
                        <el-button class="w-full" type="primary" @click="onLogin">{{ t('login') }}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-scrollbar>
    </div>
</template>

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