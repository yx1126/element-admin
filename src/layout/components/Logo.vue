<script setup lang="ts">
import { isStr } from "@/utils/validata";

const {
    width = 200,
    height = 50,
    collapsedWidth = 48,
    text = "ElementAdmin",
    indent = 18,
    collapsed,
    minWidth,
} = defineProps<{
    collapsed?: boolean;
    width?: number | string;
    minWidth?: number | string;
    height?: number;
    collapsedWidth?: number;
    text?: string;
    indent?: number;
}>();

const set = useSetStore();

const logoStyle = computed(() => {
    return {
        "--logo-width": collapsed ? collapsedWidth + "px" : isStr(width) ? width : width + "px",
        "--logo-min-width": isStr(minWidth) ? minWidth : minWidth + "px",
        "--logo-height": height + "px",
        "--logo-padding": collapsed ? `0 ${(collapsedWidth - 32) / 2}px` : `0 18px 0 ${indent}px`,
        "--logo-icon-margin-right": collapsed ? 0 : "8px",
        "--logo-text-width": collapsed ? 0 : "auto",
        "--logo-opacity": collapsed ? 0 : 1,
    };
});
</script>

<template>
    <div v-if="set.isShowLogo" class="logo" :style="logoStyle">
        <div class="logo-icon">
            <slot name="icon">
                <Icon :size="32" icon="vue" />
            </slot>
        </div>
        <div class="logo-text">
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
    transition: padding 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
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
        @include when-inverted {
            color: #fff;
        }
    }
}
</style>