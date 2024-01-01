import * as Icons from "@element-plus/icons-vue";

/**
 * element-plus icon names
 */
export const EleIconNames = Object.keys(Icons).map(v => `Ele${v}`);

export default withInstall((app) => {
    for(const [key, component] of Object.entries(Icons)) {
        app.component(`Ele${key}`, component);
    }
});