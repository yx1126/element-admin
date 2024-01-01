import type { App, Plugin, DefineComponent } from "vue";

function toInstall<T extends DefineComponent>(app: App, comps: Array<T>) {
    for(const comp of comps) {
        if(import.meta.env.MODE === "development" && !comp.name) {
            throw new Error("The component name cannot be empty");
        }
        app.component(comp.name, comp);
    }
}

export function withInstall<T>(main: T[]): Plugin;
export function withInstall(main: (app: App) => void): Plugin;
export function withInstall<T>(main: T): T & Plugin;
export function withInstall(main: unknown) {
    if(Array.isArray(main)) {
        return {
            install: (app: App) => {
                toInstall(app, main);
            },
        };
    }
    if(typeof main === "function") {
        return {
            install: main,
        };
    }
    (main as DefineComponent).install = function(app: App) {
        toInstall(app, [main as DefineComponent]);
    };
    return main;
}