import { isNumber, isString } from "./validata";

export function parseUnit(val: Empty<string | number>, defaultValue = "") {
    if(isNumber(val) || (isString(val) && /^\d+$/.test(val))) {
        return val + "px";
    }
    return val || defaultValue;
}