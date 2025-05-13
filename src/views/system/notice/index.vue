<script setup lang="ts">
import WangEditor from "@/components/WangEditor";

defineOptions({
    name: "Notice",
});

const value = ref("");
</script>

<template>
    <div class="notice">
        <el-card-v2>
            <h1>notice</h1>
            <div class="b-1 w-100% h-400px">{{ value }}</div>
            <wang-editor v-model="value" />
        </el-card-v2>
    </div>
</template>