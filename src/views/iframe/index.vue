<script setup lang="ts">
defineOptions({
    name: "IFramePage",
});

const route = useRoute();

const show = ref(false);

const src = ref<string>("");

watch(() => route.fullPath, () => {
    show.value = false;
    src.value = getLink();
    nextTick(() => {
        show.value = true;
    });
}, {
    immediate: true,
});

function getLink() {
    const link = route.params.link as string;
    return decodeURIComponent(link);
}
</script>

<template>
    <div class="iframe">
        <el-card class="full-page" shadow="never">
            <!-- <iframe v-if="show" class="iframe-main" :src frameborder="0"></iframe> -->
        </el-card>
    </div>
</template>

<style lang="scss" scoped>
.iframe-main {
    width: 100%;
    height: 100%;
}
</style>
