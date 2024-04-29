<template>
    <el-popover v-bind="popverAttrs" @after-leave="onAfterLeave">
        <template #reference>
            <el-input
                v-model="modelValue"
                class="icon-select-input"
                readonly
                :placeholder
                v-bind="$attrs"
                @mouseenter="onMouseenter"
                @mouseleave="onMouseleave"
            >
                <template v-if="placement === 'preffix'" #prepend>
                    <Icon :icon="modelValue" />
                </template>
                <template #suffix>
                    <Icon v-if="showClear" icon="ele-circle-close" cursor @click="onClear" />
                </template>
                <template v-if="placement === 'suffix'" #append>
                    <Icon :icon="modelValue" />
                </template>
            </el-input>
        </template>
        <div class="icon-select-wrapper">
            <div class="search">
                <lazy-input v-model.lazy="searchKey" placeholder="请输入图标名称" clearable />
            </div>
            <div class="icon-select-list"></div>
            <div class="paging"></div>
        </div>
    </el-popover>
</template>

<script setup lang="ts">
import Icon from "@/components/Icon";
import LazyInput from "@/components/LazyInput";
import type { PopoverProps } from "./";
// import LocalIcons from "virtual:svg-icons-list";

defineOptions({
    name: "IconSelect",
    inheritAttrs: false
});

const { disabled: formDisabled, validate } = useElForm();

const modelValue = defineModel<string>();

const props = withDefaults(defineProps<{
    placeholder?: string;
    closeable?: boolean;
    placement?: "preffix" | "suffix";
    disabled?: boolean;
    clearable?: boolean;
    popoverProps?: PopoverProps;
}>(), {
    placeholder: "请选择图标",
    closeable: true,
    placement: "preffix",
});

const hovering = ref(false);
const searchKey = ref("");

const showClear = computed(() => props.clearable && modelValue.value && !formDisabled.value && hovering.value);

const popverAttrs = computed<PopoverProps>(() => {
    return {
        trigger: "click",
        placement: "bottom-start",
        showArrow: false,
        offset: 6,
        hideAfter: 0,
        ...props.popoverProps,
        width: "378px",
    }
});

watch(modelValue, (val, oldVal) => {
    if(val !== oldVal) {
        validate();
    }
})

function onMouseenter() {
    hovering.value = true;
}
function onMouseleave() {
    hovering.value = false;
}
function onClear() {
    modelValue.value = undefined;
}
function onAfterLeave() {
    searchKey.value = "";
}
</script>

<style lang="scss" scoped>
.icon-select-input {
    :deep(.el-input-group__prepend) {
        padding: 0 12px;
    }
    :deep(.el-input-group__append) {
        padding: 0 12px;
    }
}
.icon-select-wrapper {
    width: 100%;
    .icon-select-list {
        height: 166px;
        margin: 10px 0;
        display: grid;
        grid-template-columns: repeat(6, 50px);
        grid-template-rows: repeat(4, 34px);
        grid-gap: 10px;
        align-content: flex-start;
    }
    .paging {
        display: flex;
        justify-content: space-between;
    }
}
</style>