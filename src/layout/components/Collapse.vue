<template>
    <div class="collapse cursor-pointer" :class="{ 'center': mode === 'collapse' }" :style="collapseStyle" @click="onClick">
        <Icon class="collapse-icon" :size="size">
            <component :is="set.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
        </Icon>
    </div>
</template>

<script setup lang="ts">
import MenuFoldOutlined from "@vicons/antd/MenuFoldOutlined";
import MenuUnfoldOutlined from "@vicons/antd/MenuUnfoldOutlined";
import { parseUnit } from "@/utils/unit";

const props = withDefaults(defineProps<{
    mode?: "collapse" | "menu";
    width?: Unit;
    height?: Unit;
    collapsedWidth?: Unit;
    size?: Unit;
}>(), {
    width: 220,
    height: 42,
    collapsedWidth: 64,
    size: 22,
    mode: "collapse"
})

const set = useSetStore();

const collapseStyle = computed(() => {
    const { width, height, collapsedWidth } = props;
    return {
        width: parseUnit(set.collapsed ? collapsedWidth : width),
        height: parseUnit(height)
    }
});

function onClick() {
    set.setState("collapsed", !set.collapsed);
}
</script>

<style lang="scss" scoped>
.collapse {
    &.center {
        @apply flex-center;
    }
    &:hover {

    }
}
</style>