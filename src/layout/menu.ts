const menus: any[] = [];

export function getMenus() {
    return new Promise<any[]>((resolve) => {
        resolve(menus);
    });
}