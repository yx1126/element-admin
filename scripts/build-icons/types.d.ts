import type { Config } from "svgo";

export interface PathOptions {
    path: string;
    id?: string;
}

export interface SVGLoadOptions {
    paths: string[] | PathOptions[];
    svgoOptions?: Config;
    type?: "html" | "script";
    symbolId?: string;
    SVG_DOM_ID?: string;
}

export interface SVGItem {
    name: string;
    path: string;
    svg: string;
    symbol: string;
    symbolId: string;
    dirs: string[];
}

export interface SymbolIdOptions {
    dirs: string[];
    name: string;
    fileId: string;
    symbolId: string;
}