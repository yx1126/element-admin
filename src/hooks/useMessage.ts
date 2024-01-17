import { isObject, isString, isUndefined } from "@/utils/validata";
import type {
    MessageOptions,
    MessageHandler,
    ElMessageBoxOptions,
    ElMessageBoxShortcutMethod,
    messageType,
    NotificationProps,
    NotificationOptions,
    NotificationHandle,
} from "element-plus";
import type { AppContext, VNode } from "vue";

const assign = Object.assign;

const defaultMessage: MessageOptions = {
    duration: 1500,
};

const defaultMessageBox: ElMessageBoxOptions = {};

const defaultNotify: Partial<NotificationOptions> = {};

// Message
type Options = Omit<MessageOptions, "message">;
const msgType = ["success", "info", "warn", "error"] as const;
type MessageType = typeof msgType[number];
type MessageReturn = Record<MessageType, {
    (message: string | VNode | (() => VNode)): MessageHandler;
    (message: string | VNode | (() => VNode), options: Options): MessageHandler;
    (message: string | VNode | (() => VNode), options: Options, appContext: Nullable<AppContext>): MessageHandler;
}>;

// MessageBox
const msgBoxType = [...msgType, "alert", "confirm", "prompt"] as const;
type MessageBoxType = typeof msgBoxType[number];
type MessageBoxReturn = Record<MessageBoxType, ElMessageBoxShortcutMethod>;

// Notification
export type NotifyOptions = Partial<Writable<Omit<NotificationProps, "title" | "message" | "type">>>;
const notifyType = ["alert", ...msgType] as const;
type NotifyType = typeof notifyType[number];
type NotifyReturn = Record<NotifyType, {
    (message: string | VNode): NotificationHandle;
    (message: string | VNode, title: string): NotificationHandle;
    (message: string | VNode, options: NotifyOptions): NotificationHandle;
    (message: string | VNode, title: string, appContext: Nullable<AppContext>): NotificationHandle;
    (message: string | VNode, options: NotifyOptions, appContext: Nullable<AppContext>): NotificationHandle;
}>;

function transformType(type: MessageType): messageType {
    return ({
        warn: "warning",
    } as any)[type] || type;
}

export function useMessage(options?: MessageOptions, appContext?: Nullable<AppContext>): MessageReturn {
    const defOptions = Object.assign(defaultMessage, options);
    const ctx = appContext;
    const result: any = {};
    msgType.forEach((key) => {
        result[key] = (message: string | VNode | (() => VNode), options?: Options, appContext?: Nullable<AppContext>) => {
            return ElMessage[transformType(key)]({
                ...defOptions,
                ...options,
                message,
            }, appContext ?? ctx);
        };
    });
    return result;
}

export function useMessageBox(options?: ElMessageBoxOptions, appContext?: Nullable<AppContext>): MessageBoxReturn {
    const defOptions = Object.assign(defaultMessageBox, options);
    const ctx = appContext;
    const result: any = {};
    msgBoxType.forEach(key => {
        result[key] = (message: string | VNode | (() => VNode), title: string | ElMessageBoxOptions, options?: ElMessageBoxOptions, appContext?: Nullable<AppContext>) => {
            if(isObject(title)) {
                options = title;
                title = "系统提示";
            } else if(isUndefined(title)) {
                title = "系统提示";
            }
            const opt = Object.assign(defOptions, options);
            if(["alert", "confirm", "prompt"].includes(key)) {
                return (ElMessageBox as any)[key](message, title, opt, appContext ?? ctx);
            } else {
                return ElMessageBox.alert(message, title, {
                    ...opt,
                    type: transformType(key as MessageType),
                }, appContext ?? ctx);
            }
        };
    });
    return result;
}

export function useNotification(options?: NotifyOptions, appContext?: Nullable<AppContext>) {
    const opt: NotifyOptions = Object.assign(defaultNotify, options);
    const ctx = appContext;
    const result: any = {};
    notifyType.forEach(key => {
        result[key] = (message: string | VNode, options?: NotifyOptions | string, appContext?: Nullable<AppContext>) => {
            let title: string = "";
            if(isString(options)) {
                title = options;
                options = {};
            }
            if(key === "alert") {
                return (ElNotification as Function)({
                    ...assign({}, options, opt),
                    title,
                    message,
                }, appContext ?? ctx);
            } else {
                const type = transformType(key);
                return (ElNotification[type] as Function)({
                    title: title || type.substring(0, 1).toUpperCase() + type.substring(1),
                    ...assign({}, options, opt),
                    message,
                }, appContext ?? ctx);
            }
        };
    });
    return result as NotifyReturn;
}