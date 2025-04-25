import Clipboard from "clipboard";
import { isFn, toString } from "@/utils/validata";
import type { Directive } from "vue";

type ClipboardEvent = (e: Clipboard.Event) => void;

interface CopyOptions {
    success?: ClipboardEvent;
    error?: ClipboardEvent;
    clipboard?: Clipboard;
}

interface HTMLNode extends Element {
    _v_clipboard_success?: ClipboardEvent;
    _v_clipboard_error?: ClipboardEvent;
    _v_clipboard?: Clipboard;
}

export default {
    mounted(el, binding) {
        if(binding.arg === "success" && isFn(binding.value)) {
            el._v_clipboard_success = binding.value;
            return;
        }
        if(binding.arg === "error" && isFn(binding.value)) {
            el._v_clipboard_error = binding.value;
            return;
        }
        const clipboard = new Clipboard(el, {
            text() {
                return toString(binding.value);
            },
            action() {
                return "copy";
            },
        });
        clipboard.on("success", e => {
            el._v_clipboard_success?.(e);
        });
        clipboard.on("error", e => {
            el._v_clipboard_error?.(e);
        });
        el._v_clipboard = clipboard;
    },
    updated(el, binding) {
        if(binding.arg === "success") {
            el._v_clipboard_success = binding.value;
            return;
        }
        if(binding.arg === "error") {
            el._v_clipboard_error = binding.value;
            return;
        }
    },
    unmounted(el, binding) {
        if(binding.arg === "success") {
            delete el._v_clipboard_success;
            return;
        }
        if(binding.arg === "error") {
            delete el._v_clipboard_error;
            return;
        }
        if(el._v_clipboard) {
            el._v_clipboard.destroy();
        }
    },
} satisfies Directive<HTMLNode, ClipboardEvent, "pointer", keyof CopyOptions>;