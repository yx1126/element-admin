<template>
    <el-menu
        class="menu"
        :collapse="isCollapse"
        :default-active="defaultActive"
        :background-color="darkColor"
        :text-color="textColor"
        @select="onMenuSelect"
    >
        <el-sub-menu index="/dashboard">
            <template #title>
                <el-icon><ele-location /></el-icon>
                <span style="width: 150px;">Dashboard</span>
            </template>
            <el-menu-item index="/dashboard/console">
                <el-icon><ele-document /></el-icon>
                <span>主控台</span>
            </el-menu-item>
            <el-menu-item index="/dashboard/workbench">
                <el-icon><ele-setting /></el-icon>
                <span>工作台</span>
            </el-menu-item>
        </el-sub-menu>
    </el-menu>
    <el-button @click="isCollapse = !isCollapse">Click</el-button>
</template>

<script setup lang="ts">
const { darkColor, textColor } = useThemeColor();
const router = useRouter();
const route = useRoute();

const defaultActive = computed(() => route.fullPath);

const isCollapse = ref(false);

function onMenuSelect(index: string) {
    router.push(index);
}
</script>

<style lang="scss" scoped>
.menu {
    border: none;
    max-width: 220px;
}
</style>