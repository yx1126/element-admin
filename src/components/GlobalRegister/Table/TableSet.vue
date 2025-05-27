<script setup lang="ts">
// import Node from "element-plus/es/components/tree/src/model/node";
// import type { AllowDropType } from "element-plus";
import { VerticalLeftOutlined, VerticalRightOutlined } from "@vicons/antd";
import { tableContextKey, type TableColumnFormat } from "./table";
import { isFn } from "@/utils/validata";

defineOptions({
    name: "TableSet",
});

const { t, $t } = useLocal();

const {
    columns,
    isShowIndex,
    isShowSelection,
    checkedIndex,
    checkedSelection,
    checkAll,
    indeterminate,
    onReset,
} = inject(tableContextKey)!;

const treeProps = {
    label: "label",
    children: "children",
};

function onFixedClick(item: TableColumnFormat, value: TableColumnFormat["fixed"]) {
    if(value === "left") {
        item.fixed = item.fixed === "left" || item.fixed === true ? undefined : value;
    } else if(value === "right") {
        item.fixed = item.fixed === "right" ? undefined : value;
    }
}
</script>

<template>
    <el-popover
        width="auto"
        placement="bottom-end"
        :persistent="false"
        trigger="click"
        :hide-after="0"
        popper-style="padding: 0;"
    >
        <template #reference>
            <slot />
        </template>
        <div class="table-set">
            <div class="table-set__header">
                <el-checkbox v-model="checkAll" :indeterminate="indeterminate">{{ t('all') }}</el-checkbox>
                <el-checkbox v-if="isShowIndex" v-model="checkedIndex">{{ t('index') }}</el-checkbox>
                <el-checkbox v-if="isShowSelection" v-model="checkedSelection">{{ t('selection') }}</el-checkbox>
                <el-popconfirm
                    width="200"
                    :title="$t('button.sure', [$t('button.reset')])"
                    :hide-after="0"
                    @confirm="onReset"
                >
                    <template #reference>
                        <el-link class="ml-20px" type="primary">{{ $t("button.reset") }}</el-link>
                    </template>
                </el-popconfirm>
            </div>
            <div class="table-set__list">
                <el-scrollbar max-height="300">
                    <el-tree
                        class="tree"
                        :data=" columns"
                        :props="treeProps"
                        :expand-on-click-node="false"
                        node-key="id"
                    >
                        <template #default="{ data }">
                            <div class="table-set__list-item gap-10px">
                                <div class="flex items-center gap-10px">
                                    <el-checkbox v-model="data.checked" />
                                    <span>{{ isFn(data.label) ? data.label() : data.label }}</span>
                                </div>
                                <div v-if="data.deep === 0" class="flex items-center">
                                    <el-button-group size="small">
                                        <el-button
                                            :type="[true,'left'].includes(data.fixed!) ? 'primary' : undefined"
                                            :icon="VerticalRightOutlined"
                                            @click=" onFixedClick(data,'left')"
                                        />
                                        <el-button
                                            :type="data.fixed === 'right' ? 'primary' : undefined"
                                            :icon="VerticalLeftOutlined"
                                            @click="onFixedClick(data, 'right')"
                                        />
                                    </el-button-group>
                                </div>
                            </div>
                        </template>
                    </el-tree>
                </el-scrollbar>
            </div>
        </div>
    </el-popover>
</template>

<style lang="scss" scoped>
.table-set {
    @include no-select;
    &__header {
        min-width: 250px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 14px 8px 24px;
        gap: 10px;
        border-bottom: 1px solid var(--el-border-color);
        &>* {
            margin-right: 0;
        }
    }
    &__list {
        .tree {
            --el-tree-node-content-height: 34px;
        }
        position: relative;
        padding: 5px 0;
        &-item {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-right: 14px;
            .index {
                display: inline-block;
                width: 30px;
            }
            .checkbox {
                flex: 1;
            }
        }
    }
}
</style>

<i18n lang="yaml">
zh:
  all: 全部
  index: 序号列
  selection: 多选列
en:
  all: all
  index: index
  selection: selection
</i18n>