export {};

declare module "vue" {
    export interface ComponentCustomProperties {
        VCopy: typeof import("../src/directive/copy")["default"];
        VCopy: typeof import("../src/directive/drag")["default"];
        VAuth: typeof import("../src/directive/auth")["default"];
        $auth: typeof import("../src/utils/permission")["auth"];
    }

    export interface GlobalDirectives {
        VCopy: typeof import("../src/directive/copy")["default"];
        VDrag: typeof import("../src/directive/drag")["default"];
        VAuth: typeof import("../src/directive/auth")["default"];
    }

    export interface GlobalComponents {
        // element-plus extra components
        ElList: typeof import("../src/plugins/element-plus/components/List/List.vue")["default"];
        ElListItem: typeof import("../src/plugins/element-plus/components/List/ListItem.vue")["default"];
        ElThing: typeof import("../src/plugins/element-plus/components/Thing/Thing.vue")["default"];
        ElCardV2: typeof import("../src/plugins/element-plus/components/CardV2/CardV2.vue")["default"];
        // local global components
        Icon: typeof import("../src/components/GlobalRegister/Icon/Icon.vue")["default"];
        TableLayout: typeof import("../src/components/GlobalRegister/TableLayout/TableLayout.vue")["default"];
        BaseTable: typeof import("../src/components/GlobalRegister/Table/Table.vue")["default"];
        TableAction: typeof import("../src/components/GlobalRegister/Table/TableAction.vue")["default"];
        DictLabel: typeof import("../src/components/GlobalRegister/Dict/DictLabel.vue")["default"];
        Pagination: typeof import("element-plus")["ElPagination"];
    }
}