<script setup lang="ts">
import {
    PushpinFilled,
    PushpinOutlined,
    CloseOutlined,
    ArrowLeftOutlined,
    ArrowRightOutlined,
    ColumnWidthOutlined,
    MinusOutlined,
    CloseCircleOutlined,
} from "@vicons/antd";
import { useZIndex } from "element-plus";

interface DropdownOptions<T = any> {
    label?: string;
    icon?: T;
    key: string;
    divided?: boolean;
};

type OperateType = "tag" | "icon";

defineOptions({
    name: "Dropdown",
});

const emit = defineEmits<{
    select: [string, number];
}>();

const divRef = useTemplateRef("divRef");
const arrowRef = useTemplateRef("arrowRef");
const { currentZIndex } = useZIndex();
const { t } = useI18n();
const tags = useTagStore();
const currentIndex = ref(-1);
const operateType = ref<OperateType>("tag");

const dropDownOptions = computed(() => {
    const result: DropdownOptions[] = [];
    if(currentIndex.value === -1) return result;
    const tag = tags.tagList[currentIndex.value];
    if(!tag) return result;
    if(tag.closable) {
        result.push({ label: t("current"), icon: CloseOutlined, key: "current" });
    }
    const activeIndex = tags.tagList.findIndex(v => v.type === "activeTags");
    if(tag.type === "activeTags") {
        if(currentIndex.value > activeIndex) {
            result.push({ label: t("left"), key: "left", icon: ArrowLeftOutlined });
        }
        if(currentIndex.value >= activeIndex && currentIndex.value < tags.tagList.findLastIndex(v => v.type === "activeTags")) {
            result.push({ label: t("right"), key: "right", icon: ArrowRightOutlined });
        }
    }
    if(result.length) {
        result.push({ divided: true, key: "d0" });
    }
    if(activeIndex !== -1) {
        result.push({ label: t("other"), key: "other", icon: ColumnWidthOutlined });
        result.push({ label: t("all"), key: "all", icon: MinusOutlined });
    }
    const isFrontpage = tag.path === "/dashboard/console";
    if((result.length && !isFrontpage && tag.type === "keepTags") || tag.type === "activeTags") {
        result.push({ divided: true, key: "d1" });
    }
    if(!isFrontpage && tag.type === "keepTags") {
        result.push({ label: t("remove"), key: "removeFixed", icon: PushpinOutlined });
    } else if(tag.type === "activeTags") {
        result.push({ label: t("keep"), key: "keepFixed", icon: PushpinFilled });
    }
    if(operateType.value === "icon") {
        result.length && result.push({ divided: true, key: "d2" });
        result.push({ label: t("clear"), key: "clear", icon: CloseCircleOutlined });
    }
    return result;
});

const visible = ref(false);

function onOutsideClick() {
    visible.value = false;
    document.removeEventListener("click", onOutsideClick);
}

function onSelect(key: string) {
    emit("select", key, currentIndex.value);
}

function open(e: MouseEvent, index: number, type: OperateType = "tag") {
    currentIndex.value = index;
    operateType.value = type;
    if(!dropDownOptions.value.length) return;
    visible.value = true;
    const target = e.currentTarget as HTMLSpanElement;
    const rect = target.getBoundingClientRect();
    nextTick(() => {
        if(!divRef.value) return;
        divRef.value.style.top = rect.top + rect.height + 6 + "px";
        if(type === "icon") {
            arrowRef.value!.style.right = "10px";
            arrowRef.value!.style.left = "auto";
            divRef.value.style.right = "2px";
            divRef.value.style.left = "auto";
        } else {
            arrowRef.value!.style.left = "10px";
            arrowRef.value!.style.right = "auto";
            divRef.value.style.left = (e.clientX > (rect.x + rect.width - 16) ? e.clientX - 16 : e.clientX) + "px";
            divRef.value.style.right = "auto";
        }
        nextTick(() => {
            document.addEventListener("click", onOutsideClick);
        });
    });
}

function close() {
    visible.value = false;
}

defineExpose({
    open,
    close,
});
</script>

<template>
    <transition name="el-zoom-in-top">
        <div
            v-if="visible"
            ref="divRef"
            aria-hidden="true"
            class="el-dropdown__popper el-popper is-light is-pure custom-contextmenu dropdown"
            role="tooltip"
            data-popper-placement="bottom-end"
            :style="`z-index: ${currentZIndex}`"
            @click.right.prevent
        >
            <ul class="el-dropdown-menu">
                <template v-for="item in dropDownOptions" :key="item.key">
                    <li v-if="!item.divided" role="menuitem" class="el-dropdown-menu__item" @click="onSelect(item.key)">
                        <el-icon><component :is="item.icon" /></el-icon>
                        {{ item.label }}
                    </li>
                    <li v-else role="separator" class="el-dropdown-menu__item--divided"></li>
                </template>
            </ul>
            <div ref="arrowRef" class="el-popper__arrow"></div>
        </div>
    </transition>
</template>

<style lang="scss" scoped>
.dropdown {
    position: fixed;
    .el-dropdown-menu__item :deep(.el-icon) {
        font-size: 16px;
    }
}
</style>

<i18n lang="yaml">
zh:
  current: 关闭当前
  left: 关闭左侧
  right: 关闭右侧
  other: 关闭其他
  all: 关闭全部
  remove: 移除固定
  keep: 保持固定
  clear: 一键清除
en:
  current: Close Current
  left: Close Left
  right: Close Right
  other: Close Right
  all: Close All
  remove: Remove Fixed
  keep: Keep Fixed
  clear: Clear
</i18n>