import "vue-router";
import type { RouteMeta as BaseRouteMeta } from "./system";

declare module "vue-router" {
    interface RouteMeta extends BaseRouteMeta {
        readonly title?: string;
    }
}