import { renderIcon } from "../renderIcon";
import type { Component, PropType } from "vue";
import { ElButton as EButton } from "element-plus";

export default defineComponent({
    name: "ElButton",
    props: {
        icon: [String, Object] as PropType<string | Component>,
    },
    render() {
        return (
            <EButton icon={renderIcon(this.icon)}>{{ ...this.$slots }}</EButton>
        );
    },
});