<script setup lang="ts">
import { SettingOutlined, CloseOutlined } from "@vicons/antd";
import { routerTransList } from "@/stores/modules/setting";
import { useZIndex } from "element-plus";
import Icon from "@/components/Icon";
import NavMode from "./NavMode.vue";
import { navTheme } from "@/stores/helper";
import { langList } from "@/locales";

defineOptions({
    name: "Setting",
});

const set = useSetStore();
const { nextZIndex } = useZIndex();

const { t, locale } = useI18n();

const isShowDrawer = computed({
    get: () => set.isShowDrawer,
    set: v => set.setState("isShowDrawer", v),
});

const drawerStyles = computed(() => {
    return {
        "--drawer-set-color": set.themeColor,
        "z-index": nextZIndex(),
        right: isShowDrawer.value ? "280px" : "0",
    };
});

function onDrawerClose() {
    isShowDrawer.value = false;
}

function onLangChange(value: string) {
    locale.value = value;
}
</script>

<template>
    <div
        v-drag="{ axis: 'y', eventType: 'right' }"
        class="drawer-set"
        :style="drawerStyles"
        @click="isShowDrawer = !isShowDrawer"
    >
        <Icon :size="26" color="#fff">
            <close-outlined v-if="isShowDrawer" />
            <setting-outlined v-else />
        </Icon>
    </div>
    <el-drawer
        v-model="isShowDrawer"
        modal-class="drawer-wrapper"
        :show-close="false"
        append-to-body
        @close="onDrawerClose"
    >
        <template #header>
            <span>{{ t("title") }}</span>
        </template>
        <el-scrollbar>
            <div class="drawer-set-container">
                <el-divider>{{ t("navTheme") }}</el-divider>
                <div class="flex justify-center gap-x-[8px] gap-y-[12px]">
                    <template v-for="n in navTheme" :key="n">
                        <nav-mode :mode="n" :chose="set.navMode === n" :color="set.themeColor" @click="set.navMode = n" />
                    </template>
                </div>
                <el-divider>{{ t("layoutMode") }}</el-divider>
                <el-divider>{{ t("pageDisplay") }}</el-divider>
                <el-divider>{{ t("pageFunction") }}</el-divider>
                <el-divider>{{ t("otherSet") }}</el-divider>
                <div class="divider-content">
                    <div class="divider-content-item">
                        <el-text>{{ t("routerTrans") }}</el-text>
                        <el-select
                            v-model="set.routerTrans"
                            class="input"
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item, i in routerTransList"
                                :key="i"
                                :value="item.value"
                                :label="item.label"
                            />
                        </el-select>
                    </div>
                    <div class="divider-content-item">
                        <el-text>{{ t("lang") }}</el-text>
                        <el-select
                            v-model="set.lang"
                            class="input"
                            placeholder="请选择"
                            @change="onLangChange"
                        >
                            <el-option
                                v-for="item, i in langList"
                                :key="i"
                                :value="item.value"
                                :label="item.label"
                            />
                        </el-select>
                    </div>
                </div>
            </div>
        </el-scrollbar>
    </el-drawer>
</template>

<style lang="scss" scoped>
.drawer-set {
    width: 48px;
    height: 48px;
    background: var(--drawer-set-color);
    cursor: pointer;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    transition: right .3s;
}
.drawer-set-container {
    padding: 0 15px;
    .divider-content {
        &-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            &:not(:last-child) {
                margin-bottom: 15px;
            }
            .input {
                width: 120px;
            }
        }
    }
}
</style>

<style lang="scss">
.drawer-wrapper {
    .el-drawer {
        width: 280px !important;
    }
    .el-drawer__body {
        padding: 0;
    }
}
</style>

<i18n lang="yaml">
zh:
  title: 项目配置
  navTheme: 系统主题
  layoutMode: 导航模式
  pageDisplay: 界面显示
  isShowLogo: 显示 Logo
  isShowBreadcrumb: 显示 面包屑
  isShowTabs: 显示 标签页
  pageFunction: 界面功能
  isKeepHeader: 固定顶栏
  isKeepTags: 固定标签页
  isCutMenu: 分割菜单
  uniqueMenuOpened: 保持一个子菜单的展开
  otherSet: 其他设置
  routerTrans: 路由动画
  themeColor: 组件主题
  reset: 还原设置
  lang: 语言切换
  confirmSet: 确认还原为默认设置吗？
  inverted: 反转背景色
  menuTrigger: 菜单 trigger
enUS:
  title: Project configuration
  navTheme: System theme
  layoutMode: Navigation mode
  pageDisplay: Page Display
  isShowLogo: Show Logo
  isShowBreadcrumb: Show Breadcrumb
  isShowTabs: Show Tabs
  pageFunction: Page Function
  isKeepHeader: Fixed the top bar
  isKeepTags: Fixed Tabs
  isCutMenu: Split the menu
  uniqueMenuOpened: Keep a submenu open
  otherSet: Other Settings
  routerTrans: Routing animation
  themeColor: Component theme
  reset: reset
  lang: Language switching
  confirmSet: Are you sure to restore the default Settings?
  inverted: Reverse background color
  menuTrigger: menu trigger
</i18n>