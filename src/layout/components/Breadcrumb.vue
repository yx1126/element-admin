<script setup lang="ts">
import { formatMenuTitle } from "@/utils/route";
import { Configs } from "@/config";

defineOptions({
    name: "Breadcrumb",
});

defineProps<{
    inverted?: boolean;
}>();

const route = useRoute();
const router = useRouter();
const set = useSetStore();

const breadcrumbList = computed(() => {
    if(route.fullPath.startsWith("/redirect")) return [];
    const list = route.matched?.filter(r => r.path && r.meta.title) || [];
    const current = list.at(-1);
    const title = formatMenuTitle(route.query[Configs.queryKey], current?.meta?.title) || current?.meta?.title;
    return [
        ...list.slice(0, -1),
        {
            ...current,
            meta: {
                ...current?.meta,
                title,
            },
        },
    ];
});

function onCommand(path: string) {
    router.push(path);
}
</script>

<template>
    <el-breadcrumb class="breadcrumb" :class="{ 'is-inverted': inverted }">
        <TransitionGroup name="list-breadcrumb">
            <template v-for="b in breadcrumbList" :key="b.path">
                <el-breadcrumb-item class="breadcrumb-item">
                    <Icon v-if="set.isShowBreadIcon && b.meta?.icon" :icon="b.meta.icon" size="16" />
                    <el-dropdown v-if="b.children?.length" :persistent="false" trigger="click" @command="onCommand">
                        <span class="title">{{ b.meta.title }}</span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <template v-for="item in b.children" :key="item.path">
                                    <el-dropdown-item :command="item.path">
                                        <Icon v-if="set.isShowBreadIcon && item.meta?.icon" :icon="item.meta?.icon" />
                                        {{ item.meta?.title }}
                                    </el-dropdown-item>
                                </template>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <span v-else class="title">{{ b?.meta?.title }}</span>
                </el-breadcrumb-item>
            </template>
        </TransitionGroup>
    </el-breadcrumb>
</template>

<style lang="scss" scoped>
.breadcrumb {
    position: relative;
    :deep(.el-breadcrumb__item) {
        .el-breadcrumb__inner {
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
        }
        .el-breadcrumb__inner,
        .el-dropdown {
            color: inherit;
        }
        &:not(:last-child) .el-breadcrumb__inner {
            cursor: pointer;
            &:hover {
                color: var(--el-color-primary);
            }
        }
    }
}
</style>