import { withInstall } from "@/utils/withInstall";
import Icon, { ElIcon } from "./Icon";
import List from "./List";
import Thing from "./Thing";

// 全局注册
export default withInstall(app => {
    app.use(Icon);
    app.use(ElIcon);
    app.use(List);
    app.use(Thing);
});