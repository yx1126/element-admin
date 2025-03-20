export {};

declare module "vue" {
    export interface ComponentCustomProperties {
        vCopy: typeof import("../src/directive/copy")["default"];
        vDrag: typeof import("../src/directive/drag")["default"];
    }

    export interface GlobalDirectives {
        vCopy: typeof import("../src/directive/copy")["default"];
        vDrag: typeof import("../src/directive/drag")["default"];
    }

    export interface GlobalComponents {
        Icon: typeof import("../src/components/GlobalRegister/Icon/Icon.vue")["default"];
        ElList: typeof import("../src/components/GlobalRegister/List/List.vue")["default"];
        ElListItem: typeof import("../src/components/GlobalRegister/List/ListItem.vue")["default"];
        ElThing: typeof import("../src/components/GlobalRegister/Thing/Thing.vue")["default"];
    }
}