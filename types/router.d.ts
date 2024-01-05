import "vue-router";
import type { RouteMeta as BaseRouteMeta } from "./menu";

declare module "vue-router" {
    interface RouteMeta extends BaseRouteMeta {
        title?: string;
        keepAlive?: boolean;
    }
}