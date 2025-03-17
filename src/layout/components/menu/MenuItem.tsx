import { Icon } from "@/components/GlobalRegister/Icon";
import type { RouteRecordRaw } from "vue-router";

export function useIsHideAside() {
    const route = useRoute();
    const set = useSetStore();
    const tags = useTagStore();
    const user = useUserStore();

    const isHidden = computed(() => {
        // 刷星页面判断上个页面子菜单数量
        if(route.fullPath.startsWith("/redirect") && tags.oldRoute) {
            const parentPath = "/" + tags.oldRoute.split("/").at(1);
            const parent = user.routerList.find(v => v.path === parentPath);
            return (set.isCutMenu && (parent?.children?.length || 0) <= 0);
        }
        return (set.isCutMenu && route.matched[1]?.children?.length <= 0);
    });

    return {
        isHidden,
    };
}

export default defineComponent({
    name: "MenuItem",
    props: {
        routes: { type: Array as PropType<RouteRecordRaw[]>, required: true },
    },
    setup(props) {
        return () => {
            const { routes } = props;
            return routes.map((route, index) => {
                const title = route?.meta?.title;
                const menuItem = (
                    <>
                        {route?.meta?.icon ? <Icon icon={route.meta.icon} size="16" /> : null}
                        <span title={title}>{title}</span>
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