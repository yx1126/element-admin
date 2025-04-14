import baseTableColumnProps from "element-plus/es/components/table/src/table-column/defaults";
import type { Component, ExtractPublicPropTypes, VNode, Ref, ComputedRef, WritableComputedRef, InjectionKey } from "vue";
import type { TableProps as BaseTableProps, TableColumnCtx, LinkProps, ButtonProps } from "element-plus";
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
    checked: boolean;
    children?: TableColumnFormat[];
    deep: number;
};

export interface TableActionItem<T extends string = any> {
    action: T;
    icon?: string | Component;
    append?: "before";
    type?: LinkProps["type"] | ButtonProps["type"];
    text?: string;
}

export interface TableContext {
    columns: Ref<TableColumnFormat[]>;
    isShowIndex: ComputedRef<boolean>;
    isShowSelection: ComputedRef<boolean>;
    checkedIndex: WritableComputedRef<boolean>;
    checkedSelection: WritableComputedRef<boolean>;
    checkAll: WritableComputedRef<boolean>;
    indeterminate: ComputedRef<boolean>;
    onReset: () => void;
}

export const tableContextKey = Symbol() as InjectionKey<TableContext>;

export const FixedLeft: TableColumn["fixed"][] = [true, "left"];
export const FixedRight: TableColumn["fixed"][] = ["right"];

function formatColumns(columns?: TableColumn[], index?: number, deep = 0): TableColumnFormat[] {
    if(!columns?.length) return [];
    const { index: indexList, selection, left, middle, right } = columns.reduce<Record<string, TableColumnFormat[]>>((pre, column, i) => {
        if(deep !== 0 && ["selection", "index", "expand"].includes(column.type || "default")) return pre;
        const item = {
            id: "crypto" in window ? crypto.randomUUID() : index !== null && index !== undefined ? `${index}-${i}` : `${i}`,
            ...column,
            checked: true,
            children: formatColumns(column.children, i, deep + 1),
            deep,
            fixed: ["index", "selection"].includes(column.type!) ? "left" : column.fixed,
        };
        if(item.type === "index") {
            pre.index.push(item);
        } else if(item.type === "selection") {
            pre.selection.push(item);
        } else if(!item.fixed || deep !== 0) {
            pre.middle.push(item);
        } else if(FixedLeft.includes(item.fixed)) {
            pre.left.push(item);
        } else if(FixedRight.includes(item.fixed)) {
            pre.right.push(item);
        }
        return pre;
    }, { index: [], selection: [], left: [], middle: [], right: [] });
    return [...selection, ...indexList, ...left, ...middle, ...right];
}

function getCheckedAll(columns: TableColumnFormat[]): boolean {
    return columns.every(c => {
        if(c.type === "index" || c.type === "selection") return true;
        return !c.children?.length ? c.checked : (c.checked && getCheckedAll(c.children));
    });
}

function getCheckedOne(columns: TableColumnFormat[]): boolean {
    return columns.some(c => {
        if(c.type === "index" || c.type === "selection") return false;
        return !c.children?.length ? c.checked : (c.checked || getCheckedAll(c.children));
    });
}

function setVisible(columns: TableColumnFormat[], value: boolean) {
    columns.forEach(item => {
        if(item.type === "index" || item.type === "selection") return;
        item.checked = value;
        if(item.children) {
            setVisible(item.children, value);
        }
    });
}

export function useColumns(data?: TableColumn[]) {
    const columns = ref<TableColumnFormat[]>([]);
    const setColumns = ref<TableColumnFormat[]>([]);

    const isShowIndex = computed(() => columns.value.some(v => v.type === "index"));
    const isShowSelection = computed(() => columns.value.some(v => v.type === "selection"));

    const checkedIndex = computed({
        get: () => {
            return columns.value.find(v => v.type === "index")?.checked || false;
        },
        set: value => {
            const index = columns.value.findIndex(v => v.type === "index");
            columns.value[index].checked = value;
        },
    });

    const checkedSelection = computed({
        get: () => columns.value.find(v => v.type === "selection")?.checked || false,
        set: value => {
            const index = columns.value.findIndex(v => v.type === "selection");
            columns.value[index].checked = value;
        },
    });

    const checkAll = computed({
        get: () => {
            if(columns.value.length <= 0) return false;
            return getCheckedAll(columns.value);
        },
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

    const isEmpty = computed(() => columns.value.filter(v => v.checked).length <= 0);

    watch(() => data, onReset, {
        immediate: true,
        deep: true,
    });

    function onReset() {
        columns.value = formatColumns(cloneDeep(data));
        setColumns.value = columns.value.filter(v => !["index", "selection"].includes(v.type || ""));
    }

    return {
        columns,
        setColumns,
        isShowIndex,
        isShowSelection,
        isEmpty,
        checkAll,
        indeterminate,
        checkedIndex,
        checkedSelection,
        onReset,
    };
}