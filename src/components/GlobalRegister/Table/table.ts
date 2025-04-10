import baseTableColumnProps from "element-plus/es/components/table/src/table-column/defaults";
import type { Component, ExtractPublicPropTypes, VNode } from "vue";
import type { TableProps as BaseTableProps, TableColumnCtx, LinkProps } from "element-plus";
import { cloneDeep } from "lodash-es";

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
    children?: TableColumn<T>[];
    render?(data: TableSlot<T>): Empty<VNode[]>;
    renderHeader?(data: Omit<TableSlot<T>, "row">): Empty<VNode[]>;
    renderFilterIcon? (data: { filterOpened: boolean }): Empty<VNode[]>;
};

export type TableColumnFormat = TableColumn & {
    visible: boolean;
    children?: TableColumnFormat[];
    deep: number;
};

export interface TableActionItem {
    action: string;
    icon: string | Component;
    append?: "before";
    type?: LinkProps["type"];
}

function formatColumns(columns?: TableColumn[], index?: number, deep = 0): TableColumnFormat[] {
    if(!columns?.length) return [];
    const { index: indexList, selection, left, middle, right } = columns.reduce<Record<string, TableColumnFormat[]>>((pre, column, i) => {
        if(deep !== 0 && ["selection", "index", "expand"].includes(column.type || "default")) return pre;
        const item = {
            id: index !== null && index !== undefined ? `${index}-${i}` : `${i}`,
            ...column,
            visible: true,
            children: formatColumns(column.children, i, deep + 1),
            deep,
        };
        if(item.type === "index") {
            pre.index.push(item);
        } else if(item.type === "selection") {
            pre.selection.push(item);
        } else if(!item.fixed || deep !== 0) {
            pre.middle.push(item);
        } else if([true, "left"].includes(item.fixed)) {
            pre.left.push(item);
        } else if(item.fixed === "right") {
            pre.right.push(item);
        }
        return pre;
    }, { index: [], selection: [], left: [], middle: [], right: [] });
    return [...selection, ...indexList, ...left, ...middle, ...right];
}

function getCheckedAll(columns: TableColumnFormat[]): boolean {
    return columns.every(c => {
        if(c.type === "index" || c.type === "selection") return true;
        return !c.children?.length ? c.visible : (c.visible && getCheckedAll(c.children));
    });
}

function getCheckedOne(columns: TableColumnFormat[]): boolean {
    return columns.some(c => {
        if(c.type === "index" || c.type === "selection") return false;
        return !c.children?.length ? c.visible : (c.visible || getCheckedAll(c.children));
    });
}

function setVisible(columns: TableColumnFormat[], value: boolean) {
    columns.forEach(item => {
        if(item.type === "index" || item.type === "selection") return;
        item.visible = value;
        if(item.children) {
            setVisible(item.children, value);
        }
    });
}

export function useColumns(data?: TableColumn[]) {
    const columns = ref<TableColumnFormat[]>([]);

    const isShowIndex = computed(() => columns.value.some(v => v.type === "index"));
    const isShowSelection = computed(() => columns.value.some(v => v.type === "selection"));

    const checkedIndex = computed({
        get: () => columns.value.find(v => v.type === "index")?.visible || false,
        set: value => {
            const index = columns.value.findIndex(v => v.type === "index");
            columns.value[index].visible = value;
        },
    });

    const checkedSelection = computed({
        get: () => columns.value.find(v => v.type === "selection")?.visible || false,
        set: value => {
            const index = columns.value.findIndex(v => v.type === "selection");
            columns.value[index].visible = value;
        },
    });

    const checkAll = computed({
        get: () => getCheckedAll(columns.value),
        set: value => {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            if(indeterminate.value) {
                setVisible(columns.value, true);
            } else {
                setVisible(columns.value, value);
            }
        },
    });
    const indeterminate = computed(() => checkAll.value ? false : getCheckedOne(columns.value));

    watch(() => data, onReset, {
        immediate: true,
        deep: true,
    });

    function onReset() {
        columns.value = formatColumns(cloneDeep(data));
    }
    return {
        columns,
        isShowIndex,
        isShowSelection,
        checkAll,
        indeterminate,
        checkedIndex,
        checkedSelection,
        onReset,
    };
}