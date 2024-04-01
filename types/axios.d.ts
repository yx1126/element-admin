import "axios";

export interface PageInfo<T = any> {
    readonly page: number;
    readonly size: number;
    readonly data: T;
    readonly total: number;
}

export interface Result<T = any> {
    readonly code: number;
    readonly data: T;
    readonly message: string;
}

export interface TableResult<T = any> {
    readonly code: number;
    readonly data: PageInfo<T>;
    readonly message: string;
}

declare module "axios" {
    export function mergeConfig<T extends object>(target: T, source: T): T;
}