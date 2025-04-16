<script lang="tsx">
import { useNamespace } from "element-plus";
import { tableContextKey, useColumns, type TableColumn, type TableColumnFormat, type TableSlot } from "./table";
import TableSet from "./TableSet.vue";
import type { SlotsType, VNode } from "vue";
import { throttle } from "lodash-es";

export default defineComponent({
    name: "BaseTable",
    inheritAttrs: false,
    props: {
        columns: { type: Array as PropType<TableColumn[]>, default: () => [] },
        loading: Boolean,
        tools: { type: Boolean, default: true },
    },
    emits: ["refresh"],
    slots: Object as SlotsType<{
        append?: () => VNode[];
        empty?: () => VNode[];
    } & Record<string, (data: TableSlot) => VNode[]>>,
    setup(props, { attrs, slots, emit }) {
        const ns = useNamespace("table", ref("base"));
        const { t } = useLocal();
        const rotation = ref("");

        const {
            columns,
            setColumns,
            isShowIndex,
            isShowSelection,
            checkedIndex,
            checkedSelection,
            checkAll,
            indeterminate,
            isEmpty,
            onReset,
        } = useColumns(props.columns);

        const onRefresh = throttle(() => {
            if(!rotation.value) {
                rotation.value = "rotation";
                setTimeout(() => {
                    rotation.value = "";
                }, 1000);
            }
            emit("refresh");
        }, 1000, { trailing: false });

        provide(tableContextKey, {
            columns: setColumns,
            isShowIndex,
            isShowSelection,
            checkedIndex,
            checkedSelection,
            checkAll,
            indeterminate,
            onReset,
        });

        function renderColumns(columns: TableColumnFormat[]) {
            return columns.map(column => {
                const { checked, children, slotName, render, renderHeader, renderFilterIcon, ...otherColumns } = column;
                if(!checked) return null;
                return (
                    <el-table-column {...otherColumns}>
                        {{
                            default: (data: TableSlot) => {
                                if(children?.length) {
                                    return renderColumns(children);
                                }
                                if(render) return render(data);
                                if(slotName) return renderSlot(slots, slotName, { ...data });
                            },
                            header: renderHeader ? renderHeader : undefined,
                            "filter-icon": renderFilterIcon ? renderFilterIcon : undefined,
                        }}
                    </el-table-column>
                );
            });
        }

        return () => {
            const { loading, tools } = props;
            return (
                <div class={ns.b()}>
                    {tools
                        ? (
                            <div class={ns.e("tool")}>
                                <div class={ns.e("action")}>{renderSlot(slots, "action")}</div>
                                <div class={ns.e("extra")}>
                                    {renderSlot(slots, "extra")}
                                    <icon class={rotation.value} cursor icon="EleRefreshRight" onClick={onRefresh} />
                                    <TableSet />
                                </div>
                            </div>
                        )
                        : null}
                    <el-table v-show={!isEmpty.value} v-loading={loading} {...attrs}>
                        {{
                            default: () => renderColumns(columns.value),
                            append: slots.append ? () => renderSlot(slots, "append") : undefined,
                            empty: slots.empty ? () => renderSlot(slots, "empty") : undefined,
                        }}
                    </el-table>
                    {isEmpty.value
                        ? (
                            <div class={ns.e("empty")}>
                                <span class={ns.em("empty", "text")}>{t("empty-column")}</span>
                            </div>
                        )
                        : null}
                </div>
            );
        };
    },
});
</script>

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
    &__empty {
        position: sticky;
        left: 0;
        min-height: 60px;
        text-align: center;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid var(--el-border-color-lighter);
        &--text {
            line-height: 60px;
            width: 50%;
            color: var(--el-text-color-secondary);
            font-size: 14px;
        }
    }
    // &__action {

    // }
    &__extra {
        gap: 10px;
        font-size: 18px;
    }
    .rotation {
        transform: rotate(360deg);
        transition: transform 1s;
    }
}
</style>

<i18n lang="yaml">
zh:
  confirmSet: 确认要重置吗？
  empty-column: 暂无列数据
en:
  confirmSet: Are you sure you want to reset?
  empty-column: No Column Data
</i18n>