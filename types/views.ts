export type Direction = "top" | "right" | "bottom" | "left";

export type NumFlag = "0" | "1";

export interface LoginInfo {
    username: string;
    password: string;
    code: string;
    uuid: string;
}