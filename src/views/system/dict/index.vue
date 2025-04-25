<script setup lang="ts">
import LazyInput from "@/components/LazyInput";
import { dictList, dictDelete, dictDataList, dictDataDelete } from "@/api/system/dictType";
import DictTypeForm from "./components/DictTypeForm.vue";
import DictDataForm from "./components/DictDataForm.vue";
import type { DictType, DictData } from "#/dict";
import type { TableActionItem } from "@/components/GlobalRegister/Table";

defineOptions({
    name: "Dict",
});

const treeRef = useTemplateRef("treeRef");

const { data: treeData, loading: treeLoad, query: onQueryDictType } = useRequest({
    request: dictList,
    default: [],
});

const { data: tableData, loading, query: onQueryDictData } = useRequest<DictData[]>({
    request: dictDataList,
    default: [],
});

const dictTypeDialog = useDialog({
    component: DictTypeForm,
    title: data => `${data?.id ? "编辑" : "新增"}字典`,
    width: 500,
    onSubmit: onQueryDictType,
});
const dictDataDialog = useDialog({
    component: DictDataForm,
    title: data => `${data?.id ? "编辑" : "新增"}字典`,
    width: 500,
    onSubmit: onSearch,
});
const { onDelete } = useDataDelete({
    request: dictDelete,
    onSuccess: onQueryDictType,
});
const { onDelete: onDictDataDelete } = useDataDelete({
    request: dictDataDelete,
    onSuccess: onSearch,
});

const keyword = ref("");
const dictId = ref<Nullable<DictType["id"]>>(null);

const columns = defineColumns([{
    type: "index",
    label: "序号",
}, {
    label: "字典类型",
    prop: "dictType",
}, {
    label: "字典名称",
    prop: "label",
}, {
    label: "字典值",
    prop: "value",
}, {
    label: "节点类型",
    prop: "nodeType",
    slotName: "nodeType",
}, {
    label: "排序",
    prop: "sort",
}, {
    label: "描述",
    prop: "remark",
}, {
    label: "创建时间",
    prop: "createdAt",
    width: 180,
}, {
    label: "操作",
    width: 120,
    slotName: "operate",
}]);

watch(keyword, val => {
    treeRef.value?.filter(val);
});

onBeforeMount(async () => {
    await onQueryDictType();
    dictId.value = treeData.value[0]?.id;
    nextTick(() => {
        if(dictId.value) {
            treeRef.value?.setCurrentKey(dictId.value);
        }
    });
    if(dictId.value) {
        onSearch();
    }
});

function onFilterNode(value: string, data: Record<string, any>) {
    if(!value) return true;
    return data.name.includes(value) || data.type.includes(value);
}

function onNodeClick(dict: DictType) {
    if(dictId.value === dict.id) return;
    dictId.value = dict.id;
    onSearch();
}

function onSearch() {
    onQueryDictData({ id: dictId.value });
}

function onTaleActionClick(item: TableActionItem, row: DictData) {
    if(item.action === "edit") {
        dictDataDialog.open(row);
    } else if(item.action === "delete") {
        onDictDataDelete(row.id);
    }
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
                        highlight-current
                        node-key="id"
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
                    <el-button type="primary" icon="ElePlus" @click="dictDataDialog.open({ dictId })">{{ $t("button.add") }}</el-button>
                </template>
                <template #nodeType="{row}">
                    <span v-if="row.nodeType == 0">文本</span>
                    <el-tag v-else-if="row.nodeType == 1" :type="row.type">标签</el-tag>
                </template>
                <template #operate="{row}">
                    <table-action @click="onTaleActionClick($event, row)" />
                </template>
            </base-table>
            <el-empty v-else description="请选择左侧字段类型" />
        </el-card-v2>
    </div>
</template>