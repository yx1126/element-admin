import { renderIcon } from "../renderIcon";
import type { Component, PropType } from "vue";
import { ElButton as EButton } from "element-plus";
import { throttle } from "lodash-es";

export default defineComponent({
    name: "ElButton",
    props: {
        icon: [String, Object] as PropType<string | Component>,
        delay: { type: Number, default: 1000 },
    },
    emits: ["click"],
    setup(props, { slots, emit }) {
        const onClick = throttle(() => {
            emit("click");
        }, props.delay, { trailing: false });
        return () => {
            return (
                <EButton icon={renderIcon(props.icon)} onClick={onClick}>{{ ...slots }}</EButton>
            );
        };
    },
});