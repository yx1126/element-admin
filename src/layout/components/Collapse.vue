<script lang="ts" setup>
import MenuFoldOutlined from "@vicons/antd/MenuFoldOutlined";
import MenuUnfoldOutlined from "@vicons/antd/MenuUnfoldOutlined";
import { parseUnit, parseNum } from "@/utils/unit";
import type { CSSProperties } from "vue";
import type { Direction } from "#/views";

const {
    width = 200,
    height = 42,
    collapsedWidth = 50,
    size = 22,
} = defineProps<{
    mode?: "collapse" | "menu";
    width?: Unit;
    height?: Unit;
    collapsedWidth?: Unit;
    size?: Unit;
    inverted?: boolean;
    border?: Direction;
}>();

const set = useSetStore();

const mixinStyle = computed<CSSProperties>(() => {
    const cw = parseNum(collapsedWidth);
    const s = parseNum(size);
    return {
        "--collapse-width": parseUnit(set.collapsed ? collapsedWidth : width),
        "--collapse-height": parseUnit(height),
        "--collapse-padding": `0 ${(Math.max(cw - s, 0)) / 2}px`,
    };
});

function onClick() {
    set.collapsed = !set.collapsed;
}
</script>

<template>
    <div
        class="collapse pointer"
        :class="[
            border ? `collapse-border--${border}` : '',
            {
                'is-inverted': inverted,
                'is-border': border,
            }
        ]"
        :style="mixinStyle"
        @click="onClick"
    >
        <Icon class="collapse-icon" :size="size">
            <component :is="set.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
        </Icon>
    </div>
</template>

<style lang="scss" scoped>
.collapse {
    width: var(--collapse-width);
    height: var(--collapse-height);
    padding: var(--collapse-padding);
    display: flex;
    align-items: center;
    transition:
        width 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        color var(--el-transition-duration),
        background-color var(--el-transition-duration) !important;
    @include hover;
    // 翻转背景色
    @include when-inverted {
        @include when(inverted) {
            color: #fff;
            &:hover {
                background-color: var(--menu-hover-bg-inverted-color);
            }
        }
    }
    @each $var in top, right, bottom, left {
        &-border--#{$var} {
            @include border($var, var(--border-light-color)) {
                @include when-dark {
                    background-color: var(--border-dark-color);
                }
            }
            @include when-inverted {
                @include when(inverted) {
                    &::after {
                        background-color: transparent;
                    }
                }
            }
        }
    }
}
</style>