import type { DefineComponent, Component, VNode } from "vue";
import { defineComponent, createVNode, render, onBeforeUnmount } from "vue";
import { ElDialog, type DialogProps } from "element-plus";
import "element-plus/es/components/dialog/style/css";

export type DailogOptions<T = any> = Partial<Writable<Omit<DialogProps, "modelValue">> & {
    rowProps?: T;
}>;

const golbalOptions: DailogOptions = {
    draggable: true,
};

export default function useDailog<T extends Record<string, any> = Record<string, any>>(
    component: DefineComponent | Component,
    options?: DailogOptions<T>,
) {
    const golbalOpt = options;

    let dialogInst: Nullable<VNode> = null;
    let dialogWrapper: Nullable<HTMLDivElement> = null;
    let dialogContainer: Nullable<HTMLDivElement> = null;

    const visible = ref(true);

    function createDialog(props?: DailogOptions) {
        const { rowProps, ...otherPorps } = Object.assign({}, props);
        return defineComponent(() => {
            function onUpdateModeValue(value: boolean) {
                visible.value = value;
            }
            return () => {
                return h(ElDialog, {
                    ...otherPorps,
                    modelValue: visible.value,
                    "onUpdate:modelValue": onUpdateModeValue,
                }, {
                    default: () => h(component, {
                        ...Object.assign({}, rowProps),
                    }),
                });
            };
        });
    }

    function open(options?: DailogOptions) {
        const opt = Object.assign({}, golbalOptions, golbalOpt, options);
        dialogWrapper = document.querySelector(".el-dialog-wrapper");
        if(!dialogWrapper) {
            dialogWrapper = document.createElement("div");
            dialogWrapper.classList.add("el-dialog-wrapper");
            document.body.appendChild(dialogWrapper);
        }
        if(!dialogContainer) {
            dialogContainer = document.createElement("div");
            dialogWrapper.appendChild(dialogContainer);
            dialogInst = createVNode(createDialog(opt));
            render(dialogInst, dialogContainer);
        }
        visible.value = true;
    }

    function close() {
        visible.value = false;
    }

    function destory() {
        close();
        if(dialogWrapper && dialogContainer) {
            render(null, dialogContainer);
            dialogWrapper.removeChild(dialogContainer);
            dialogContainer = null;
        }
    }

    onBeforeUnmount(() => {
        destory();
    });

    return {
        open,
        close,
    };
}