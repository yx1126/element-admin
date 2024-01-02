export default function useResizeObserver(el: Element, fn: () => void, options?: ResizeObserverOptions): () => void {
    if(!window.ResizeObserver) return (() => void 0);
    const resizeObserver = new ResizeObserver(fn);
    resizeObserver.observe(el, options);
    return () => {
        resizeObserver.unobserve(el);
        resizeObserver.disconnect();
    };
}
