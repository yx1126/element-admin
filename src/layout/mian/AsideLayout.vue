<template>
    <el-container class="layout-container">
        <el-aside class="layout-aside" style="--el-aside-width: auto;">
            <el-scrollbar>
                <Menu />
            </el-scrollbar>
        </el-aside>
        <el-container>
            <el-header>Header</el-header>
            <el-main>
                <el-button type="primary">click</el-button>
                <slot></slot>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import Menu from "../components/menu";
</script>

<style lang="scss" scoped>
.layout-container {
    height: 100%;
}

.layout-aside {
    background-color: #001428;
    overflow: hidden;
}
</style>