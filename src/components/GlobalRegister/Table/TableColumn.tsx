import { TableContext } from ".";
import type { TableColumnFormat, TableSlot } from "./table";

export default defineComponent({
    name: "TableColumn",
    props: {
        columns: { type: Array as PropType<TableColumnFormat[]>, required: true },
    },
    setup(props) {
        const table = inject(TableContext);
        return () => {
            const { columns } = props;
            return columns.map(column => {
                const { visible, children, slotName, render, renderHeader, renderFilterIcon, ...otherColumns } = column;
                if(!visible) return null;
                return (
                    <el-table-column {...otherColumns}>
                        {{
                            default: (data: TableSlot) => {
                                if(children?.length) {
                                    return <table-column columns={children} />;
                                }
                                if(render) return render(data);
                                if(slotName && table?.slots) return renderSlot(table.slots, slotName, { ...data });
                            },
                            header: renderHeader ? renderHeader : undefined,
                            "filter-icon": renderFilterIcon ? renderFilterIcon : undefined,
                        }}
                    </el-table-column>
                );
            });
        };
    },
});