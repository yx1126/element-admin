import { isFn } from "@/utils/validata";
import type { TableColumn } from "@/components/GlobalRegister/Table";
import { Configs } from "@/config";

type ColumnFormatter<T = any> = (column: TableColumn<T>, index: number) => TableColumn<T>;

const extend = Object.assign;

export type {
    TableColumn,
};

export function defineColumns<T = any>(columns: TableColumn<T>[], ...props: (TableColumn<T> | ColumnFormatter<T>)[]) {
    const { tableColumn } = Configs;
    return columns.map((c, i) => {
        const defaultColumns = isFn(tableColumn) ? tableColumn(c) : tableColumn;
        if(props.length <= 0) return extend(defaultColumns, c);
        return props.reduce((column, prop) => {
            if(isFn(prop)) prop = prop(column, i);
            return extend(column, prop, c);
        }, defaultColumns);
    });
}
