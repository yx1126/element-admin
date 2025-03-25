<script setup lang="ts">
import { formatMenuTitle } from "@/utils/route";
import { Configs } from "@/config";
import type { MenuItem } from "#/menu";

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
    const list = route.meta.matched?.filter(r => r.path && r.title) || [];
    const current: Partial<MenuItem> = list.at(-1) || { title: route.meta.title, path: route.fullPath, children: [], icon: route.meta.icon };
    const title = formatMenuTitle(route.query[Configs.queryKey], current?.title) || current?.title;
    return [
        ...list.slice(0, -1),
        {
            ...current,
            title,
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
                    <Icon v-if="set.isShowBreadIcon && b.icon" :icon="b.icon" size="16" />
                    <el-dropdown v-if="b.children?.length" :persistent="false" trigger="click" @command="onCommand">
                        <span class="title">{{ b.title }}</span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <template v-for="item in b.children" :key="item.path">
                                    <el-dropdown-item :command="item.path">
                                        <Icon v-if="set.isShowBreadIcon && item.icon" :icon="item.icon" />
                                        {{ item.title }}
                                    </el-dropdown-item>
                                </template>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <span v-else class="title">{{ b.title }}</span>
                </el-breadcrumb-item>
            </template>
        </TransitionGroup>
    </el-breadcrumb>
</template>

<style lang="scss" scoped>
.breadcrumb {
    position: relative;
    :deep(.el-breadcrumb__item){
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