export type Direction = "top" | "right" | "bottom" | "left";

export type NumFlag = "0" | "1";

export interface LoginInfo {
    username: string;
    password: string;
    code: string;
    uuid: string;
}

export interface CodeInfo {
    uuid: string;
    image: string;
}

export interface UploadAvatar {
    fileName: string;
    size: number;
    lastModified: string;
    path: string;
}