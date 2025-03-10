import { isStr } from "./validata";

export interface DragOptions {
    container?: string | Element;
    axis?: "x" | "y" | "xy";
    eventType?: "left" | "right";
    moveOver?: boolean;
}

function drag(el: string | Element, options?: DragOptions) {
    const target = (isStr(el) ? document.querySelector(el) : el) as HTMLElement;
    if(!target) return;

    const { axis, container: conEl, eventType, moveOver }: DragOptions = Object.assign({}, options);

    const container = (isStr(conEl) ? document.querySelector(conEl) : conEl) as HTMLElement;

    const preventDefault = (e: MouseEvent) => e.preventDefault();

    function mousedown(downEvt: MouseEvent) {
        document.onselectstart = () => false;

        if(eventType === "right") {
            if(downEvt.button !== 2) return;
            document.addEventListener("contextmenu", preventDefault);
        }
        if((!eventType || eventType === "left") && downEvt.button !== 0) return;

        const transform = getComputedStyle(target).getPropertyValue("transform");
        const { m41: translateX, m42: translateY } = new DOMMatrixReadOnly(transform);
        const cRect = container?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
        const eRect = target.getBoundingClientRect();

        const box = {
            left: cRect.left - eRect.left,
            right: cRect.left - eRect.left + cRect.width - eRect.width,
            top: cRect.top - eRect.top,
            bottom: cRect.top - eRect.top + cRect.height - eRect.height,
        };

        function mousemove(e: MouseEvent) {
            const baseX = e.clientX - downEvt.clientX;
            const baseY = e.clientY - downEvt.clientY;

            const moveX = moveOver || !container ? baseX : baseX <= box.left ? box.left : baseX >= box.right ? box.right : baseX;
            const moveY = moveOver || !container ? baseY : baseY <= box.top ? box.top : baseY >= box.bottom ? box.bottom : baseY;

            const x = (!axis || ["xy", "x"].includes(axis) ? moveX : 0) + translateX;
            const y = (!axis || ["xy", "y"].includes(axis) ? moveY : 0) + translateY;

            target.style.transform = `translate(${x}px, ${y}px)`;
        }

        function mouseup() {
            document.onselectstart = null;
            document.removeEventListener("mouseup", mouseup);
            document.removeEventListener("mousemove", mousemove);
            if(eventType === "right") {
                setTimeout(() => {
                    document.removeEventListener("contextmenu", preventDefault);
                }, 100);
            }
        }
        document.addEventListener("mouseup", mouseup);
        document.addEventListener("mousemove", mousemove);

        return {
            stop: () => {
                target.removeEventListener("mousedown", mousedown);
            },
        };
    }
    target.addEventListener("mousedown", mousedown);
}

export default drag;