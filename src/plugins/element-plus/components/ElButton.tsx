import { renderIcon } from "../renderIcon";
import type { Component, PropType } from "vue";
import { ElButton as EButton } from "element-plus";
import { throttle } from "lodash-es";
import { DelayKey } from "../keys";

export default defineComponent({
    name: "ElButton",
    props: {
        icon: [String, Object] as PropType<string | Component>,
        delay: { type: Number },
    },
    emits: ["click"],
    setup(props, { slots, emit }) {
        const delay = inject(DelayKey, 1000);

        const onClick = throttle(() => {
            emit("click");
        }, props.delay || delay, { trailing: false });
        return () => {
            return (
                <EButton icon={renderIcon(props.icon)} onClick={onClick}>{{ ...slots }}</EButton>
            );
        };
    },
});