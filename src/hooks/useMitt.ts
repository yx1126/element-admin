import mitt from "mitt";

type EventType = {
    "*": any;
    toggleSetting: [];
};

const emitter = mitt<EventType>();

type EventFunc<T extends keyof EventType> = (...args: EventType[T]) => void;

export function useMitter() {
    return emitter;
}

export function useMitt<T extends keyof EventType>(key: T) {
    function on(fn: EventFunc<T>) {
        emitter.on(key, fn);
    }
    function emit(...args: EventType[T]) {
        emitter.emit.apply(null, [key].concat(args) as any);
    }
    function off(fn: EventFunc<T>) {
        emitter.off(key, fn);
    }
    function once(fn: EventFunc<T>) {
        function oncefn(...args: any) {
            fn(...args);
            emitter.off(key, oncefn);
        }
        emitter.on(key, oncefn);
    }
    return {
        on,
        off,
        emit,
        once,
    };
}

export default useMitt;