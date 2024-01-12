import { isObject, isUndefined } from "@/utils/validata";
import type { MessageOptions, MessageHandler, ElMessageBoxOptions, ElMessageBoxShortcutMethod, messageType } from "element-plus";
import type { AppContext } from "vue";

type Options = Omit<MessageOptions, "message">;

const defaultMessage: MessageOptions = {
    duration: 1000,
};

const defaultMessageBox: ElMessageBoxOptions = {};

const msgType = ["success", "info", "warn", "error"] as const;
type MessageType = typeof msgType[number];

const msgBoxType = ["success", "info", "warn", "error", "alert", "confirm", "prompt"] as const;
type MessageBoxType = typeof msgBoxType[number];

type MessageReturn = Record<MessageType, (message: string, options?: Options) => MessageHandler>;

type MessageBoxReturn = Record<MessageBoxType, ElMessageBoxShortcutMethod>;

function transformType(type: MessageType): messageType {
    return type === "warn" ? "warning" : type;
}

export function useMessage(options?: MessageOptions, appContext?: Nullable<AppContext>): MessageReturn {
    const defOptions = Object.assign(defaultMessage, options);
    const ctx = appContext;
    const result: any = {};
    msgType.forEach((key) => {
        result[key] = (message: string, options?: Options) => {
            return ElMessage[transformType(key)]({
                ...defOptions,
                ...options,
                message,
            }, appContext || ctx);
        };
    });
    return result;
}

export function useMessageBox(options?: ElMessageBoxOptions, appContext?: Nullable<AppContext>): MessageBoxReturn {
    const defOptions = Object.assign(defaultMessageBox, options);
    const ctx = appContext;
    const result: any = {};
    msgBoxType.forEach(key => {
        result[key] = (message: string, title: string | ElMessageBoxOptions, options?: ElMessageBoxOptions, appContext?: Nullable<AppContext>) => {
            if(isObject(title)) {
                options = title;
                title = "系统提示";
            } else if(isUndefined(title)) {
                title = "系统提示";
            }
            const opt = Object.assign(defOptions, options);
            if(["alert", "confirm", "prompt"].includes(key)) {
                return (ElMessageBox as any)[key](message, title, opt, appContext || ctx);
            } else {
                return ElMessageBox.alert(message, title, {
                    ...opt,
                    type: transformType(key as MessageType),
                }, appContext || ctx);
            }
        };
    });
    return result;
}
