import { Icon } from "@/components/Icon";
import { defineProp } from "@/utils/defineProp";
import type { RouteRecordRaw } from "vue-router";

export default defineComponent({
    name: "MenuItem",
    props: {
        routes: { type: defineProp<RouteRecordRaw[]>(Array), required: true },
    },
    setup(props) {
        return () => {
            const { routes } = props;
            return routes.map(route => {
                const menuItem = (
                    <>
                        {route?.meta?.icon ? <Icon icon={route.meta.icon} /> : null}
                        <span>{ route?.meta?.title }</span>
                    </>
                );
                if(route.children && route.children?.length > 0) {
                    return (
                        <el-sub-menu index={route.path}>
                            {{
                                title: () => menuItem,
                                default: () => <menu-item routes={route.children} />,
                            }}
                        </el-sub-menu>
                    );
                }
                return <el-menu-item index={route.path}>{menuItem}</el-menu-item>;
            });
        };
    },
});