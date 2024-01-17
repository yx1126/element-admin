<template>
    <div
        :class="['scroll-bar', { 'is-hover': !always }]"
        :style="wrapperStyle"
    >
        <div
            ref="scrollViewRef"
            :class="[
                'scroll-bar__view',
                { 'scroll-bar__view--hidden-default': !native }
            ]"

            @scroll="onScroll"
        >
            <slot></slot>
        </div>
        <template v-if="!native && isExistScroll">
            <div :class="['scroll-bar__bar', xScrollable ? 'is-horizontal' : 'is-vertical']">
                <div
                    ref="thumbRef"
                    class="scroll-bar__thumb"
                    :style="thumbStyle"
                    @mousedown="onMousedown"
                ></div>
            </div>
        </template>
    </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import { isObject, isNumber } from "@/utils/validata";
import { parseUnit } from "@/utils/unit";
import type { StyleValue } from "vue";

export default defineComponent({
    name: "ScrollBar",
    props: {
        // 高度
        height: { type: [Number, String] },
        //最大高度
        maxHeight: { type: [Number, String] },
        // 原生滚动条
        native: { type: Boolean, default: false },
        // 滚动条总是显示
        always: { type: Boolean, default: false },
        // 滑块最小值
        minSize: { type: Number, default: 20 },
        // 横向滚动
        xScrollable: { type: Boolean, default: false },
        isResize: { type: Boolean, default: false },
    },
    emits: ["scroll"],
    setup(props, { emit, expose }) {

        const scrollViewRef = ref<HTMLDivElement | null>(null);
        const thumbRef = ref<HTMLDivElement | null>(null);
        let originalOnSelectStart: any;
        let resizeObserver: any = null;

        // 是否存在滚动条
        const isExistScroll = ref(false);
        // 滑块大小
        const thumbSize = ref(0);
        // 滚动的高度 = 容器总高度 - 容器自身高度
        const scrollSize = ref(0);
        // 滑块 滚动高度
        const thumbScrollSize = ref(0);
        // 滑块 移动距离
        const translateXY = ref(0);

        const wrapperStyle = computed<StyleValue>(() => {
            const { height, maxHeight } = props;
            return {
                height: parseUnit(height),
                maxHeight: parseUnit(maxHeight),
            }
        })

        const thumbStyle = computed<StyleValue>(() => {
            const { xScrollable: xs } = props;
            return {
                transform: `translate${xs ? "X" : "Y"}(${translateXY.value}px)`,
                [xs ? "width" : "height"]: thumbSize.value + "px"
            };
        });

        watch(() => [props.height, props.maxHeight, props.minSize, props.xScrollable], () => {
            if(props.native) return;
            nextTick(init);
        });

        watch(() => props.isResize, async (resize) => {
            await nextTick();
            if(resize) {
                const resizeObserver = new ResizeObserver(() => init());
                resizeObserver.observe(scrollViewRef.value!)
            } else {
                resizeObserver?.disconnect();
                resizeObserver = null;
            }
        }, { immediate: true });

        function init() {
            if(!scrollViewRef.value) return;
            const { xScrollable: isX, minSize } = props;
            const { offsetWidth: ow, offsetHeight: oh, scrollWidth: sw, scrollHeight: sh, parentNode } = scrollViewRef.value;
            const { offsetWidth: pow, offsetHeight: poh } = parentNode as ParentNode as HTMLDivElement;
            isExistScroll.value = isX ? sw > pow : sh > poh;
            thumbSize.value = Math.max(isX ? ow ** 2 / sw : oh ** 2 / sh, minSize);
            scrollSize.value = isX ? sw - ow : sh - oh;
            thumbScrollSize.value = (isX ? ow : oh) - thumbSize.value;
            update();
        }

        function scrollTo(options: ScrollToOptions): void;
        // eslint-disable-next-line no-redeclare
        function scrollTo(x: number, y: number): void;
        // eslint-disable-next-line no-redeclare
        function scrollTo(x: unknown, y?: unknown) {
            if(isObject(x)) {
                scrollViewRef.value!.scrollTo(x);
            } else if(isNumber(x) && isNumber(y)) {
                scrollViewRef.value!.scrollTo(x, y);
            }
        }

        // 更新滑块滚动距离
        function update() {
            if(!scrollViewRef.value) return;
            translateXY.value = scrollViewRef.value[props.xScrollable ? "scrollLeft" : "scrollTop"] / scrollSize.value * thumbScrollSize.value;
        }

        function onScroll(e: Event) {
            update();
            emit("scroll", e);
        }

        function onMousedown(event: MouseEvent) {
            event.stopPropagation();
            // 禁止鼠标 middle right 点击
            if(event.ctrlKey || [1, 2].includes(event.button)) return;
            window.getSelection()?.removeAllRanges();
            event.stopImmediatePropagation();
            originalOnSelectStart = document.onselectstart;
            document.onselectstart = () => false;

            // 鼠标点击时滑块Y轴默认偏移量
            let translateXY = 0;
            const transform = getComputedStyle(thumbRef.value!)["transform"];
            if(transform !== "none") {
                const list = (transform.match(/\((.+)\)/)![1] || "").split(",");
                translateXY = Number(list[list.length - (props.xScrollable ? 2 : 1)]);
            }
            function onMousemove(e: MouseEvent) {
                const { xScrollable: isX } = props;
                const xy = (isX ? e.clientX - event.clientX :  e.clientY - event.clientY) + translateXY;
                const moveXY = xy < 0 ? 0 : xy > thumbScrollSize.value ? thumbScrollSize.value : xy;
                scrollViewRef.value![isX ? "scrollLeft" : "scrollTop"] = moveXY / thumbScrollSize.value * scrollSize.value;
            }

            function onMouseup() {
                document.removeEventListener("mousemove", onMousemove);
                document.removeEventListener("mouseup", onMouseup);
                if(document.onselectstart !== originalOnSelectStart) {
                    document.onselectstart = originalOnSelectStart;
                }
            }
            document.addEventListener("mousemove", onMousemove);
            document.addEventListener("mouseup", onMouseup);
        }

        onMounted(async () => {
            if(!props.native) {
                await nextTick();
                init();
            }
        });

        onBeforeMount(() => {
            resizeObserver?.disconnect();
            resizeObserver = null;
        });

        expose({
            scrollTo,
            update,
        });

        return {
            wrapperStyle,
            thumbStyle,
            scrollViewRef,
            thumbRef,
            isExistScroll,
            translateXY,
            thumbSize,
            onScroll,
            onMousedown,
            scrollTo,
        };
    },
});
</script>

<style lang="scss" scoped>
.scroll-bar {
    position: relative;
    overflow: hidden;
    height: 100%;
    &.is-hover {
        .scroll-bar__thumb {
            display: none;
        }
        &:active,
        &:hover {
            .scroll-bar__thumb {
                display: block;
            }
        }
    }
    &__view {
        height: 100%;
        overflow: auto;
        &.scroll-bar__view--hidden-default {
            -ms-overflow-style: none;
            scrollbar-width: none !important;
            &::-webkit-scrollbar {
                width: 0 !important;
                display: none !important;
            }
        }
    }
    &__bar {
        position: absolute;
        &.is-horizontal {
            left: 0;
            bottom: 2px;
            width: 100%;
            height: 6px;
            .scroll-bar__thumb {
                height: 100%;
            }
        }
        &.is-vertical {
            width: 6px;
            height: 100%;
            right: 2px;
            top: 0;
            .scroll-bar__thumb {
                width: 100%;
            }
        }
    }
    &__thumb {
        border-radius: 5px;
        background-color: #909399;
        cursor: pointer;
        opacity: .3;
        transition: all 0s;
        &:hover {
            background-color: #909399;
            opacity: .5;
        }
    }
}
</style>
