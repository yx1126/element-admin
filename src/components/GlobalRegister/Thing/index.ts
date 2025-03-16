import { withInstall } from "@/utils/withInstall";

export default withInstall(app => {
    app.component("ElThing", defineAsyncComponent(() => import("./Thing.vue")));
});