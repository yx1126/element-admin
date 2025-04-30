<script lang="tsx">
import type { PropType, SlotsType, VNode } from "vue";
import type { TableActionItem } from "./table";
import { parseUnit } from "@/utils/unit";
import { isArray } from "@/utils/validata";

export default defineComponent({
    name: "TableAction",
    props: {
        actions: { type: [Array, Object] as PropType<TableActionItem[] | TableActionItem>, default: () => [] },
        size: { type: [Number, String], default: 16 },
        type: { type: String as PropType<"link" | "button">, default: "link" },
        gap: [Number, String],
        showDefaults: { type: Boolean, default: true },
        align: { type: String as PropType<"left" | "center" | "right">, default: "center" },
    },
    slots: Object as SlotsType<{
        default?: () => VNode[];
        before?: () => VNode[];
        after?: () => VNode[];
    }>,
    setup(props, { emit, slots }) {
        const middle: TableActionItem[] = [{
            action: "edit",
            icon: "EleEdit",
            type: "primary",
        }, {
            action: "delete",
            icon: "EleDelete",
            type: "danger",
        }];
        const actions = computed(() => {
            const before: TableActionItem[] = [];
            const after: TableActionItem[] = [];
            (isArray<TableActionItem[]>(props.actions) ? props.actions : [props.actions]).forEach(item => {
                if(!item.append) {
                    after.push(item);
                } else if(item.append === "before") {
                    before.push(item);
                }
            });
            return [...before, ...(props.showDefaults ? middle : []), ...after];
        });

        function onClick(item: TableActionItem) {
            // eslint-disable-next-line vue/require-explicit-emits
            emit("click", item);
            if(item.action) {
                emit(item.action, item);
            }
        }

        return () => {
            const { size, type, gap, align } = props;
            return (
                <div
                    class={`table-action ${align ? "table-action--" + align : ""}`}
                    style={{
                        "--table-action-size": parseUnit(size),
                        "--table-action-gap": parseUnit(gap || type === "button" ? 12 : 10),
                    }}
                >
                    {renderSlot(slots, "before")}
                    {
                        renderSlot(slots, "default", {}, () => {
                            return actions.value.map(item => {
                                if(type === "button") {
                                    return <el-button type={item.type} icon={item.icon} onClick={() => onClick(item)}>{item.text}</el-button>;
                                }
                                return <el-link type={item.type} icon={item.icon} onClick={() => onClick(item)}>{item.text}</el-link>;
                            });
                        })
                    }
                    {renderSlot(slots, "after")}
                </div>
            );
        };
    },
});
</script>

<style lang="scss" scoped>
.table-action {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--table-action-gap);
    --el-font-size-base: var(--table-action-size);
    & > * {
        margin: 0;
    }
    &.table-action--left {
        justify-content: flex-start;
    }
    &.table-action--center {
        justify-content: center;
    }
    &.table-action--right {
        justify-content: flex-end;
    }
}
</style>