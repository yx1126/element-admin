import { renderIcon } from "../renderIcon";
import type { Component } from "vue";
import { ElLink as ELink } from "element-plus";
import { throttle } from "lodash-es";

export default defineComponent({
    name: "ElLink",
    props: {
        icon: [String, Object] as PropType<string | Component>,
        underline: Boolean,
        delay: { type: Number, default: 1000 },
    },
    emits: ["click"],
    setup(props, { slots, emit }) {
        const onClick = throttle(() => {
            emit("click");
        }, props.delay, { trailing: false });
        return () => {
            const { icon, underline } = props;
            return (
                <ELink icon={renderIcon(icon)} underline={underline} onClick={onClick}>{{ ...slots }}</ELink>
            );
        };
    },
});