import { isArray, isFunction as isFn, isString } from "@/utils/validata";
import type { PiniaPlugin, PiniaPluginContext } from "pinia";
import type { WatchOptions } from "vue";

const assign = Object.assign;

type Store = PiniaPluginContext["store"];

type PartialState = Partial<Store["$state"]>;

export interface Subscriptions extends WatchOptions {
    detached?: boolean;
}

type BaseStorage = Pick<Storage, "getItem" | "setItem">;

type Paths<S> = Array<ObjKeys<S>> | ((s: Array<ObjKeys<S>>) => Array<ObjKeys<S>>);

interface StorageOptions<S> {
    key?: string;
    paths: Paths<S>;
    storage: BaseStorage;
}

type StorageOption<S> = BaseStorage | StorageOptions<S>[];

interface StoreOption<S> {
    enabled?: boolean;
    key?: string;
    paths?: Paths<S>;
    storage?: StorageOption<S>;
    reset?: () => S;
}

export interface PiniaStateOptions {
    prefix?: string;
    suffix?: string;
    storage?: BaseStorage;
    subscriptions?: Subscriptions;
}

function createPiniaState(options?: PiniaStateOptions): PiniaPlugin {
    const prefix = options?.prefix ?? "vue-pinia-";
    const suffix = options?.suffix ?? "";
    const storage = options?.storage || window.localStorage;

    const createKey = (key: string) => prefix + key + suffix;

    function getItem(key: string, storage: BaseStorage) {
        const value = storage.getItem(createKey(key));
        return value ? JSON.parse(value) : {};
    }
    function setItem(key: string, value: any, storage: BaseStorage) {
        storage.setItem(createKey(key), isString(value) ? value : JSON.stringify(value));
    }

    return (context: PiniaPluginContext) => {
        const persistedstate = context.options.persistedstate;
        if(!persistedstate?.enabled) return;

        if(isFn(persistedstate.reset)) {
            context.store.$reset = function() {
                context.store.$patch(persistedstate.reset!());
            };
        }
        context.store.setState = function(key, value) {
            context.store.$patch((state) => {
                state[key] = value;
            });
        };

        const store = context.store;

        function createStateList(state: Store["$state"]) {
            return isArray<StorageOptions<Store["$state"]>[]>(persistedstate?.storage)
                ? persistedstate.storage || []
                : [{ storage: persistedstate?.storage || storage, paths: persistedstate?.paths || Object.keys(state) }];
        }

        store.$subscribe((mutation, state) => {
            createStateList(state).forEach(s => {
                const pathsList = isFn(s.paths) ? s.paths(Object.keys(state)) : s.paths;
                const value = pathsList.reduce((baseState, cur) => {
                    baseState[cur] = state[cur];
                    return baseState;
                }, {} as PartialState);
                setItem(s.key || persistedstate.key || mutation.storeId, value, s.storage);
            });
        }, assign({ detached: true }, options?.subscriptions));

        return createStateList(store.$state).reduce((state, s) => {
            const value = getItem(s.key || persistedstate.key || store.$id, s.storage);
            if(value) state = assign(state, value);
            return state;
        }, {} as PartialState);
    };
}

export { createPiniaState as default };


declare module "pinia" {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    export interface DefineStoreOptionsBase<S, Store> {
        persistedstate?: StoreOption<S>;
    }


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    export interface PiniaCustomProperties<Id extends string = string, S extends StateTree = StateTree> {
        setState: <K extends ObjKeys<S>>(key: K, value: S[K]) => void;
    }
}
