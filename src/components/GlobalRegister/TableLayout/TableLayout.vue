<script setup lang="ts">
defineOptions({
    name: "TableLayout",
});

const { resetSearch = true } = defineProps<{
    model?: object;
    resetSearch?: boolean;
}>();

const emit = defineEmits<{
    search: [];
    reset: [];
}>();

defineSlots<Slotsable<"default" | "form" | "form-extra">>();

const formRef = useTemplateRef("formRef");

function onSearch() {
    emit("search");
}
function onReset() {
    formRef.value?.resetFields();
    emit("reset");
    if(resetSearch) {
        emit("search");
    }
}
</script>

<template>
    <div class="table-layout">
        <el-card-v2>
            <el-form ref="formRef" class="search-form form-flex" :model="model" inline>
                <slot name="form" />
                <el-form-item>
                    <el-button type="primary" icon="EleSearch" @click="onSearch">查询</el-button>
                    <el-button @click="onReset">重置</el-button>
                    <slot name="form-extra" />
                </el-form-item>
            </el-form>
        </el-card-v2>
        <el-card-v2 class="table-mt">
            <slot />
        </el-card-v2>
    </div>
</template>

<style lang="scss" scoped>
.table {
    &-layout {
        color: #000;
    }
    &-mt {
        margin-top: 10px;
    }
}
</style>