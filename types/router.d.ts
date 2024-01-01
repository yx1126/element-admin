import "vue-router";

declare module "vue-router" {
    interface RouteMeta {
        readonly title: string;
        readonly icon?: string;
        readonly keepAlive?: boolean;
        readonly isLink?: boolean;
        readonly isIFrame?: boolean;
    }
}