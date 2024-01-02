<template>
    <el-menu
        class="menu"
        :collapse="isCollapse"
        default-active="2"
        :background-color="darkColor"
        :text-color="lightColor"
    >
        <el-sub-menu index="1">
            <template #title>
                <el-icon><ele-location /></el-icon>
                <span>Navigator One</span>
            </template>
            <el-menu-item-group title="Group One">
                <el-menu-item index="1-1">item one</el-menu-item>
                <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
                <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
                <template #title>item four</template>
                <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
            <el-icon><ele-menu /></el-icon>
            <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
            <el-icon><ele-document /></el-icon>
            <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
            <el-icon><ele-setting /></el-icon>
            <span>Navigator Four</span>
        </el-menu-item>
    </el-menu>
    <el-button @click="isCollapse = !isCollapse">Click</el-button>
</template>

<script setup lang="ts">
const isCollapse = ref(false);

const { darkColor, lightColor } = useThemeColor();
// #001428
</script>

<style lang="scss" scoped>
.menu {
    border: none;
}
</style>