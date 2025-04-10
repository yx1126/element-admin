<script lang="tsx" generic="T">
import { useNamespace } from "element-plus";
import { useColumns, type TableColumn, type TableColumnFormat, type TableSlot } from "./table";
import { SettingOutlined } from "@vicons/antd";
import { VerticalLeftOutlined, VerticalRightOutlined } from "@vicons/antd";

export default defineComponent({
    name: "BaseTable",
    inheritAttrs: false,
    props: {
        columns: { type: Array as PropType<TableColumn[]>, default: () => [] },
        loading: Boolean,
        tools: { type: Boolean, default: true },
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
            isEmpty,
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

        function onFixedClick(item: TableColumnFormat, value: TableColumnFormat["fixed"]) {
            if(value === "left") {
                item.fixed = item.fixed === "left" || item.fixed === true ? undefined : value;
            } else if(value === "right") {
                item.fixed = item.fixed === "right" ? undefined : value;
            }
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
                                    <el-popover
                                        width="auto"
                                        placement="bottom-end"
                                        persistent={false}
                                        trigger="click"
                                        hide-after={0}
                                        popper-style="padding: 0;"
                                    >
                                        {{
                                            reference: () => <icon cursor><SettingOutlined /></icon>,
                                            default: () => {
                                                return (
                                                    <div class="table-set">
                                                        <div class="table-set__header">
                                                            <el-checkbox
                                                                v-model={checkAll.value}
                                                                indeterminate={indeterminate.value}
                                                            >
                                                                列展示
                                                            </el-checkbox>
                                                            {isShowIndex.value ? <el-checkbox v-model={checkedIndex.value}>序号列</el-checkbox> : null}
                                                            {isShowSelection.value ? <el-checkbox v-model={checkedSelection.value}>勾选列</el-checkbox> : null}
                                                            <el-popconfirm
                                                                width="200"
                                                                title={t("confirmSet")}
                                                                hide-after={0}
                                                                onConfirm={onReset}
                                                            >
                                                                {{ reference: () => <el-link class="ml-20px" type="primary">{$t("button.reset")}</el-link> }}
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
                                                                        default: ({ data }: { data: TableColumnFormat }) => {
                                                                            return (
                                                                                <div class="table-set__list-item">
                                                                                    <div class="flex items-center gap-10px">
                                                                                        <el-checkbox v-model={data.visible} />
                                                                                        <span>{ data.label }</span>
                                                                                    </div>
                                                                                    <div class="flex items-center">
                                                                                        <el-button-group size="small">
                                                                                            <el-button
                                                                                                type={[true, "left"].includes(data.fixed!) ? "primary" : undefined}
                                                                                                icon={VerticalRightOutlined}
                                                                                                onClick={() => onFixedClick(data, "left")}
                                                                                            />
                                                                                            <el-button
                                                                                                type={data.fixed === "right" ? "primary" : undefined}
                                                                                                icon={VerticalLeftOutlined}
                                                                                                onClick={() => onFixedClick(data, "right")}
                                                                                            />
                                                                                        </el-button-group>
                                                                                    </div>
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
                        )
                        : null}
                    <el-table v-show={!isEmpty.value} v-loading={loading} {...attrs}>
                        {{
                            default: () => renderColumns(baseColumns.value),
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
    // &__extra {

    // }
}
.table-set {
    @include no-select;
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
            padding-right: 14px;
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
  empty-column: 暂无列数据
en:
  confirmSet: Are you sure you want to reset?
  empty-column: No Column Data
</i18n>