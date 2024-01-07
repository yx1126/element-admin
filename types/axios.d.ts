import "axios";


declare module "axios" {
    export function mergeConfig<T extends object>(target: T, source: T): T;
}