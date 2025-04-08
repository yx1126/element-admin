<script setup lang="ts" generic="T">
import { useNamespace } from "element-plus";
import { useColumns, type TableColumn } from "./table";
import ElTableColumnV2 from "./TableColumn";
import { SettingOutlined } from "@vicons/antd";
import { TableContext } from ".";

defineOptions({
    name: "BaseTable",
    inheritAttrs: false,
});

const { columns } = defineProps<{
    columns?: TableColumn[];
}>();

const slots = defineSlots<Slotsable<"default" | "append" | "empty" | "action" | string>>();

const ns = useNamespace("table", ref("base"));

provide(TableContext, reactive({
    slots,
}));

const { columns: BaseColumns } = useColumns(columns);
</script>

<template>
    <div :class="ns.b()">
        <div :class="ns.e('tool')">
            <div :class="ns.e('action')"></div>
            <div :class="ns.e('extra')">
                <Icon cursor>
                    <setting-outlined />
                </Icon>
            </div>
        </div>
        <el-table v-bind="$attrs">
            <el-table-column-v2 :columns="BaseColumns" />
            <template v-if="slots.append" #append>
                <slot name="append" />
            </template>
            <template v-if="slots.empty" #empty>
                <slot name="empty" />
            </template>
            <!-- <el-table-column label="string" prop="string" /> -->
        </el-table>
    </div>
</template>

<style lang="scss" scoped>
.base-table {
    display: flex;
    flex-direction: column;
    &__tool {
        height: 34px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        & > div {
            height: 100%;
            display: flex;
            align-items: center;
        }
    }
    // &__action {

    // }
    // &__extra {

    // }
}
</style>