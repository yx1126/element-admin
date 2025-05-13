<script lang="tsx">
import type { FormInstance } from "element-plus";
import type { SlotsType } from "vue";
import { Configs } from "@/config";

export default defineComponent({
    name: "TableLayout",
    props: {
        model: Object,
        split: { type: Boolean, default: Configs.formSplit },
    },
    emits: ["search", "reset"],
    slots: Object as SlotsType<Slotsable<"default" | "form" | "form-extra">>,
    setup(props, { emit, slots }) {
        const { t: $t } = useLocal();

        const formRef = ref<Nullable<FormInstance>>(null);

        function onSearch() {
            emit("search");
        }

        function onReset() {
            formRef.value?.resetFields();
            emit("reset");
        }
        return () => {
            const { model, split } = props;
            const ExtraSlot = renderSlot(slots, "form-extra");
            const Buttons = (
                <>
                    <el-button type="primary" icon="EleSearch" onClick={onSearch}>{$t("button.search")}</el-button>
                    <el-button onClick={onReset}>{$t("button.reset")}</el-button>
                </>
            );
            const FormNode = (
                <el-form ref={formRef} class="search-form form-flex" model={model} inline>
                    {renderSlot(slots, "form")}
                    {
                        split
                            ? null
                            : (
                                <el-form-item>
                                    {Buttons}
                                    {ExtraSlot}
                                </el-form-item>
                            )
                    }
                </el-form>
            );
            return (
                <div class="table-layout">
                    <el-card-v2>
                        {
                            !split
                                ? FormNode
                                : (
                                    <div class="table-split">
                                        <div class="table-split-form">{FormNode}</div>
                                        <div class="table-split-buttons">
                                            {Buttons}
                                            {split ? ExtraSlot : null}
                                        </div>
                                    </div>
                                )
                        }
                    </el-card-v2>
                    <el-card-v2 class="table-layout-main layout-card">
                        {renderSlot(slots, "default")}
                    </el-card-v2>
                </div>
            );
        };
    },
});
</script>

<style lang="scss" scoped>
.table {
    &-layout {
        color: #000;
        display: flex;
        flex-direction: column;
        flex-shrink: 1;
        &-main {
            margin-top: 10px;
        }
    }
}
:deep(.table-split) {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    .table-split {
        &-form {
            flex: 1;
        }
        &-buttons {
            display: flex;
            align-items: center;
        }
    }
}
</style>