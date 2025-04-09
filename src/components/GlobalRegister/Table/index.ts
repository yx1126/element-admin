import { withInstall } from "@/utils/withInstall";
import type { InjectionKey, Slots } from "vue";

export * from "./table";

export type BaseTableType = typeof import("./Table.vue")["default"];

export const TableContext = Symbol() as InjectionKey<{ slots: Slots }>;

/**
 * @see https://www.naiveui.com/zh-CN/light/components/Thing
 */

export default withInstall(app => {
    app.component("BaseTable", defineAsyncComponent(() => import("./Table.vue")));
    app.component("TableAction", defineAsyncComponent(() => import("./TableAction.vue")));
});