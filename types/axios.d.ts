import "axios";

export interface ListData<T = any> {
    readonly page: number;
    readonly size: number;
    readonly data: T;
    readonly total: number;
}

export interface ResponseResult<T = any> {
    readonly code: number;
    readonly data: T;
    readonly message: number;
}

declare module "axios" {
    export function mergeConfig<T extends object>(target: T, source: T): T;
}