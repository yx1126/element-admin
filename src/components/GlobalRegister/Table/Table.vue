<script lang="tsx" generic="T">
import { useNamespace } from "element-plus";
import { useColumns, type TableColumn, type TableColumnFormat, type TableSlot } from "./table";
import { SettingOutlined } from "@vicons/antd";

export default defineComponent({
    name: "BaseTable",
    inheritAttrs: false,
    props: {
        columns: { type: Array as PropType<TableColumn[]>, default: () => [] },
        loading: Boolean,
    },
    setup(props, { attrs, slots }) {
        const ns = useNamespace("table", ref("base"));
        const { t } = useI18n();
        const { t: $t } = useI18n({ useScope: "global" });

        const {
            columns: baseColumns,
            isShowIndex,
            isShowSelection,
            checkedIndex,
            checkedSelection,
            checkAll,
            indeterminate,
            onReset,
        } = useColumns(props.columns);

        const treeProps = {
            label: "label",
            children: "children",
        };

        const setColumns = computed(() => baseColumns.value.filter(v => !["index", "selection"].includes(v.type || "")));

        function renderColumns(columns: TableColumnFormat[]) {
            return columns.map(column => {
                const { visible, children, slotName, render, renderHeader, renderFilterIcon, ...otherColumns } = column;
                if(!visible) return null;
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
            const { loading } = props;
            return (
                <div class={ns.b()}>
                    <div class={ns.e("tool")}>
                        <div class={ns.e("action")}>{renderSlot(slots, "action")}</div>
                        <div class={ns.e("extra")}>
                            {renderSlot(slots, "extra")}
                            <el-popover visible width="auto" placement="bottom-end" popper-style="padding: 0;">
                                {{
                                    reference: () => <icon cursor><SettingOutlined /></icon>,
                                    default: () => {
                                        return (
                                            <div class="table-set">
                                                <div class="table-set__header">
                                                    <el-checkbox v-model={checkAll.value} indeterminate={indeterminate.value}>列展示</el-checkbox>
                                                    {isShowIndex.value ? <el-checkbox v-model={checkedIndex.value}>序号列</el-checkbox> : null}
                                                    {isShowSelection.value ? <el-checkbox v-model={checkedSelection.value}>勾选列</el-checkbox> : null}
                                                    <el-popconfirm width="200" title={t("confirmSet")} hide-after={0} onConfirm={onReset}>
                                                        {{
                                                            reference: () => <el-link class="ml-20px" type="primary">{$t("button.reset")}</el-link>,
                                                        }}
                                                    </el-popconfirm>

                                                </div>
                                                <div class="table-set__list">
                                                    <el-scrollbar max-height="300">
                                                        <el-tree
                                                            class="tree"
                                                            data={setColumns.value}
                                                            props={treeProps}
                                                            expand-on-click-node={false}
                                                            node-key="id"
                                                        >
                                                            {{
                                                                default: ({ data }: any) => {
                                                                    return (
                                                                        <div class="table-set__list-item">
                                                                            <div class="flex items-center gap-10px">
                                                                                <el-checkbox v-model={data.visible} />
                                                                                <span>{ data.label }</span>
                                                                            </div>
                                                                            <div class="flex items-center"></div>
                                                                        </div>
                                                                    );
                                                                },
                                                            }}
                                                        </el-tree>
                                                    </el-scrollbar>
                                                </div>
                                            </div>
                                        );
                                    },
                                }}
                            </el-popover>
                        </div>
                    </div>
                    <el-table v-loading={loading} {...attrs}>
                        {{
                            default: () => renderColumns(baseColumns.value),
                            append: slots.append ? () => renderSlot(slots, "append") : undefined,
                            empty: slots.empty ? () => renderSlot(slots, "empty") : undefined,
                        }}
                    </el-table>
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
    // &__action {

    // }
    // &__extra {

    // }
}
.table-set {
    &__header {
        min-width: 250px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 14px 8px 24px;
        gap: 10px;
        border-bottom: 1px solid var(--el-border-color);
        &>* {
            margin-right: 0;
        }
    }
    &__list {
        .tree {
            --el-tree-node-content-height: 34px;
        }
        position: relative;
        padding: 5px 0;
        &-item {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .index {
                display: inline-block;
                width: 30px;
            }
            .checkbox {
                flex: 1;
            }
        }
    }
}
</style>

<i18n lang="yaml">
zh:
  confirmSet: 确认要重置吗？
en:
  confirmSet: Are you sure you want to reset?
</i18n>