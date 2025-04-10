import { withInstall } from "@/utils/withInstall";
import { makeInstaller } from "element-plus";
import BaseComponents from "element-plus/es/component";
import Plugin from "element-plus/es/plugin";
import ElButton from "./components/ElButton";
import ElLink from "./components/ElLink";
import ElList from "./components/List";
import ElCardV2 from "./components/CardV2";
import ElThing from "./components/Thing";

const Exclude: Record<`El${string}`, Component> = {
    ElButton,
    ElLink,
};

const Components = BaseComponents.filter(comp => !Object.keys(Exclude).includes((comp as any).name));

const ExtraComponents = withInstall(app => {
    // rewrite
    for(const name in Exclude) {
        app.component(name, Exclude[name as keyof typeof Exclude]);
    }
    // custom
    app.use(ElList);
    app.use(ElThing);
    app.use(ElCardV2);
});

export default makeInstaller([...Components, ExtraComponents, ...Plugin]);