<script setup lang="ts">
import { CloseOutlined } from "@vicons/antd";

defineOptions({
    name: "ToDoList",
});

interface ToDoThings {
    things: string;
    isFinish: boolean;
}

const toDoList = ref<ToDoThings[]>([
    { things: "今天要修复100个bug", isFinish: false },
    { things: "今天要修复100个bug", isFinish: false },
    { things: "今天要写100行代码加几个bug吧", isFinish: false },
    { things: "今天要修复100个bug", isFinish: false },
    { things: "今天要修复100个bug", isFinish: true },
    { things: "今天要写100行代码加几个bug吧", isFinish: true },
    { things: "今天要修复100个bug", isFinish: false },
    { things: "今天要修复100个bug", isFinish: true },
    { things: "今天要写100行代码加几个bug吧", isFinish: true },
]);
</script>

<template>
    <el-table class="todo-table" :data="toDoList" :height="376" :show-header="false">
        <el-table-column width="50" align="center">
            <template #default="{ row }">
                <el-checkbox v-model="row.isFinish" />
            </template>
        </el-table-column>
        <el-table-column label="things" prop="things">
            <template #default="{ row }">
                <span class="title" :class="{'is-finish': row.isFinish}">{{ row.things }}</span>
            </template>
        </el-table-column>
        <el-table-column label="finish" width="120" align="center">
            <template #default="{ row }">
                <el-tag :type="row.isFinish ? 'success' : 'danger'">{{ row.isFinish ? "已完成" : "未完成" }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column width="100" align="center" fixed="right">
            <template #default="{ $index }">
                <Icon class="pointer" @click="toDoList.splice($index, 1)"><close-outlined /></Icon>
            </template>
        </el-table-column>
    </el-table>
</template>

<style lang="scss" scoped>
.todo-table {
    .title {
        @include when(finish) {
            text-decoration: line-through;
            color: #999;
        }
    }
}
</style>