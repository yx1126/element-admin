<template>
    <el-menu
        class="menu"
        :collapse="isCollapse"
        :default-active="defaultActive"
        :background-color="darkColor"
        :text-color="textColor"
        :unique-opened="set.uniqueMenuOpened"
        @select="onMenuSelect"
    >
        <menu-item :routes="routeStore.routerList" />
    </el-menu>
    <el-button @click="isCollapse = !isCollapse">Click</el-button>
</template>

<script setup lang="ts">
import MenuItem from "./MenuItem.vue";
import { isLink } from "@/utils/validata";

const { darkColor, textColor } = useThemeColor();
const router = useRouter();
const route = useRoute();
const routeStore = useRouteStore();
const set = useSetStore();

const defaultActive = computed(() => route.fullPath);

const isCollapse = ref(false);

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
    width: 220px;
    max-width: 220px;
    &.el-menu--collapse {
        width: 64px;
    }
}
</style>