import { isStr } from "@/utils/validata";
import type {
    ElMessageBoxOptions,
    MessageOptions,
    NotificationOptions,
    messageType,
    MessageParams,
    NotificationParamsTyped,
} from "element-plus";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import i18n from "@/locales";
import { isVNode, type AppContext } from "vue";

const assign = Object.assign;

function getOptions<T, O>(option: T, opt?: O) {
    if(isStr(option) || isVNode(option)) {
        return assign(opt || {}, {
            message: option,
        });
    }
    return assign(opt || {}, option);
}

export function useMessage(options?: MessageOptions, appContext?: Nullable<AppContext>) {
    const def = options;
    const ctx = appContext;
    return {
        success: (options?: MessageParams, appContext?: null | AppContext) => {
            return ElMessage.success(getOptions(options, def), appContext ?? ctx);
        },
        warning: (options?: MessageParams, appContext?: null | AppContext) => {
            return ElMessage.warning(getOptions(options, def), appContext ?? ctx);
        },
        info: (options?: MessageParams, appContext?: null | AppContext) => {
            return ElMessage.info(getOptions(options, def), appContext ?? ctx);
        },
        error: (options?: MessageParams, appContext?: null | AppContext) => {
            return ElMessage.error(getOptions(options, def), appContext ?? ctx);
        },
        closeAll: (type?: messageType) => ElMessage.closeAll(type),
    };
}

export function useMessageBox(options?: ElMessageBoxOptions, appContext?: Nullable<AppContext>) {
    const def = options;
    const ctx = appContext;
    return {
        alert: (message: ElMessageBoxOptions["message"], title: ElMessageBoxOptions["title"], options?: ElMessageBoxOptions, appContext?: AppContext | null) => {
            return ElMessageBox.alert(message, title || i18n.global.t("sys-tip"), getOptions(options, def), appContext ?? ctx);
        },
        confirm: (message: ElMessageBoxOptions["message"], title: ElMessageBoxOptions["title"], options?: ElMessageBoxOptions, appContext?: AppContext | null) => {
            return ElMessageBox.confirm(message, title || i18n.global.t("sys-tip"), getOptions(options, def), appContext ?? ctx);
        },
        prompt: (message: ElMessageBoxOptions["message"], title: ElMessageBoxOptions["title"], options?: ElMessageBoxOptions, appContext?: AppContext | null) => {
            return ElMessageBox.prompt(message, title || i18n.global.t("sys-tip"), getOptions(options, def), appContext ?? ctx);
        },
        success: (message: ElMessageBoxOptions["message"], title: ElMessageBoxOptions["title"], options?: ElMessageBoxOptions, appContext?: AppContext | null) => {
            return ElMessageBox.alert(message, title || i18n.global.t("sys-tip"), {
                ...getOptions(options, def),
                type: "success",
            }, appContext ?? ctx);
        },
        warning: (message: ElMessageBoxOptions["message"], title: ElMessageBoxOptions["title"], options?: ElMessageBoxOptions, appContext?: AppContext | null) => {
            return ElMessageBox.alert(message, title || i18n.global.t("sys-tip"), {
                ...getOptions(options, def),
                type: "warning",
            }, appContext ?? ctx);
        },
        info: (message: ElMessageBoxOptions["message"], title: ElMessageBoxOptions["title"], options?: ElMessageBoxOptions, appContext?: AppContext | null) => {
            return ElMessageBox.alert(message, title || i18n.global.t("sys-tip"), {
                ...getOptions(options, def),
                type: "info",
            }, appContext ?? ctx);
        },
        error: (message: ElMessageBoxOptions["message"], title: ElMessageBoxOptions["title"], options?: ElMessageBoxOptions, appContext?: AppContext | null) => {
            return ElMessageBox.alert(message, title || i18n.global.t("sys-tip"), {
                ...getOptions(options, def),
                type: "error",
            }, appContext ?? ctx);
        },
        close: () => ElMessageBox.close(),
    };
}

export function useNotification(options?: NotificationOptions, appContext?: Nullable<AppContext>) {
    const def = options;
    const ctx = appContext;
    return {
        success: (options?: NotificationParamsTyped, appContext?: null | AppContext) => {
            return ElNotification.success(getOptions(options, def), appContext ?? ctx);
        },
        warning: (options?: NotificationParamsTyped, appContext?: null | AppContext) => {
            return ElNotification.warning(getOptions(options, def), appContext ?? ctx);
        },
        info: (options?: NotificationParamsTyped, appContext?: null | AppContext) => {
            return ElNotification.info(getOptions(options, def), appContext ?? ctx);
        },
        error: (options?: NotificationParamsTyped, appContext?: null | AppContext) => {
            return ElNotification.error(getOptions(options, def), appContext ?? ctx);
        },
        closeAll: () => ElNotification.closeAll(),
    };
}