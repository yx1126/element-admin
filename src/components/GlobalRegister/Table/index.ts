import { withInstall } from "@/utils/withInstall";

export * from "./table";

export type BaseTableType = typeof import("./Table.vue")["default"];

/**
 * @see https://www.naiveui.com/zh-CN/light/components/Thing
 */

export default withInstall(app => {
    app.component("BaseTable", defineAsyncComponent(() => import("./Table.vue")));
    app.component("TableAction", defineAsyncComponent(() => import("./TableAction.vue")));
});