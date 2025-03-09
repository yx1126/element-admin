import { withInstall } from "@/utils/withInstall";
import List from "./List.vue";
import ListItem from "./ListItem.vue";

export interface ElListContextType {
    bordered?: boolean;
    hoverable?: boolean;
    clickable?: boolean;
    showDivider?: boolean;
}

export const ElListContext = Symbol() as InjectionKey<ElListContextType>;

export {
    List,
    ListItem,
};

export default withInstall([List, ListItem]);