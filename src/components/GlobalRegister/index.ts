import { withInstall } from "@/utils/withInstall";
import Icon, { ElIcon } from "./Icon";
import List from "./List";
import Thing from "./Thing";
import CardV2 from "./CardV2";
import TableLayout from "./TableLayout";
import BaseTable from "./Table";

/**
 * 全局注册
 * 类型文件 types/vue.ts
 */
export default withInstall(app => {
    app.use(Icon);
    app.use(ElIcon);
    app.use(List);
    app.use(Thing);
    app.use(CardV2);
    app.use(TableLayout);
    app.use(BaseTable);
});