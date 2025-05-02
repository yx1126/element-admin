import { renderIcon } from "../renderIcon";
import type { Component, PropType } from "vue";
import { ElLink as ELink, linkProps } from "element-plus";
import { throttle } from "lodash-es";

export default defineComponent({
    name: "ElLink",
    props: {
        icon: [String, Object] as PropType<string | Component>,
        underline: { type: linkProps.underline.type as PropType<"always" | "never" | "hover">, default: "never" },
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