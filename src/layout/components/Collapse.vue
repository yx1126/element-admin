<template>
    <div class="collapse pointer box-center" :style="collapseStyle" @click="onClick">
        <Icon class="collapse-icon" :size="size">
            <component :is="set.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
        </Icon>
    </div>
</template>

<script setup lang="ts">
import MenuFoldOutlined from "@vicons/antd/MenuFoldOutlined";
import MenuUnfoldOutlined from "@vicons/antd/MenuUnfoldOutlined";
import { parseUnit } from "@/utils/unit";
import Icon from "@/components/Icon";

const {
    width = 220,
    height = 42,
    collapsedWidth = 60,
    size = 22,
} = defineProps<{
    mode?: "collapse" | "menu";
    width?: Unit;
    height?: Unit;
    collapsedWidth?: Unit;
    size?: Unit;
}>();

const set = useSetStore();

const collapseStyle = computed(() => {
    return {
        width: parseUnit(set.collapsed ? collapsedWidth : width),
        height: parseUnit(height),
    };
});

function onClick() {
    set.setState("collapsed", !set.collapsed);
}
</script>

<style lang="scss" scoped>
.collapse {
    &:hover {
        background-color: rgba($color: #F0F2F5, $alpha: 1);
    }
}
</style>