
export interface DebounceFn<T extends (...args: any) => any> {
    (...args: Parameters<T>): void;
    cancel(): void;
}

function debounce<T extends (...args: any) => any>(fn: T, delay: number = 0): DebounceFn<T> {
    let timer: any | null;
    function cancel() {
        if(timer) {
            clearTimeout(timer);
            timer = null;
        }
    }
    function callback(...args: any) {
        cancel();
        if(delay <= 0) {
            fn(...args);
        } else {
            timer = setTimeout(fn.bind(null, ...args), delay);
        }
    }
    callback.cancel = cancel;
    return callback;
}

export default debounce;