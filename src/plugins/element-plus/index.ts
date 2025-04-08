import { makeInstaller } from "element-plus";
import BaseComponents from "element-plus/es/component";
import Plugin from "element-plus/es/plugin";
import ElButton from "./components/ElButton";
import ElLink from "./components/ElLink";
import { withInstall } from "@/utils/withInstall";

const exclude = ["ElButton", "ElLink"];

const Components = BaseComponents.filter(comp => !exclude.includes((comp as any).name));

const CustomComponents = [
    ElButton,
    ElLink,
].map(c => withInstall(c));

export default makeInstaller([...Components, ...CustomComponents, ...Plugin]);