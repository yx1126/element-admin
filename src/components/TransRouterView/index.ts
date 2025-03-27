import type { InjectionKey } from "vue";
import TransRouterView from "./TransRouterView.vue";

export const TransContext = Symbol("trans-router-view") as InjectionKey<string>;

export default TransRouterView;