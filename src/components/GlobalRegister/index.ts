import { withInstall } from "@/utils/withInstall";
import Icon, { ElIcon } from "./Icon";
import TableLayout from "./TableLayout";
import BaseTable from "./Table";
import Dict from "./Dict";

/**
 * 全局注册
 * 类型文件 types/vue.ts
 */
export default withInstall(app => {
    app.use(Icon);
    app.use(ElIcon);
    app.use(TableLayout);
    app.use(BaseTable);
    app.use(Dict);
});