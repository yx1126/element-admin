<script setup lang="ts">
import IconSelect from "@/components/IconSelect";
import LazyInput from "@/components/LazyInput";

const router = useRouter();

const icon = ref("");

const lazyValue = ref("");

function onClick() {
    router.push({
        path: "/iframe/" + encodeURIComponent("https://www.baidu.com/"),
        query: { tagName: "百度" },
    });
}
function onClick2() {
    router.push({
        path: "/iframe/" + encodeURIComponent("https://juejin.cn/frontend"),
        query: { tagName: "稀土掘金" },
    });
}
</script>

<template>
    <div>
        <el-button @click="onClick">baidu iframe</el-button>
        <el-button @click="onClick2">juejin iframe</el-button>
        <div class="">
            workbench
        </div>
        <div v-drag class="w-[100px] h-[100px] bg-red"></div>
        <div mt-10>
            <icon-select v-model="icon" size="large" placement="prefix" clearable style="width: 280px;" />
            <lazy-input v-model="lazyValue" />
            <h1 c-blue mt-10>{{ lazyValue }}</h1>
        </div>
        <el-dropdown placement="bottom-end">
            <el-button>Click</el-button>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>Github1</el-dropdown-item>
                    <el-dropdown-item>Github2</el-dropdown-item>
                    <el-dropdown-item>Github3</el-dropdown-item>
                    <el-dropdown-item>Github4</el-dropdown-item>
                    <el-dropdown-item>Github5</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>