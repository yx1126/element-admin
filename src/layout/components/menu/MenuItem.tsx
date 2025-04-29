import { Icon } from "@/components/GlobalRegister/Icon";
import type { MenuItem as MenuItemType } from "#/system";

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
        routes: { type: Array as PropType<MenuItemType[]>, required: true },
    },
    emits: ["menu-click"],
    setup(props, { emit }) {
        function onClick(path: string, item: MenuItemType) {
            emit("menu-click", path, item);
        }
        return () => {
            const { routes } = props;
            return routes.map((route, index) => {
                const icon = route?.icon ? <Icon icon={route.icon} size="16" /> : null;
                const title = (<span>{route.title}</span>);
                if(route.children && route.children?.length > 0) {
                    return (
                        <el-sub-menu index={route.path} key={index}>
                            {{
                                title: () => [icon, title],
                                default: () => <menu-item routes={route.children} onMenuClick={onClick} />,
                            }}
                        </el-sub-menu>
                    );
                }
                return (
                    <el-menu-item
                        index={route.path}
                        key={index}
                        onClick={() => onClick(route.path, route)}
                    >
                        {{
                            default: () => icon,
                            title: () => title,
                        }}
                    </el-menu-item>
                );
            });
        };
    },
});