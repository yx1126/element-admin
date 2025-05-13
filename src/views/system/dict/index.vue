<script setup lang="ts">
import LazyInput from "@/components/LazyInput";
import { dictList, dictDelete, dictDataList, dictDataDelete } from "@/api/system/dictType";
import DictTypeForm from "./components/DictTypeForm.vue";
import DictDataForm from "./components/DictDataForm.vue";
import type { DictType, DictData } from "#/system";
import type { TableActionItem } from "@/components/GlobalRegister/Table";

defineOptions({
    name: "Dict",
});

const { t, ti, $t, $ts } = useLocal();

const treeRef = useTemplateRef("treeRef");

const { data: treeData, loading: treeLoad, query: onQueryDictType } = useRequest({
    request: dictList,
    default: [],
});

const { onDelete } = useDataDelete({
    request: dictDelete,
    onSuccess: onQueryDictType,
});

const keyword = ref("");
const dictId = ref<Nullable<DictType["id"]>>(null);

const {
    query: queryForm,
    data: tableData,
    tableAttrs,
    paging,
    onSearch,
    onReset,
    onRefresh,
    onDelete: onDictDataDelete,
} = useTable({
    request: dictDataList,
    deleteRequest: dictDataDelete,
    beforeRequest: data => {
        return {
            ...data,
            id: dictId.value,
        };
    },
    query: () => ({
        label: undefined,
        status: undefined,
    }),
    immediate: false,
});

const dictTypeDialog = useDialog({
    component: DictTypeForm,
    title: data => $t(`${data?.id ? "button.edit" : "button.add"}`) + t("dict"),
    width: 450,
    onSubmit: () => {
        onQueryDictType();
        onSearch();
    },
});
const dictDataDialog = useDialog({
    component: DictDataForm,
    title: data => $t(`${data?.id ? "button.edit" : "button.add"}`) + t("dict"),
    width: 450,
    onSubmit: onSearch,
});

const columns = defineColumns([{
    type: "index",
    label: () => $t("index"),
}, {
    label: () => t("dictType"),
    prop: "dictType",
}, {
    label: () => t("dictName"),
    prop: "label",
    slotName: "label",
}, {
    label: () => t("dictValue"),
    prop: "value",
}, {
    label: () => t("sort"),
    prop: "sort",
}, {
    label: () => $t("status.name"),
    prop: "status",
    slotName: "status",
}, {
    label: () => $t("remark"),
    prop: "remark",
}, {
    label: () => $t("createdAt"),
    prop: "createdAt",
    width: 180,
}, {
    label: () => $t("operate"),
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
    onRefresh();
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
        <el-card-v2 class="w-400px min-w-400px" header="字典">
            <template #extra>
                <el-button icon="EleRefresh" size="small" @click="onQueryDictType" />
                <el-button type="primary" icon="ElePlus" size="small" @click="dictTypeDialog.open()" />
            </template>
            <div class="flex flex-col gap-10px">
                <lazy-input v-model.lazy="keyword" :placeholder="t('dictName')" clearable suffix-icon="EleSearch" />
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
        <table-layout class="flex-1" :model="queryForm" @search="onSearch" @reset="onReset">
            <template #form>
                <el-form-item prop="label" :label="t('dictName')">
                    <el-input v-model="queryForm.label" :placeholder="ti('dictName')" clearable />
                </el-form-item>
                <el-form-item prop="status" :label="$t('status.name')">
                    <el-select v-model="queryForm.status" :placeholder="$ts('status.name')" clearable>
                        <el-option value="1" :label="$t('status.enable')" />
                        <el-option value="0" :label="$t('status.disable')" />
                    </el-select>
                </el-form-item>
            </template>
            <base-table
                v-bind="tableAttrs"
                :columns="columns"
                :data="tableData"
                row-key="id"
                border
                size="large"
                @refresh="onSearch"
            >
                <template #action>
                    <el-button type="primary" icon="ElePlus" @click="dictDataDialog.open({ dictId })">{{ $t("button.add") }}</el-button>
                </template>
                <template #label="{row}">
                    <DictLabel
                        :value="row.nodeType"
                        :options="[{
                            label:row.label,
                            value: '0',
                            nodeType: '0',
                            type: row.type
                        },{
                            label:row.label,
                            value: '1',
                            nodeType: '1',
                            type: row.type
                        }]"
                    />
                </template>
                <template #status="{row}">
                    <DictLabel :value="row.status" type="status" />
                </template>
                <template #operate="{row}">
                    <table-action @click="onTaleActionClick($event, row)" />
                </template>
            </base-table>
            <pagination class="mt-10px" v-bind="paging" />
        </table-layout>
    </div>
</template>

<i18n lang="yaml">
zh:
  dict: 字典
  dictType: 字典类型
  dictName: 字典名称
  dictValue: 字典值
  sort: 排序
en:
  dict: dict
  dictType: dictType
  dictName: dictName
  dictValue: dictValue
  sort: sort
</i18n>