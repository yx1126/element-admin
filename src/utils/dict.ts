import { dictAllList } from "@/api/system/dictType";
import type { DictData } from "#/dict";

const dictRequestMap = new Map<string, Array<(data: DictData[]) => void>>();

const dictMap = new Map<string, DictData[]>();

export function dictRequest(dictType: string) {
    return new Promise<DictData[]>(async (resolve, reject) => {
        if(!dictRequestMap.has(dictType)) {
            dictRequestMap.set(dictType, []);
            try {
                const res = await dictAllList(dictType);
                const result = res.data;
                dictRequestMap.get(dictType)?.forEach(_resolve => _resolve(result));
                dictRequestMap.delete(dictType);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        } else {
            dictRequestMap.set(dictType, [...dictRequestMap?.get(dictType) || [], resolve]);
        }
    });
}

export async function getDictData(dictType?: string) {
    let result: DictData[] = [];
    if(!dictType) return result;
    if(dictMap.has(dictType)) {
        result = dictMap.get(dictType)!;
    } else {
        try {
            const res = await dictRequest(dictType);
            result = res;
            dictMap.set(dictType, res);
        } catch (error) {
            console.error(error);
        }
    }
    return result;
}