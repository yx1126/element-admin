import { Icon } from "@/components/GlobalRegister/Icon";
import type { RouteRecordRaw } from "vue-router";

export default defineComponent({
    name: "MenuItem",
    props: {
        routes: { type: Array as PropType<RouteRecordRaw[]>, required: true },
    },
    setup(props) {
        return () => {
            const { routes } = props;
            return routes.map((route, index) => {
                const menuItem = (
                    <>
                        {route?.meta?.icon ? <Icon icon={route.meta.icon} /> : null}
                        <span>{route?.meta?.title}</span>
                    </>
                );
                if(route.children && route.children?.length > 0) {
                    return (
                        <el-sub-menu index={route.path} key={index}>
                            {{
                                title: () => menuItem,
                                default: () => <menu-item routes={route.children} />,
                            }}
                        </el-sub-menu>
                    );
                }
                return <el-menu-item index={route.path} key={index}>{menuItem}</el-menu-item>;
            });
        };
    },
});