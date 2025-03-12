<script setup lang="ts">
defineOptions({
    name: "Tags",
});
</script>

<template>
    <div class="tags-wrapper h-[100%]" @click.right.stop>
        tags
    </div>
</template>

<style lang="scss" scoped>
.tags {
    &-wrapper {
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
}
</style>