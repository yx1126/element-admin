<script setup lang="ts">
import { FullscreenOutlined, FullscreenExitOutlined, UserOutlined, LogoutOutlined } from "@vicons/antd";
import { renderIcon } from "@/utils/renderIcon";
import UpdatePwd from "./UpdatePwd.vue";
import { parseUnit } from "@/utils/unit";
import LangSelect from "@/components/LangSelect";
import type { VNode } from "vue";
import type { NavTheme } from "#/stores";

const { height } = defineProps<{
    height?: number | string;
    theme?: NavTheme;
}>();

defineSlots<{
    default?: () => VNode[];
}>();

const { t } = useI18n();
const router = useRouter();
const user = useUserStore();
const set = useSetStore();
const { isFullScreen, onToggle } = useFullscreen();
const [setMitt, pwdMitt] = useMitt("toggleSetting", "updatePwd");
const updatePwdRef = useTemplateRef("updatePwdRef");

pwdMitt.on(() => {
    updatePwdRef.value?.open();
});

function onShowSetting() {
    setMitt.emit();
}

function onDropDown(command: string) {
    if(command === "userinfo") {
        router.push("/person");
        return;
    }
    if(command === "password") {
        updatePwdRef.value?.open();
        return;
    }
    if(command === "github") {
        window.open("https://github.com/yx1126/element-admin");
        return;
    }
    if(command === "logout") {
        router.push("/login");
        return;
    }
}
</script>

<template>
    <div
        class="header h-[100%] flex justify-between"
        :class="{
            [`is-${theme}`]: !!theme,
        }"
        :style="{
            height: parseUnit(height),
        }"
    >
        <div class="h-[100%] flex items-center gap-[5px] flex-1 min-w-0">
            <slot />
        </div>
        <div class="h-[100%] flex items-center pr-[10px]">
            <div class="header-item" @click="onToggle">
                <Icon :icon="isFullScreen ? FullscreenExitOutlined : FullscreenOutlined" size="18" />
            </div>
            <lang-select class="h-[100%]" type="dropdown">
                <div class="header-item">
                    <Icon icon="language" />
                </div>
            </lang-select>
            <el-dropdown class="h-[100%]" :persistent="false" @command="onDropDown">
                <div class="header-item">
                    <el-avatar :size="34" :src="user.userInfo?.avatar" />
                    <span>{{ user.userInfo?.nickName }}</span>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="userinfo" :icon="UserOutlined">{{ t('userCenter') }}</el-dropdown-item>
                        <el-dropdown-item command="password" :icon="renderIcon('password')">{{ t('password') }}</el-dropdown-item>
                        <el-dropdown-item command="github" :icon="renderIcon('github')" divided>Github</el-dropdown-item>
                        <el-dropdown-item command="logout" :icon="LogoutOutlined" divided>{{ t('loutOut') }}</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <div v-if="['default', 'header'].includes(set.setPlacement)" class="header-item" @click="onShowSetting">
                <Icon icon="ele-setting" size="18" />
            </div>
        </div>
        <update-pwd ref="updatePwdRef" />
    </div>
</template>

<style lang="scss" scoped>
.header {
    position: relative;
    transition: background-color var(--el-transition-duration);
    @include border(bottom, var(--border-light-color));
    @include when(inverted) {
        background-color: var(--menu-bg-color);
        color: #fff;
        @include border(bottom, var(--border-inverted-color));
        .header-item {
            color: #fff;
            &:hover {
                background-color: var(--menu-hover-bg-inverted-color);
            }
        }
    }
    @include when(dark) {
        background-color: var(--dark-bg-color);
        @include border(bottom, var(--border-dark-color));
    }
    &-item {
        height: 100%;
        padding: 0 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        transition: background-color var(--el-transition-duration);
        & > span {
            font-size: 14px;
        }
        @include hover;
    }
}
</style>

<i18n lang="yaml">
zh:
  userCenter: 个人中心
  password: 修改密码
  loutOut: 退出登录
en:
  userCenter: Personal Center
  password: Change Password
  loutOut: Logout
</i18n>