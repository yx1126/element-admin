<script setup lang="ts">
import MenuItem from "./MenuItem";
import { isLink } from "@/utils/validata";
import { LayoutConfig } from "@/config";
import { parseUnit } from "@/utils/unit";
import type { NavTheme } from "#/stores";

const { width, theme, type } = defineProps<{
    width?: Unit;
    mode?: "horizontal" | "vertical";
    theme?: NavTheme;
    type?: "default" | "root" | "children";
}>();

const router = useRouter();
const route = useRoute();
const routeStore = useUserStore();
const set = useSetStore();

const routerList = computed(() => {
    if(type === "root") {
        return routeStore.routerList.map(v => {
            return {
                ...v,
                path: v.children?.at(0)?.path || v.path,
                children: [],
            };
        });
    }
    if(type === "children") {
        const parent = routeStore.routerList.find(v => v.path === route.matched[1]?.path);
        return (parent?.children || []).map(v => ({
            ...v,
            meta: {
                ...v.meta,
                icon: v.meta?.icon || parent?.meta?.icon,
            },
        }));
    }
    return routeStore.routerList;
});
const defaultActive = computed(() => {
    if(type === "root") {
        return route.matched[1]?.children.at(0)?.path || route.matched[1]?.path;
    }
    return route.fullPath;
});
const themeType = computed(() => theme ?? set.navMode);
const isCollapse = computed(() => {
    return set.layoutMode === "top" || type === "root" ? false : set.collapsed;
});

function onMenuSelect(index: string) {
    if(isLink(index)) {
        window.open(index);
        return;
    }
    router.push(index);
}
</script>

<!--
    el-memu 下不要直接使用 MenuItem(注释也会导致宽度计算有问题) 组件
    会导致 horizontal 模式下动态省略菜单失效
-->

<template>
    <el-menu
        class="menu"
        :class="[
            themeType ? `is-${themeType}`: '',
            type ? `menu-type--${type}` : ''
        ]"
        :style="{
            '--menu-width': parseUnit(width, LayoutConfig.menuWidth),
            '--menu-height': `${LayoutConfig.headerHeight}px`,
        }"
        :mode
        :collapse="isCollapse"
        :default-active="defaultActive"
        :unique-opened="set.uniqueMenuOpened"
        :show-timeout="100"
        :popper-class="'el-menu-aside' + (themeType ? ` is-${themeType}`: '')"
        @select="onMenuSelect"
    >
        <template v-for="menu in routerList">
            <el-sub-menu v-if="menu.children && menu.children?.length > 0" :key="menu.path" :index="menu.path">
                <template #title>
                    <Icon v-if="menu.meta?.icon" :icon="menu.meta.icon" size="16" />
                    <span :title="menu.meta?.title">{{ menu.meta?.title }}</span>
                </template>
                <menu-item :routes="menu.children" />
            </el-sub-menu>
            <el-menu-item v-else :key="menu.path + 'menu'" :index="menu.path">
                <Icon v-if="menu.meta?.icon" :icon="menu.meta.icon" size="16" />
                <span :title="menu.meta?.title">{{ menu.meta?.title }}</span>
            </el-menu-item>
        </template>
    </el-menu>
</template>

<style lang="scss">
%bg-color {
    --el-menu-item-height: 42px;
    --el-menu-sub-item-height: 42px;
    @include when(light) {
        --el-menu-hover-bg-color: var(--menu-hover-bg-light-color);
    }
    @include when(inverted) {
        --el-menu-bg-color: var(--menu-bg-color);
        --el-menu-hover-bg-color: var(--menu-hover-bg-inverted-color);
        --el-menu-text-color: var(--menu-text-color);
    }
    @include when(dark) {
        --el-menu-hover-bg-color: var(--menu-hover-bg-inverted-color);
    }
}

.menu {
    border: none;
    --el-menu-horizontal-height: var(--menu-height);
    background-color: transparent;
    &.el-menu--vertical:not(.el-menu--collapse) {
        width: var(--menu-width);
        max-width: var(--menu-width);
    }
    :deep(.el-menu) {
        background-color: transparent;
    }
    @extend %bg-color;
}

.el-menu-aside {
    @extend %bg-color;
}
</style>