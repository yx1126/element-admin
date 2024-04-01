<template>
    <el-tooltip placement="top" :content="mode">
        <div class="nav-mode" :class="'nav-mode-' + mode" v-bind="attrs">
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

<script lang="ts">
export default defineComponent({
    name: "NavMode",
    inheritAttrs: false,
});
</script>

<script lang="ts" setup>
import { CheckOutlined } from "@vicons/antd";
import type { NavTheme, LayoutMode } from "#/stores";

const attrs = useAttrs();

withDefaults(
    defineProps<{
        mode?: NavTheme | LayoutMode;
        chose?: boolean;
        color?: string;
    }>(),
    {
        mode: "aside",
        chose: false,
        color: "#409eff",
    },
);
</script>

<style lang="scss" scoped>
$light-color: #fff;
$dark-color: #304156;
$diablo-color: rgba(0, 0, 0, 0.7);
$body-color: #f0f2f5;

.nav-mode {
    width: 45px;
    height: 40px;
    background-color: $body-color;
    border-radius: 4px;
    box-shadow: 0 1px 2.5px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
    position: relative;
    overflow: hidden;
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
        background: $dark-color;
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
        background: $dark-color;
    }
}
.nav-mode-top {
    &::before {
        background: $body-color;
    }
    &::after {
        background: $dark-color;
    }
}
.nav-mode-asideMixin {
    &::before {
        background: $dark-color;
        z-index: 10;
        width: 6px;
    }
    &::after {
        background: $light-color;
    }
}
.nav-mode-asideMixin-item {
    width: 6px;
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
.nav-mode-dark {
    @extend .nav-mode-aside;
}
.nav-mode-diablo {
    background: $dark-color;
    &::before {
        background: $diablo-color;
    }
    &::after {
        background: $diablo-color;
    }
}
</style>