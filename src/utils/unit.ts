import { isNum, isStr } from "./validata";

export function parseUnit(val: Empty<string | number>, defaultValue = "") {
    if(isNum(val) || (isStr(val) && /^\d+$/.test(val))) {
        return val + "px";
    }
    return val || defaultValue;
}