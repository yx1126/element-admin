import type { FormInstance, FormRules } from "element-plus";
import type { Ref } from "vue";
import type { Result } from "#/axios";

const extend = Object.assign;

type FormFunctions = Pick<FormInstance, "resetFields" | "validate" | "validateField" | "clearValidate">;

const Methods: Array<keyof FormFunctions> = ["validate", "resetFields", "clearValidate", "validateField"] as const;

// transform undefined to any
type Form<T extends object> = {
    [P in keyof T]: T[P] extends undefined ? any : T[P];
};

export interface FormOptions<T extends object = any, D extends object = T> {
    request: {
        info?: (id: string) => Promise<Result<Form<T>>>;
        add?: (data: T) => Promise<Result>;
        edit?: (data: T) => Promise<Result>;
    };
    form: () => Partial<T>;
    formatter?: (data: D) => T;
    beforeRequest?: (data: T) => any;
    afterRequest?: (data: any) => void;
}

export interface FormCallback<T extends object = any, D extends object = any> extends FormFunctions {
    formRef: Ref<Nullable<FormInstance>>;
    form: Ref<Form<T>>;
    loading: Ref<boolean>;
    onSubmit: () => Promise<void>;
    queryInfo: (...args: Parameters<Required<FormOptions<T, D>["request"]>["info"]>) => Promise<void>;
    queryInfoByLocal: (data: T) => void;
}

export function defineFormRules(rules: FormRules) {
    return rules;
}

export function useFormRequest<T extends object, D extends object = any>(config: FormOptions<T, D>): FormCallback<T, D> {
    const { form: getForm, request, formatter, beforeRequest, afterRequest } = extend({}, config);

    const { add: addRequest, edit: editRequest, info: getInfo } = extend({}, request);

    const formRef = ref<Nullable<FormInstance>>(null);

    const dataForm = ref(getForm()) as Ref<T>;
    const loading = ref(false);

    async function queryInfo(...args: Parameters<Required<FormOptions<T, D>["request"]>["info"]>) {
        if(getInfo) {
            try {
                loading.value = true;
                const res = await getInfo(...args);
                const result: T = extend({}, res.data);
                dataForm.value = formatter ? formatter(result as any) : result;
            } finally {
                loading.value = false;
            }
        }
    }

    function queryInfoByLocal(data: T) {
        dataForm.value = formatter ? formatter(data as any) : data;
    }

    function onSubmit() {
        return new Promise<void>((resolve, reject) => {
            formRef.value?.validate(async (valid, errors) => {
                if(!valid) {
                    reject(errors);
                    return;
                }
                try {
                    loading.value = true;
                    const form = beforeRequest ? await beforeRequest(dataForm.value) : dataForm.value;
                    if(form.id || (form.id === 0)) {
                        if(editRequest) await editRequest(form);
                    } else {
                        if(addRequest) await addRequest(form);
                    }
                    afterRequest && afterRequest(form);
                    resolve(form);
                } catch (error: any) {
                    console.error(error);
                    reject(error);
                } finally {
                    loading.value = false;
                }
            });
        });
    }

    return {
        formRef,
        form: dataForm,
        loading,
        queryInfo,
        queryInfoByLocal,
        onSubmit,
        ...Methods.reduce<FormFunctions>((pre, method) => {
            pre[method] = ((...args: any) => {
                if(formRef.value && formRef.value[method]) {
                    if(method === "resetFields") {
                        dataForm.value = getForm() as Required<T>;
                    }
                    return formRef.value[method](...args);
                }
            }) as any;
            return pre;
        }, {} as FormFunctions),
    };
}
