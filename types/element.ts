export interface SelectOption {
    label?: string | number;
    value: string | number | boolean | Record<string, any>;
    disabled?: boolean;
    [key: string]: any;
}