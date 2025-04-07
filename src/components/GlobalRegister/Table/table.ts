import baseTableColumnProps from "element-plus/es/components/table/src/table-column/defaults";
import type { ExtractPublicPropTypes } from "vue";
import type { TableProps as BaseTableProps } from "element-plus";

type BaseTableColumn = ExtractPublicPropTypes<typeof baseTableColumnProps>;

export type TableProps<T> = BaseTableProps<T> & {
    columns?: TableColumn[];
};

export type TableColumn = BaseTableColumn & {
    children?: TableColumn[];
};

export type TableColumnFormat = TableColumn & {
    visible?: boolean;
};

function formatColumns(columns?: TableColumn[]): TableColumnFormat[] {
    return columns?.map(column => {
        return {
            ...column,
            children: formatColumns(column.children),
        };
    }) || [];
}

export function useColumns(data?: TableColumn[]) {
    const columns = computed(() => formatColumns(data));

    return {
        columns,
    };
}