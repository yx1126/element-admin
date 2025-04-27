<script lang="tsx">
import { getDictData } from "@/utils/dict";
import type { DictData } from "#/dict";
import type { PropType, SlotsType, VNode } from "vue";

export default defineComponent({
    name: "DictLabel",
    props: {
        options: Array as PropType<(Partial<DictData> & Record<string, any>)[]>,
        type: String,
        value: [String, Number] as PropType<string | number>,
        labelKey: { type: String, default: "label" },
        valueKey: { type: String, default: "value" },
    },
    slots: Object as SlotsType<{
        default?: () => VNode[];
    }>,
    setup(props) {
        const options = ref<DictData[]>([]);

        watch(() => props.type, async value => {
            const dictData = await getDictData(value);
            options.value = dictData;
        }, {
            immediate: true,
        });

        const dict = computed(() => {
            const { options: dataList, valueKey, value } = props;
            return (dataList ?? options.value).find((v: any) => {
                return v[valueKey] == value;
            }) as DictData & Record<string, any>;
        });

        return {
            dict,
        };
    },
    render() {
        const { $slots, dict, labelKey } = this;
        if(!dict) return null;
        const Label = renderSlot($slots, "default", { data: dict }, () => [dict[labelKey]]);
        if(dict.nodeType === "0") {
            if(!dict.type || dict.type === "default") {
                return <el-text>{Label}</el-text>;
            }
            return <el-text type={dict.type}>{Label}</el-text>;
        } if(dict.nodeType === "1") {
            if(!dict.type || dict.type === "default") {
                return <el-tag>{Label}</el-tag>;
            }
            return <el-tag type={dict.type}>{Label}</el-tag>;
        }
        return <span>{Label}</span>;
    },
});
</script>