import { isFn } from "@/utils/validata";
import i18n from "@/locales";
import type { FormItemRule } from "element-plus";

export type Triggers = "blur" | "change";

function Required(message: string, trigger?: Triggers, options?: FormItemRule): FormItemRule;
function Required(validator: FormItemRule["validator"], trigger?: Triggers, options?: FormItemRule): FormItemRule;
function Required(message: string | FormItemRule["asyncValidator"] | FormItemRule["validator"], trigger: Triggers = "blur", options?: FormItemRule): FormItemRule {
    const value: FormItemRule = {
        ...options,
        required: true,
        trigger,
    };
    if(isFn(message)) {
        value.validator = message as any;
    } else {
        value.message = i18n.global.t(trigger === "blur" ? "input" : "select", [message]);
    }
    return value;
}

function Validator(validator: FormItemRule["validator"], trigger: Triggers = "blur", options?: FormItemRule): FormItemRule {
    return {
        ...options,
        validator,
        trigger,
    };
}

export {
    Required,
    Validator,
};