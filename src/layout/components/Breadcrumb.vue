<script setup lang="ts">
defineOptions({
    name: "Breadcrumb",
});

const set = useSetStore();
const route = useRoute();
const router = useRouter();

const breadcrumbList = computed(() => {
    return route.matched.filter(r => r.path && r.meta.title);
});

function onCommand(path: string) {
    router.push(path);
}
</script>

<template>
    <el-breadcrumb v-if="set.isShowBreadcrumb && set.layoutMode !== 'top'" class="breadcrumb">
        <template v-for="b in breadcrumbList" :key="b.path">
            <el-breadcrumb-item class="breadcrumb-item">
                <el-dropdown v-if="b.children?.length" @command="onCommand">
                    <span>{{ b.meta?.title }}</span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <template v-for="item in b.children" :key="item.path">
                                <el-dropdown-item :command="item.path">{{ item.meta?.title }}</el-dropdown-item>
                            </template>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <span v-else>{{ b.meta?.title }}</span>
            </el-breadcrumb-item>
        </template>
    </el-breadcrumb>
</template>

<style lang="scss" scoped>
.breadcrumb :deep(.el-breadcrumb__item:not(:last-child)) .el-breadcrumb__inner{
    cursor: pointer;
}
</style>