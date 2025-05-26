<script setup lang="ts">
import { SettingOutlined, CloseOutlined } from "@vicons/antd";
import { routerTransList, setPlacementLiist } from "@/stores";
import { useZIndex } from "element-plus";
import NavMode from "./NavMode.vue";
import { navTheme, layoutMode } from "@/stores/helper";
import LangSelect from "../LangSelect";
import { Configs } from "@/config";

defineOptions({
    name: "Setting",
});

const set = useSetStore();
const { lang } = useLocales();
const { currentZIndex } = useZIndex();
const { t } = useLocal();
const { theme, themeColor, menuThemeColor } = useTheme();
const mitt = useMitt("toggleSetting");

const isShowDrawer = computed({
    get: () => set.isShowDrawer,
    set: v => set.setState("isShowDrawer", v),
});

const isInvertedDisabled = computed(() => {
    return !(set.navMode === "inverted" && set.layoutMode !== "top");
});

const drawerStyles = computed(() => {
    return {
        "--drawer-set-color": set.themeColor,
        "z-index": currentZIndex.value,
        right: isShowDrawer.value ? "280px" : "0",
    };
});

mitt.on(() => {
    isShowDrawer.value = !isShowDrawer.value;
});

function onDrawerClose() {
    isShowDrawer.value = false;
}

function onReset() {
    set.$reset();
    lang.value = set.lang;
}
</script>

<template>
    <div
        v-if="['default', 'drawer'].includes(set.setPlacement)"
        v-drag="{ axis: 'y', eventType: 'right', moveOver: false }"
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
        :title="t('title')"
        :lock-scroll="false"
        modal-class="drawer-wrapper"
        :show-close="false"
        append-to-body
        destroy-on-close
        @close="onDrawerClose"
    >
        <template #footer>
            <el-popconfirm width="200" :title="t('confirmSet')" :hide-after="0" @confirm="onReset">
                <template #reference>
                    <el-button>{{ t('reset') }}</el-button>
                </template>
            </el-popconfirm>
        </template>
        <el-scrollbar>
            <div class="drawer-set-container">
                <el-divider>{{ t("navTheme") }}</el-divider>
                <div class="flex justify-center gap-x-[8px] gap-y-[12px]">
                    <template v-for="n in navTheme" :key="n">
                        <nav-mode :mode="n" :chose="theme === n" :color="set.themeColor" @click="theme = n" />
                    </template>
                </div>
                <el-divider>{{ t("sysTheme") }}</el-divider>
                <!-- <div class="flex justify-center">
                    <el-color-picker v-model="themeColor" class="color-picker" :predefine="Configs.themes" />
                    </div> -->
                <div class="divider-content-item">
                    <el-text>{{ t("sysTheme") }}</el-text>
                    <el-color-picker v-model="themeColor" class="color-picker" :predefine="Configs.themes" />
                </div>
                <div class="divider-content-item mt-[10px]">
                    <el-text>{{ t("menuTheme") }}</el-text>
                    <el-color-picker v-model="menuThemeColor" class="color-picker" :predefine="Configs.themes" />
                </div>
                <el-divider>{{ t("layoutMode") }}</el-divider>
                <div class="flex justify-center gap-x-[8px] gap-y-[12px]">
                    <template v-for="n in layoutMode" :key="n">
                        <nav-mode :mode="n" :chose="set.layoutMode === n" :color="set.themeColor" @click="set.layoutMode = n" />
                    </template>
                </div>
                <el-divider>{{ t("pageDisplay") }}</el-divider>
                <div class="divider-content-item">
                    <el-text>{{ t("isShowLogo") }}</el-text>
                    <el-switch v-model="set.isShowLogo" />
                </div>
                <div class="divider-content-item">
                    <el-text>{{ t("isShowBreadcrumb") }}</el-text>
                    <el-switch v-model="set.isShowBreadcrumb" />
                </div>
                <div class="divider-content-item">
                    <el-text>{{ t("isShowBreadIcon") }}</el-text>
                    <el-switch v-model="set.isShowBreadIcon" />
                </div>
                <div class="divider-content-item">
                    <el-text>{{ t("isShowTabs") }}</el-text>
                    <el-switch v-model="set.isShowTabs" />
                </div>
                <div class="divider-content-item">
                    <el-text>{{ t("isShowTabsIcon") }}</el-text>
                    <el-switch v-model="set.isShowTabsIcon" />
                </div>
                <el-divider>{{ t("pageFunction") }}</el-divider>
                <div class="divider-content-item">
                    <el-text>{{ t("isKeepHeader") }}</el-text>
                    <el-switch v-model="set.isKeepHeader" :disabled="['mixin', 'asideMixin'].includes(set.layoutMode)" />
                </div>
                <div class="divider-content-item">
                    <el-text>{{ t("isKeepTags") }}</el-text>
                    <el-switch v-model="set.isKeepTags" :disabled="!set.isShowTabs" />
                </div>
                <div class="divider-content-item">
                    <el-text>{{ t("isCutMenu") }}</el-text>
                    <el-switch v-model="set.isCutMenu" :disabled="set.layoutMode !== 'mixin'" />
                </div>
                <div class="divider-content-item">
                    <el-text>{{ t("uniqueMenuOpened") }}</el-text>
                    <el-switch v-model="set.uniqueMenuOpened" />
                </div>
                <div class="divider-content-item">
                    <el-text>{{ t("inverted") }}</el-text>
                    <el-switch v-model="set.inverted" :disabled="isInvertedDisabled" />
                </div>
                <el-divider>{{ t("otherSet") }}</el-divider>
                <div class="divider-content-item">
                    <el-text>{{ t("watermark") }}</el-text>
                    <el-switch v-model="set.isShowWatermark" />
                </div>
                <div class="divider-content">
                    <div class="divider-content-item">
                        <el-text>{{ t("routerTrans") }}</el-text>
                        <el-select v-model="set.routerTrans" class="input">
                            <el-option
                                v-for="item, i in routerTransList"
                                :key="i"
                                :value="item.value"
                                :label="item.label"
                            />
                        </el-select>
                    </div>
                    <div class="divider-content-item mt-[10px]">
                        <el-text>{{ t("lang") }}</el-text>
                        <lang-select class="input" />
                    </div>
                    <div class="divider-content-item mt-[10px]">
                        <el-text>{{ t("setting") }}</el-text>
                        <el-select v-model="set.setPlacement" class="input">
                            <el-option
                                v-for="item in setPlacementLiist"
                                :key="item"
                                :value="item"
                                :label="item"
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
    padding: 0 15px 10px;
    .divider-content {
        &-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            .input {
                min-width: 120px;
                --el-select-width: 120px;
            }
        }
    }
}
:deep(.color-picker .el-color-picker__trigger) {
    width: 120px;
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
  navTheme: 主题
  sysTheme: 系统主题
  menuTheme: 菜单主题
  layoutMode: 导航模式
  pageDisplay: 界面显示
  isShowLogo: 显示 Logo
  isShowBreadcrumb: 显示 面包屑
  isShowBreadIcon: 显示 面包屑图标
  isShowTabs: 显示 标签页
  isShowTabsIcon: 显示 标签页图标
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
  setting: 设置位置
  watermark: 水印
en:
  title: Project Configuration
  navTheme: Theme
  sysTheme: System Theme
  menuTheme: Menu Theme
  layoutMode: Navigation Mode
  pageDisplay: Page Display
  isShowLogo: Show logo
  isShowBreadcrumb: Show breadcrumb
  isShowBreadIcon: Show breadcrumb icon
  isShowTabs: Show tabs
  isShowTabsIcon: Show tabs icon
  pageFunction: Page Function
  isKeepHeader: Fixed the top bar
  isKeepTags: Fixed tabs
  isCutMenu: Split the menu
  uniqueMenuOpened: Keep a submenu open
  otherSet: Other Settings
  routerTrans: Routing animation
  themeColor: Component theme
  reset: Reset
  lang: Language switching
  confirmSet: Are you sure to restore the default Settings?
  inverted: Reverse background color
  setting: Set position
  watermark: Watermark
</i18n>