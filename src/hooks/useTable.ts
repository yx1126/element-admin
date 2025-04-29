import { isArray, isFn, isObject, isStr } from "@/utils/validata";
import { Configs } from "@/config";
import type { TableColumn } from "@/components/GlobalRegister/Table";
import type { PageInfo, Result, TableResult } from "#/axios";
import type { PaginationProps, TableProps, FormInstance, ElMessageBoxOptions } from "element-plus";

type ColumnFormatter<Data = any> = (column: TableColumn<Data>, index: number) => TableColumn<Data>;

const extend = Object.assign;

export type {
    TableColumn,
};

export type Pagination = Partial<Writable<PaginationProps>>;

export interface FormatterOptions {
    indexMethod: (index: number) => number;
}

interface TableOptions<Data extends object, Query = any> {
    request: (data: Query) => Promise<TableResult<Data[]>>;
    paging?: Pagination;
    deleteRequest?: (id: string | string[]) => Promise<Result>;
    query?: () => Partial<Query>;
    rowKey?: TableProps<Data>["rowKey"];
    tableAttrs?: Partial<Omit<TableProps<Data>, "data" | "rowKey">>;
    beforeRequest?: (data: Query & Pick<PageInfo, "page" | "size">) => any;
    afterRequest?: (data: TableState<Data, Query>) => void;
    formatter?: (data: any[], options: FormatterOptions) => Data[];
    beforeReset?: () => void;
    immediate?: boolean;
    formRef?: string;
}
export interface TableState<Data extends object, Query = any> {
    loading: boolean;
    paging: Pagination & {
        total: number;
        currentPage: number;
        pageSize: number;
    };
    data: Data[];
    selections: Data[];
    query: Query;
}

export function defineColumns<Data = any>(columns: TableColumn<Data>[], ...props: (TableColumn<Data> | ColumnFormatter<Data>)[]) {
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

function formatFn<Data, F extends ((data: any) => Data)>(data: Data, fn?: F): Data {
    return isFn(fn) ? fn(data) : data;
}

export function useTable<
    Data extends object = any,
    Query = any,
>(options: TableOptions<Data, Query>) {
    const { onDelete } = useDataDelete({
        request: options.deleteRequest!,
        rowKey: options.rowKey,
        onSuccess: onSearch,
    });
    const formRef = useTemplateRef<Nullable<FormInstance>>(options.formRef!);

    const state: TableState<Data> = reactive({
        loading: false,
        query: options.query ? options.query() : {},
        paging: extend({
            total: 0,
            currentPage: 1,
            pageSize: 10,
            pageSizes: [10, 20, 30, 50, 100],
            ...markRaw({
                "onUpdate:pageSize": (value: number) => {
                    state.paging.currentPage = value;
                    onSearch();
                },
                "onUpdate:currentPage": (value: number) => {
                    state.paging.pageSize = value;
                    onSearch();
                },
            }),
        }, options.paging),
        data: [],
        selections: [],
    });

    const tableAttrs = computed<Omit<TableProps<Data>, "data">>(() => {
        return {
            ...options.tableAttrs,
            rowKey: options.rowKey,
            border: true,
            loading: state.loading,
            onSelectionChange,
        };
    });

    onBeforeMount(() => {
        if(options.immediate) {
            onSearch();
        }
    });

    function onSelectionChange(selections: Data[]) {
        state.selections = selections;
    }

    function indexMethod(index: number) {
        return index + 1 + (state.paging.currentPage - 1) * state.paging.pageSize;
    }

    function getRowKey(row: Data): string {
        const data: Record<string, any> = row;
        const { rowKey } = options;
        if(isStr(rowKey)) {
            return data[rowKey];
        } if(isFn(rowKey)) {
            return rowKey(row);
        }
        return data.id;
    }

    function updatePage(total: number) {
        const afterPage = Math.ceil(total / state.paging.pageSize);
        const currentPage = state.paging.currentPage > afterPage ? afterPage : state.paging.currentPage;
        state.paging.currentPage = Math.max(currentPage, 1);
    }

    async function onSearch() {
        const { request, formatter, beforeRequest, afterRequest } = options;
        try {
            state.loading = true;
            const querForm = {
                ...state.query,
                page: state.paging.currentPage,
                size: state.paging.pageSize,
            };
            const res = await request(formatFn(querForm, beforeRequest));
            // 分页问题
            const data = res.data as PageInfo<Data[]>;
            if(state.paging.total > data.total) {
                updatePage(data.total);
            }
            state.data = formatter ? formatter(data.data, { indexMethod }) : data.data;
            state.paging.total = data.total;
            if(afterRequest) {
                afterRequest(state);
            }
        } catch (e) {
            console.error(e);
        } finally {
            state.loading = false;
        }
    }

    async function onRefresh(refresh?: any) {
        if(refresh !== false) {
            state.paging.currentPage = 1;
        }
        await onSearch();
    }

    async function onReset() {
        const { beforeReset } = options;
        formRef.value?.resetFields();
        if(beforeReset) {
            beforeReset();
        }
        await onRefresh();
    }

    function onClear() {
        state.data = [];
        state.paging.total = 0;
        state.paging.currentPage = 1;
    }

    return {
        ...toRefs(state),
        tableAttrs,
        formRef,
        onSearch,
        onReset,
        onClear,
        onRefresh,
        onDelete,
        indexMethod,
        getRowKey,
        onSelectionChange,
    };
}

export interface DeleteOptions<Query = any> {
    request: (ids: Query) => Promise<Result>;
    rowKey?: TableProps<any>["rowKey"];
    showLoading?: boolean;
    onSuccess?: () => void;
}

export function useDataDelete<Query = any>(options: DeleteOptions<Query>) {
    const { request, rowKey, onSuccess, showLoading = true } = options;

    const { $t } = useLocal();
    const msgBox = useMessageBox();
    const message = useMessage();

    function getRowKey(row: any): string {
        const data: Record<string, any> = row;
        if(isStr(rowKey)) {
            return data[rowKey];
        } if(isFn(rowKey)) {
            return rowKey(row);
        }
        return data?.id;
    }

    function onDelete(id: string | number): void;
    function onDelete(ids: string[] | number[]): void;
    function onDelete<Data extends object>(row: Data): void;
    function onDelete<Data extends object>(row: Data | string[] | number[] | string | number) {
        if(!request) return;
        const ids: any = isArray<any[]>(row) ? row : isObject(row) ? [getRowKey(row)] : [row];
        const options: ElMessageBoxOptions = { type: "warning" };
        if(showLoading) {
            options.showInput = false;
            options.beforeClose = async (action, instance, done) => {
                if(action === "confirm") {
                    try {
                        instance.confirmButtonLoading = true;
                        await request(ids);
                        done();
                    } catch (error) {
                        console.error(error);
                    } finally {
                        instance.confirmButtonLoading = false;
                    }
                    return;
                }
                done();
            };
        }
        if(ids.length) {
            if(showLoading) {
                msgBox.prompt($t("delete.confirm"), options).then(() => {
                    message.success($t("delete.success"));
                    onSuccess?.();
                }).catch(() => {});
            } else {
                msgBox.confirm($t("delete.confirm"), options).then(async () => {
                    try {
                        await request(ids);
                        message.success($t("delete.success"));
                        onSuccess?.();
                    } catch (error) {
                        console.error(error);
                    }
                }).catch(() => {});
            }
        }
    }

    return {
        onDelete,
    };
}