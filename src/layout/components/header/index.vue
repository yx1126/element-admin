<template>
    <div class="header h-[100%] flex justify-between">
        <div class="h-[100%] flex items-center">
            <Collapse width="50" height="50" />
        </div>
        <div class="h-[100%] flex items-center pr-[10px]">
            <div class="header-item">
                <Icon :icon="false ? FullscreenExitOutlined : FullscreenOutlined" />
            </div>
            <el-dropdown class="h-[100%]" @command="onDropDown">
                <div class="header-item">
                    <el-avatar :size="34" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
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
                <Icon icon="ele-setting" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Collapse from "../Collapse.vue";
import { FullscreenOutlined, FullscreenExitOutlined, UserOutlined, LogoutOutlined } from "@vicons/antd";
import { renderIcon } from "@/utils/renderIcon";

const router = useRouter();
const mitt = useMitt("toggleSetting");

function onShowSetting() {
    mitt.emit();
}

function onDropDown(command: string) {
    if(command === "userinfo") {
        router.push("/person");
        return;
    }
    if(command === "password") {
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
    border-bottom: 1px solid var(--border-dark-color);
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
        & > span {
            font-size: 14px;
        }
        &:hover {
            background-color: var(--item-hover-color);
        }
    }
}
</style>