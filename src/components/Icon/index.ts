import * as Icons from "@element-plus/icons-vue";
import { withInstall } from "@/utils/withInstall";
import Icon from "./Icon.vue";

export {
    Icon,
};

/**
 * element-plus icon names
 */
export const EleIconNames = Object.keys(Icons).map(v => `Ele${v}`);

export default withInstall((app) => {
    app.component(Icon.name, Icon);
    for(const [key, component] of Object.entries(Icons)) {
        app.component(`Ele${key}`, component);
    }
});