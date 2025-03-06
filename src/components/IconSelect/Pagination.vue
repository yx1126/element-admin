<script setup lang="ts">
defineOptions({
    name: "Pagination",
});

const page = defineModel("page", { default: 0 });
const size = defineModel("size", { default: 0 });

const {
    total = 0,
} = defineProps<{
    total?: number;
}>();

const input = ref(1);

const pageMax = computed(() => Math.ceil(total / size.value));

watch(page, val => {
    input.value = val;
}, {
    immediate: true,
});

function onClick(type: "pre" | "next") {
    if(type === "pre") {
        page.value = Math.max(1, page.value - 1);
    } else {
        page.value = Math.min(pageMax.value, page.value + 1);
    }
}

function onInput() {
    if(input.value < 1) {
        input.value = page.value = 1;
    } else if(input.value > pageMax.value) {
        input.value = page.value = pageMax.value;
    } else {
        page.value = input.value;
    }
}
</script>

<template>
    <div class="pagination">
        <el-button
            class="button"
            icon="EleArrowLeft"
            size="default"
            :disabled="page <= 1"
            @click="onClick('pre')"
        />
        <div class="jumper">
            <el-input
                v-model="input"
                class="input"
                size="default"
                :min="1"
                :max="pageMax"
                @blur="onInput"
                @keydown.enter="onInput"
            />
            <span>/</span>
            <span>{{ pageMax }}</span>
        </div>
        <el-button
            class="button"
            icon="EleArrowRight"
            size="default"
            :disabled="page >= pageMax"
            @click="onClick('next')"
        />
    </div>
</template>

<style lang="scss" scoped>
.pagination {
    --el-component-size: 28px;
    display: flex;
    align-items: center;
    gap: 10px;
    .button {
        height: 28px;
        padding: 8px;
    }
    .jumper {
        display: flex;
        align-items: center;
        gap: 5px;
        .input {
            width: 60px;
        }
    }
}
</style>