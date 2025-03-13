<script lang="tsx">
import { langList } from "@/locales";
import type { SlotsType, VNode } from "vue";

export default defineComponent({
    name: "LangSelect",
    inheritAttrs: false,
    props: {
        type: { type: String as PropType<"select" | "dropdown">, default: "select" },
    },
    slots: Object as SlotsType<{ default?: () => VNode[] }>,
    setup(props, { attrs, slots }) {
        const { lang, setLang } = useLocales();
        return () => {
            const { type } = props;
            if(type === "dropdown") {
                return (
                    <el-dropdown {...attrs} trigger="click" onCommand={setLang}>
                        {{
                            default: () => renderSlot(slots, "default"),
                            dropdown: () => {
                                return (
                                    <el-dropdown-menu>
                                        {
                                            langList.map(item => {
                                                return <el-dropdown-item key={item.value} command={item.value}>{item.label}</el-dropdown-item>;
                                            })
                                        }
                                    </el-dropdown-menu>
                                );
                            },
                        }}
                    </el-dropdown>
                );
            }
            if(type === "select") {
                return (
                    <el-select {...attrs} modelValue={lang.value} onChange={setLang}>
                        {
                            langList.map(item => {
                                return (<el-option key={item.value} value={item.value} label={item.label} />);
                            })
                        }
                    </el-select>
                );
            }
            return null;
        };
    },
});
</script>
