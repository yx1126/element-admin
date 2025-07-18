<script lang="ts" setup>
import { CheckOutlined } from "@vicons/antd";
import type { NavTheme, LayoutMode } from "#/stores";

defineOptions({
    name: "NavMode",
    inheritAttrs: false,
});

const {
    mode = "aside",
    color = "#409eff",
} = defineProps<{
    mode?: NavTheme | LayoutMode;
    chose?: boolean;
    color?: string;
}>();

const { t } = useLocal();
</script>

<template>
    <el-tooltip placement="top" :content="t(mode)">
        <div class="nav-mode" :class="'nav-mode-' + mode" v-bind="$attrs">
            <div v-if="mode === 'asideMixin'" class="nav-mode-asideMixin-item"></div>
            <div class="nav-icon-box">
                <slot v-if="chose" name="icon">
                    <Icon class="nav-choose" :color="color" size="20">
                        <check-outlined />
                    </Icon>
                </slot>
            </div>
        </div>
    </el-tooltip>
</template>

<style lang="scss" scoped>
$light-color: #fff;
$inverted-color: #{var(--menu-bg-base-color, #304156)};
$dark-color: rgba(0, 0, 0, 0.7);
$body-color: var(--page-bg-color);

.nav-mode {
    width: 45px;
    height: 40px;
    background-color: $body-color;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    box-shadow: var(--el-box-shadow-light);
    @include when-dark {
        box-shadow: var(--el-box-shadow-dark);
    }
    &::before {
        content: "";
        display: block;
        width: 12px;
        height: 100%;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        position: relative;
    }
    &::after {
        content: "";
        display: block;
        width: 100%;
        height: 10px;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        position: absolute;
        top: 0;
    }
}
.nav-icon-box {
    width: 32px;
    height: 30px;
    position: absolute;
    bottom: 0;
    right: 0;
    border-bottom-right-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.nav-choose {
    font-weight: bold;
}
.nav-mode-aside {
    &::before {
        background: $inverted-color;
        z-index: 10;
    }
    &::after {
        background: $light-color;
    }
}
.nav-mode-mixin {
    &::before {
        background: $light-color;
    }
    &::after {
        background: $inverted-color;
    }
}
.nav-mode-top {
    &::before {
        background: $body-color;
    }
    &::after {
        background: $inverted-color;
    }
}
.nav-mode-asideMixin {
    &::before {
        background: $inverted-color;
        z-index: 10;
        width: 6px;
    }
    &::after {
        background: $light-color;
    }
}
.nav-mode-asideMixin-item {
    width: 10px;
    height: 100%;
    background-color: $light-color;
    position: absolute;
    left: 6px;
    bottom: 0;
}
.nav-mode-light {
    &::before {
        background: $light-color;
    }
    &::after {
        background: $light-color;
    }
}
.nav-mode-inverted {
    @extend .nav-mode-aside;
}
.nav-mode-dark {
    background: $inverted-color;
    &::before {
        background: $dark-color;
    }
    &::after {
        background: $dark-color;
    }
}
</style>

<i18n lang="yaml">
zh:
  light: 亮色主题
  inverted: 暗色主题
  dark: 暗黑主题
  aside: 左侧菜单模式
  top: 顶部菜单模式
  mixin: 混合模式
  asideMixin: 左侧菜单混合模式
en:
  light: Light Theme
  inverted: Inverted Theme
  dark: Dark Theme
  aside: Left Menu Mode
  top: Top Menu Mode
  mixin: Blending Mode
  asideMixin: Left menu blending mode
</i18n>