import { withInstall } from "@/utils/withInstall";
import Icon, { ElIcon } from "./Icon";
import List from "./List";
import Thing from "./Thing";

export default withInstall(app => {
    app.use(Icon);
    app.use(ElIcon);
    app.use(List);
    app.use(Thing);
});