<template>
    <el-container>
        <el-aside style="--el-aside-width: auto;">
            <Menu />
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
import Menu from "../components/Menu.vue";
</script>

<style lang="scss" scoped></style>