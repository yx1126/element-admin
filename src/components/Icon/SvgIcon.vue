<template>
    <svg class="svg-icon" aria-hidden="true">
        <use :xlink:href="symbolId" />
    </svg>
</template>

<script lang="ts">
export default defineComponent({
    name: "SvgIcon",
    props: {
        prefix: { type: String, default: "icon" },
        icon: { type: String, default: void 0 },
    },
    setup(props) {

        const symbolId = computed(() => `#${props.prefix}-${props.icon}`);

        return {
            symbolId,
        };
    },
});

</script>

<style>
.svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
}
</style>
