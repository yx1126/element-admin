<template>
    <div class="collapse">
        <div class="h-[100%] flex items-center">
            <Collapse width="60" height="60" />
        </div>
        <div class="h-[100%] flex items-center">
            right
        </div>
    </div>
</template>

<script setup lang="ts">
import Collapse from "../Collapse.vue";
</script>

<style lang="scss" scoped>
.collapse {
    @apply h-100p flex justify-between;
    // border-bottom: 1px solid var(--border-color);
}
</style>