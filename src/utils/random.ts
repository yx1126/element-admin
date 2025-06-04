// 生成随机id
export function getRandom() {
    if("crypto" in window) {
        return crypto?.randomUUID?.() || Math.random().toString(36).substring(2, 15);
    }
    return Math.random().toString(36).substring(2, 15);
}