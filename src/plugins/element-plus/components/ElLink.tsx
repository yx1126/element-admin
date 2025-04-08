import { renderIcon } from "../renderIcon";
import type { Component } from "vue";
import { ElLink as ELink } from "element-plus";

export default defineComponent({
    name: "ElLink",
    props: {
        icon: [String, Object] as PropType<string | Component>,
        underline: Boolean,
    },
    render() {
        const { icon, underline } = this;
        return (
            <ELink icon={renderIcon(icon)} underline={underline}>{{ ...this.$slots }}</ELink>
        );
    },
});