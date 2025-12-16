<script setup lang="ts">
import { parseNum, parseUnit } from "@/utils/unit";
import type { NavTheme } from "#/stores";

const {
    width = 200,
    height = 50,
    collapsedWidth = 64,
    text = import.meta.env.VITE_APP_TITLE,
    indent = 18,
    collapsed,
    minWidth,
    showText = true,
    size = 32,
} = defineProps<{
    collapsed?: boolean;
    width?: Unit;
    minWidth?: Unit;
    height?: Unit;
    collapsedWidth?: Unit;
    text?: string;
    indent?: number;
    showText?: boolean;
    theme?: NavTheme;
    size?: Unit;
}>();

const slots = defineSlots<Slotsable<"default" | "icon">>();

const logoStyle = computed(() => {
    const cw = parseNum(collapsedWidth);
    return {
        "--logo-width": parseUnit(collapsed ? collapsedWidth : width),
        "--logo-min-width": parseUnit(minWidth),
        "--logo-height": parseUnit(height),
        "--logo-padding": collapsed ? `0 ${(cw - parseNum(size)) / 2}px` : `0 18px 0 ${indent}px`,
        "--logo-icon-margin-right": collapsed ? 0 : "8px",
        "--logo-text-width": collapsed ? 0 : "auto",
        "--logo-opacity": collapsed ? 0 : 1,
    };
});
</script>

<template>
    <div class="logo" :class="{ [`is-${theme}`]: !!theme }" :style="logoStyle">
        <div class="logo-icon" :title="text">
            <slot name="icon">
                <Icon :size icon="vue" />
            </slot>
        </div>
        <div v-if="showText && (slots.default || text)" class="logo-text">
            <slot>{{ text }}</slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.logo {
    width: var(--logo-width);
    min-width: var(--logo-min-width);
    height: var(--logo-height);
    display: flex;
    align-items: center;
    padding: var(--logo-padding);
    transition:
        padding 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        width 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        color var(--el-transition-duration);
    position: relative;
    @include when(inverted) {
        .logo-text {
            color: #fff;
        }
    }
    &-icon {
        margin-right: var(--logo-icon-margin-right);
        display: flex;
        align-items: center;
        transition: margin-right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    &-text {
        width: var(--logo-text-width);
        opacity: var(--logo-opacity);
        white-space: nowrap;
        transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
}
</style>