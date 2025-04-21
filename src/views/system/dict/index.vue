<script setup lang="ts">
import LazyInput from "@/components/LazyInput";
import { dictTypeList } from "@/api/system/dictType";
import DictTypeForm from "./components/DictTypeForm.vue";

defineOptions({
    name: "Dict",
});

const { data: treeData, query: onQueryDictType } = useRequest(dictTypeList, []);

const dictTypeDialog = useDialog({
    component: DictTypeForm,
    title: data => `${data?.id ? "编辑" : "新增"}字典`,
    width: 500,
    onSubmit: onQueryDictType,
});

const keyword = ref("");
</script>

<template>
    <div class="dict flex gap-10px">
        <el-card-v2 class="w-450px" header="字典">
            <template #extra>
                <el-button icon="EleRefresh" size="small" />
                <el-button type="primary" icon="ElePlus" size="small" @click="dictTypeDialog.open()" />
            </template>
            <div class="">
                <lazy-input v-model="keyword" placeholder="请输入字典名称" clearable suffix-icon="EleSearch" />
                <el-scrollbar>
                    <el-tree :data="treeData" />
                </el-scrollbar>
            </div>
        </el-card-v2>
        <el-card-v2 class="flex-1">
            1
        </el-card-v2>
    </div>
</template>
