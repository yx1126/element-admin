<script setup lang="ts">
defineOptions({
    name: "Tags",
});
</script>

<template>
    <div class="tags h-[100%]">
        tags
    </div>
</template>

<style lang="scss" scoped>
.tags {
    width: 100%;
    background-color: #fff;
    @include when-dark {
        background-color: var(--dark-color);
    }
    @include border(bottom, var(--border-light-color)) {
        @include when-dark {
            background-color: var(--border-dark-color);
        }
    };
}
</style>