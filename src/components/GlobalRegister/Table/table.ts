import baseTableColumnProps from "element-plus/es/components/table/src/table-column/defaults";
import type { ExtractPublicPropTypes, VNode } from "vue";
import type { TableProps as BaseTableProps, TableColumnCtx } from "element-plus";

type BaseTableColumn = ExtractPublicPropTypes<typeof baseTableColumnProps>;

export type TableProps<T> = BaseTableProps<T> & {
    columns?: TableColumn[];
};

export interface TableSlot<T = any> {
    row: T;
    column: TableColumnCtx<T>;
    $index: number;
}

export type TableColumn<T = any> = BaseTableColumn & {
    type?: "default" | "selection" | "index" | "expand";
    align?: "left" | "center" | "right";
    headerAlign?: "left" | "center" | "right";
    fixed?: "left" | "right" | boolean;
    slotName?: string;
    children?: TableColumn[];
    render?(data: TableSlot<T>): Empty<VNode[]>;
    renderHeader?(data: Omit<TableSlot<T>, "row">): Empty<VNode[]>;
    renderFilterIcon? (data: { filterOpened: boolean }): Empty<VNode[]>;
};

export type TableColumnFormat = TableColumn & {
    visible: boolean;
};

function formatColumns(columns?: TableColumn[]): TableColumnFormat[] {
    if(!columns?.length) return [];
    const { left, middle, right } = columns.reduce<Record<"left" | "middle" | "right", TableColumnFormat[]>>((pre, column) => {
        const item = {
            ...column,
            visible: true,
            children: formatColumns(column.children),
        };
        if(!item.fixed) {
            pre.middle.push(item);
        } else if([true, "left"].includes(item.fixed)) {
            pre.left.push(item);
        } else if(item.fixed === "right") {
            pre.right.push(item);
        }
        return pre;
    }, { left: [], middle: [], right: [] });
    return [...left, ...middle, ...right];
}

export function useColumns(data?: TableColumn[]) {
    const columns = ref<TableColumnFormat[]>([]);
    watch(() => data, () => {
        columns.value = formatColumns(data);
    }, {
        immediate: true,
        deep: true,
    });
    return {
        columns,
    };
}