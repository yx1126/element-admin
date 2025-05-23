<script setup lang="ts">
import MenuItem from "./MenuItem";
import { isLink } from "@/utils/validata";
import { Configs } from "@/config";
import { parseUnit } from "@/utils/unit";
import { parseIcon } from "@/utils/route";
import type { NavTheme } from "#/stores";
import type { MenuItem as MenuItemType } from "#/system";

const { width, theme, type, options } = defineProps<{
    collapse?: boolean;
    width?: Unit;
    mode?: "horizontal" | "vertical";
    theme?: NavTheme;
    type?: "default" | "root" | "children";
    options?: MenuItemType[];
}>();

const emit = defineEmits<{
    menuItemHover: [MenuItemType, number, MouseEvent];
}>();

const menuRef = useTemplateRef("menuRef");
const router = useRouter();
const route = useRoute();
const user = useUserStore();
const set = useSetStore();
const tags = useTagStore();

const routerList = computed(() => {
    if(options) return options;
    if(type === "root") {
        return user.routerList.map(v => {
            const first = v.children?.at(0);
            return {
                ...v,
                path: first?.path || v.path,
                // isIframe: isLink(first?.path) ? first?.isIframe : v.isIframe,
                children: [],
            };
        });
    }
    if(type === "children") {
        // 刷星页面取上个页面子菜单
        if(route.fullPath.startsWith("/redirect") && tags.oldRoute) {
            const parentPath = "/" + tags.oldRoute.split("/").at(1);
            const parent = user.routerList.find(v => v.path === parentPath);
            return parseIcon(parent?.children, parent);
        }
        const parent = user.routerList.find(v => v.path === route.matched[1]?.path);
        return parseIcon(parent?.children, parent);
    }
    return user.routerList;
});
const defaultActive = computed(() => {
    if(type === "root") {
        return route.matched[1]?.children.at(0)?.path || route.matched[1]?.path;
    }
    return route.fullPath;
});
const themeType = computed(() => theme ?? set.navMode);

function onMenuSelect(index: string, menu: MenuItemType) {
    if(isLink(menu.link) && menu.isIframe === "0") {
        window.open(menu.link, menu.title, "noopener,noreferrer");
        nextTick(() => {
            // @ts-ignore
            menuRef.value?.updateActiveIndex(defaultActive.value);
        });
        return;
    }
    router.push(index);
}

function onMouseenter(item: MenuItemType, i: number, e: MouseEvent) {
    emit("menuItemHover", item, i, e);
}
</script>

<!--
    el-memu 下不要直接使用 MenuItem(注释也会导致宽度计算有问题) 组件
    会导致 horizontal 模式下动态省略菜单失效
-->

<template>
    <el-menu
        ref="menuRef"
        class="menu"
        :class="[
            themeType ? `menu-theme-${themeType}`: '',
            type ? `menu-type--${type}` : ''
        ]"
        :style="{
            '--menu-width': parseUnit(width, Configs.menuWidth),
            '--menu-height': `${Configs.headerHeight}px`,
        }"
        :mode
        :collapse
        :default-active="defaultActive"
        :unique-opened="set.uniqueMenuOpened"
        :show-timeout="100"
        :popper-class="'el-menu-aside ' + (themeType ? `menu-theme-${themeType}`: '')"
    >
        <template v-for="menu, i in routerList">
            <el-sub-menu v-if="menu.children && menu.children?.length > 0" :key="menu.path" :index="menu.path">
                <template #title>
                    <Icon v-if="menu.icon" :icon="menu.icon" size="16" />
                    <span :title="menu.title">{{ menu.title }}</span>
                </template>
                <menu-item :routes="menu.children" @menu-click="onMenuSelect" />
            </el-sub-menu>
            <el-menu-item
                v-else
                :key="menu.path + 'menu'"
                :index="menu.path"
                @click="onMenuSelect(menu.path, menu)"
                @mouseenter="onMouseenter(menu, i, $event)"
            >
                <Icon v-if="menu.icon" :icon="menu.icon" size="16" />
                <template #title>
                    <span>{{ menu.title }}</span>
                </template>
            </el-menu-item>
        </template>
    </el-menu>
</template>

<style lang="scss">
%bg-color {
    --el-menu-item-height: 42px;
    --el-menu-sub-item-height: 42px;
    &.menu-theme {
        &-light {
            --el-menu-hover-bg-color: var(--menu-hover-bg-light-color);
        }
        &-inverted {
            --el-menu-bg-color: var(--menu-bg-color);
            --el-menu-hover-bg-color: var(--menu-hover-bg-inverted-color);
            --el-menu-text-color: var(--menu-text-color);
        }
        &-dark {
            --el-menu-hover-bg-color: var(--menu-hover-bg-inverted-color);
        }
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
    .el-menu {
        background-color: transparent;
    }
    @extend %bg-color;
}

.el-menu-aside {
    @extend %bg-color;
}
</style>