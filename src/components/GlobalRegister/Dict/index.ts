import { withInstall } from "@/utils/withInstall";

export default withInstall(app => {
    app.component("DictLabel", defineAsyncComponent(() => import("./DictLabel.vue")));
});