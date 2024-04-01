import { withInstall } from "@/utils/withInstall";
import drag from "./drag";

export default withInstall((app) => {
    app.directive("drag", drag);
});