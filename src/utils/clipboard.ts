import Clipboard from "clipboard";
import type { Event } from "clipboard";

export function copy(text: string, node: HTMLElement = document.createElement("button")) {
    return new Promise<Event>((resolve, reject) => {
        node.style.display = "none";
        const clipboard = new Clipboard(node, {
            text: () => text,
            action: () => "copy",
        });

        clipboard.on("success", function(e) {
            clipboard.destroy();
            e.clearSelection();
            resolve(e);
        });

        clipboard.on("error", function(e) {
            clipboard.destroy();
            reject(e);
        });
        document.body.appendChild(node);
        node?.click?.();
        document.body.removeChild(node);
    });
}
