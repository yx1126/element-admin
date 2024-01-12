export {};

declare global {

    export type Noop = () => void;

    export type ObjKeys<T> = keyof T;

    export type Nullable<T> = T | null;

    export type Noable<T> = T | undefined;

    export type Empty<T> = Nullable<Noable<T>>;

    export type Arrayable<T> = T extends Array<infer A> ? A[] : T[];

    export type Writable<T> = {
        -readonly [P in keyof T]: T[P];
    };

    export type DeepPartial<T> = {
        [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
    };

    export type DeepReadonly<T> = {
        readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
    };

    export type DeepWritable<T> = {
        -readonly [P in keyof T]: T[P] extends object ? DeepWritable<T[P]> : T[P];
    };
}