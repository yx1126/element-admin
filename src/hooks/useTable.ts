import { isFn } from "@/utils/validata";
import type { TableColumn } from "@/components/GlobalRegister/Table";

type ColumnFormatter<T = any> = (column: TableColumn<T>, index: number) => TableColumn<T>;

const extend = Object.assign;

export function defineColumns<T = any>(columns: TableColumn<T>[], ...props: (TableColumn<T> | ColumnFormatter<T>)[]) {
    if(props.length > 0) {
        return columns.map((c, i) => {
            return props.reduce((column, prop) => {
                if(isFn(prop)) prop = prop(column, i);
                return extend(column, prop, c);
            }, {});
        });
    }
    return columns;
}
