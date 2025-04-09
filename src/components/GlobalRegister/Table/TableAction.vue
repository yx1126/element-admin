<script lang="tsx">
import type { PropType } from "vue";
import type { TableActionItem } from "./table";
import { parseUnit } from "@/utils/unit";

export default defineComponent({
    name: "TableAction",
    props: {
        actions: { type: Array as PropType<TableActionItem[]>, default: () => [] },
        size: { type: [Number, String], default: 16 },
    },
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
            props.actions.forEach(item => {
                if(!item.append) {
                    after.push(item);
                } else if(item.append === "before") {
                    before.push(item);
                }
            });
            return [...before, ...middle, ...after];
        });

        function onClick(item: TableActionItem) {
            emit(item.action);
        }

        return () => {
            return (
                <div class="table-action" style={{ "--table-action-size": parseUnit(props.size) }}>
                    {renderSlot(slots, "before")}
                    {actions.value.map(item => {
                        return <el-link type={item.type} icon={item.icon} onClick={() => onClick(item)} />;
                    })}
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
    gap: 10px;
    --el-font-size-base: var(--table-action-size);
}
</style>