<template>
    <el-menu
        class="menu"
        :collapse="isCollapse"
        :default-active="defaultActive"
        :unique-opened="set.uniqueMenuOpened"
        popper-class="el-menu-aside"
        @select="onMenuSelect"
    >
        <menu-item :routes="routeStore.routerList" />
    </el-menu>
</template>

<script setup lang="ts">
import MenuItem from "./MenuItem";
import { isLink } from "@/utils/validata";

const router = useRouter();
const route = useRoute();
const routeStore = useUserStore();
const set = useSetStore();

const defaultActive = computed(() => route.fullPath);

const isCollapse = computed(() => set.collapsed);

function onMenuSelect(index: string) {
    if(isLink(index)) {
        window.open(index);
        return;
    }
    router.push(index);
}
</script>

<style lang="scss" scoped>
.menu {
    border: none;
    width: 200px;
    max-width: 200px;
    --el-menu-item-height: 42px;
    --el-menu-sub-item-height: 42px;
    @include when-inverted {
        --el-menu-bg-color: var(--menu-bg-color);
        --el-menu-hover-bg-color: var(--menu-hover-bg-inverted-color);
        --el-menu-text-color: var(--menu-text-color);
    }
    @include when-dark {
        --el-menu-hover-bg-color: var(--menu-hover-bg-inverted-color);
    }
    @include when-light {
        --el-menu-hover-bg-color: var(--menu-hover-bg-light-color);
    }
    &.el-menu--collapse {
        width: 64px;
    }
}
</style>

<style lang="scss">
.el-menu-aside {
    --el-menu-item-height: 42px;
    --el-menu-sub-item-height: 42px;
    .el-menu.el-menu--popup {
        @include when-light {
            --el-menu-hover-bg-color: var(--menu-hover-bg-light-color);
        }
        @include when-dark {
            --el-menu-hover-bg-color: var(--menu-hover-bg-inverted-color);
        }
        @include when-inverted {
            --el-menu-bg-color: var(--menu-bg-color);
            --el-menu-hover-bg-color: var(--menu-hover-bg-inverted-color);
            --el-menu-text-color: var(--menu-text-color);
        }
    }
}
</style>