<script setup lang="ts">
import Menu from "../components/menu/index.vue";
import Header from "../components/header/index.vue";
import Logo from "../components/Logo.vue";

const set = useSetStore();
</script>

<template>
    <el-container class="layout-container">
        <el-aside class="layout-aside" style="--el-aside-width: auto;">
            <Logo :collapsed="set.collapsed" :collapsed-width="64" :indent="16" />
            <el-scrollbar :class="{ 'layout-aside-scrollbar': set.isShowLogo }">
                <Menu />
            </el-scrollbar>
        </el-aside>
        <el-container>
            <el-header height="50px">
                <Header />
            </el-header>
            <el-main>
                <slot />
            </el-main>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
    height: 100%;
}

.layout-aside {
    background-color: var(--menu-bg-color);
    overflow: hidden;
    border-right: 1px solid var(--border-dark-color);
    &-scrollbar {
        height: calc(100% - 50px);
    }
}
</style>