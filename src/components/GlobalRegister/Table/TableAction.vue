<script lang="tsx">
import { parseUnit } from "@/utils/unit";
import type { PropType, SlotsType, VNode } from "vue";

export default defineComponent({
    name: "TableAction",
    props: {
        size: { type: [Number, String], default: 16 },
        gap: { type: [Number, String], default: 10 },
        align: { type: String as PropType<"left" | "center" | "right">, default: "center" },
    },
    slots: Object as SlotsType<{
        default?: () => VNode[];
    }>,
    setup(props, { slots }) {
        return () => {
            const { size, gap, align } = props;
            return (
                <div
                    class={`table-action ${align ? "table-action--" + align : ""}`}
                    style={{
                        "--table-action-size": parseUnit(size),
                        "--table-action-gap": parseUnit(gap),
                    }}
                >
                    {renderSlot(slots, "default")}
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