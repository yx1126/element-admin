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
        ElCardV2: typeof import("../src/components/GlobalRegister/CardV2/CardV2.vue")["default"];
        TableLayout: typeof import("../src/components/GlobalRegister/TableLayout/TableLayout.vue")["default"];
        BaseTable: typeof import("../src/components/GlobalRegister/Table/Table.vue")["default"];
        TableAction: typeof import("../src/components/GlobalRegister/Table/TableAction.vue")["default"];
    }
}