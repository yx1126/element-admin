<template>
    <div class="header h-[100%] flex justify-between">
        <div class="h-[100%] flex items-center">
            <Collapse width="50" height="50" />
        </div>
        <div class="h-[100%] flex items-center pr-[10px]">
            <div class="header-item" @click="onToggle">
                <Icon :icon="isFullScreen ? FullscreenExitOutlined : FullscreenOutlined" size="18" />
            </div>
            <el-dropdown class="h-[100%]" @command="onDropDown">
                <div class="header-item">
                    <el-avatar :size="34" :src="user.userInfo?.avatar" />
                    <span>admin</span>
                </div>
                <template #dropdown>
                    <el-dropdown-item command="userinfo" :icon="UserOutlined">个人中心</el-dropdown-item>
                    <el-dropdown-item command="password" :icon="renderIcon('password')">修改密码</el-dropdown-item>
                    <el-dropdown-item command="github" :icon="renderIcon('github')" divided>Github</el-dropdown-item>
                    <el-dropdown-item command="logout" :icon="LogoutOutlined" divided>退出登录</el-dropdown-item>
                </template>
            </el-dropdown>
            <div class="header-item" @click="onShowSetting">
                <Icon icon="ele-setting" size="18" />
            </div>
        </div>
        <update-pwd ref="updatePwdRef" />
    </div>
</template>

<script setup lang="ts">
import Collapse from "../Collapse.vue";
import { FullscreenOutlined, FullscreenExitOutlined, UserOutlined, LogoutOutlined } from "@vicons/antd";
import { renderIcon } from "@/utils/renderIcon";
import UpdatePwd from "./UpdatePwd.vue";

const router = useRouter();
const user = useUserStore();
const { isFullScreen, onToggle } = useFullscreen();
const [setMitt, pwdMitt] = useMitt("toggleSetting", "updatePwd");
const updatePwdRef = useTemplateRef("updatePwdRef");

function onShowSetting() {
    setMitt.emit();
}

pwdMitt.on(() => {
    updatePwdRef.value?.open();
});

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

<style lang="scss" scoped>
.header {
    // border-bottom: 1px solid var(--border-dark-color);
    position: relative;
    &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background-color: var(--border-dark-color);
    }
    @include when-dark {
        background-color: var(--dark-color);
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