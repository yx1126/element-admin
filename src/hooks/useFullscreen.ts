import { isStr } from "@/utils/validata";
import Screenfull from "screenfull";
import type { MaybeRef } from "vue";

export function useFullscreen<Element>(el?: MaybeRef<Noable<Element | string>>, options?: FullscreenOptions) {
    const message = useMessage();

    const isEnabled = Screenfull.isEnabled;

    const isFullScreen = ref(Screenfull.isFullscreen);

    const target = computed<HTMLElement>(() => {
        const element = unref(el);
        if(isStr(element)) return document.querySelector(element) || document.body;
        return element as HTMLElement || document.body;
    });

    onBeforeMount(() => {
        Screenfull.on("change", onFullScreenChange);
        Screenfull.on("error", onError);
    });

    onBeforeUnmount(() => {
        Screenfull.off("change", onFullScreenChange);
        Screenfull.off("error", onError);
    });

    function isSupport() {
        if(!Screenfull.isEnabled) {
            message.warn("您的浏览器不支持全屏！");
        }
        return isEnabled;
    }

    function onFull() {
        if(!isSupport()) return;
        Screenfull.request(target.value ? target.value : void 0, options);
    }

    function onExit() {
        if(!isSupport()) return;
        Screenfull.exit();
    }

    function onToggle() {
        if(!isSupport()) return;
        Screenfull.toggle(target.value ? target.value : void 0, options);
    }

    function onFullScreenChange() {
        isFullScreen.value = Screenfull.isFullscreen;
    }

    function onError(event: Event) {
        console.error(event);
    }

    return {
        isEnabled,
        isFullScreen: readonly(isFullScreen),
        onFull,
        onExit,
        onToggle,
    };
}