<script setup lang="ts" generic="T">
import type { TableColumn } from "./table";
defineProps<{
    columns?: TableColumn[];
}>();
</script>

<template>
    <el-table>
        <!-- <el-table-column label="string" prop="string" /> -->
    </el-table>
</template>
