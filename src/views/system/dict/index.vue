<script setup lang="ts">
import LazyInput from "@/components/LazyInput";
import { dictList, dictDelete, dictDataList } from "@/api/system/dictType";
import DictTypeForm from "./components/DictTypeForm.vue";
import type { DictType, DictData } from "#/dict";

defineOptions({
    name: "Dict",
});

const treeRef = useTemplateRef("treeRef");

const { data: treeData, loading: treeLoad, query: onQueryDictType } = useRequest(dictList, []);

const dictTypeDialog = useDialog({
    component: DictTypeForm,
    title: data => `${data?.id ? "编辑" : "新增"}字典`,
    width: 500,
    onSubmit: onQueryDictType,
});
const { onDelete } = useDataDelete({
    request: dictDelete,
    onSuccess: onQueryDictType,
});

const { data: tableData, loading, query } = useRequest<DictData[]>({
    request: dictDataList,
    default: [],
    immediate: true,
});

const keyword = ref("");
const dictId = ref<Nullable<DictType["id"]>>(null);

const columns = defineColumns([{
    type: "index",
    label: "序号",
}]);

watch(keyword, val => {
    treeRef.value?.filter(val);
});

function onFilterNode(value: string, data: Record<string, any>) {
    if(!value) return true;
    return data.name.includes(value);
}

function onNodeClick(dict: DictType) {
    dictId.value = dict.id;
    onSearch();
}

function onSearch() {
    query({ id: dictId.value });
}
</script>

<template>
    <div class="dict flex gap-10px">
        <el-card-v2 class="w-450px" header="字典">
            <template #extra>
                <el-button icon="EleRefresh" size="small" @click="onQueryDictType" />
                <el-button type="primary" icon="ElePlus" size="small" @click="dictTypeDialog.open()" />
            </template>
            <div class="flex flex-col gap-10px">
                <lazy-input v-model.lazy="keyword" placeholder="请输入字典名称" clearable suffix-icon="EleSearch" />
                <div class="flex-shrink">
                    <el-tree
                        ref="treeRef"
                        v-loading="treeLoad"
                        :data="treeData"
                        style="--el-tree-node-content-height: 32px"
                        :filter-node-method="onFilterNode"
                        @node-click="onNodeClick"
                    >
                        <template #default="{ data }">
                            <div class="size-100% flex items-center justify-between pr-10px group">
                                <div>{{ data.name }}</div>
                                <div class="h-100% flex items-center gap-8px" @click.stop>
                                    <div class="group-hover:hidden">{{ data.type }}</div>
                                    <div class="hidden items-center gap-8px group-hover:flex">
                                        <el-link type="primary" icon="EleEdit" @click="dictTypeDialog.open(data)" />
                                        <el-link type="danger" icon="EleDelete" @click="onDelete(data)" />
                                    </div>
                                </div>
                            </div>
                        </template>
                    </el-tree>
                </div>
            </div>
        </el-card-v2>
        <el-card-v2 class="flex-1">
            <base-table
                v-if="dictId"
                :columns="columns"
                :loading="loading"
                :data="tableData"
                row-key="id"
                border
                size="large"
                @refresh="onSearch"
            >
                <template #action>
                    <el-button type="primary" icon="ElePlus">{{ $t("button.add") }}</el-button>
                </template>
            </base-table>
            <el-empty v-else description="请选择左侧字段类型" />
        </el-card-v2>
    </div>
</template>
