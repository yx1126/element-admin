<script lang="tsx">
import Header from "../components/header/index.vue";
import Tags from "../components/Tags/index.vue";
import Menu from "../components/menu/index.vue";
import Logo from "../components/Logo.vue";
import Collapse from "../components/Collapse.vue";
import Breadcrumb from "../components/Breadcrumb.vue";
import { LayoutConfig } from "@/config";
import type { NavTheme } from "#/stores";

export default defineComponent((_, { slots }) => {
    const set = useSetStore();
    const headerTheme = computed<NavTheme>(() => {
        const { navMode, inverted } = set;
        return navMode === "inverted" ? inverted ? "inverted" : "light" : navMode;
    });
    return () => {
        const { headerHeight, tagsHeight, menuWidth } = LayoutConfig;
        const HeaderVNode = (
            <el-header height={headerHeight + "px"}>
                <Header theme={headerTheme.value}>
                    <Collapse
                        inverted={set.inverted}
                        width={headerHeight}
                        height={headerHeight}
                        collapsedWidth={headerHeight}
                    />
                    { set.isShowBreadcrumb ? <Breadcrumb inverted={set.inverted && set.navMode === "inverted"} /> : null }
                </Header>
            </el-header>
        );
        const TagsVNode = (set.isShowTabs ? <el-header height={tagsHeight + "px"}><Tags /></el-header> : null);
        const slot = renderSlot(slots, "default");
        return (
            <el-container class="layout-container">
                <el-aside class="layout-aside">
                    {set.isShowLogo ? <Logo collapsed={set.collapsed} width={menuWidth} indent={16} /> : null}
                    <el-scrollbar class={{ "layout-aside-scrollbar": set.isShowLogo }}>
                        <Menu collapse={set.collapsed} />
                    </el-scrollbar>
                </el-aside>
                <el-container direction="vertical">
                    {
                        !set.isKeepHeader && !set.isKeepTags
                            ? (
                                <el-scrollbar>
                                    {HeaderVNode}
                                    {TagsVNode}
                                    <el-main>{ slot }</el-main>
                                </el-scrollbar>
                            )
                            : (
                                <>
                                    {set.isKeepHeader ? HeaderVNode : null}
                                    {set.isKeepTags ? TagsVNode : null}
                                    <el-main>
                                        <el-scrollbar>
                                            {set.isKeepHeader ? null : HeaderVNode}
                                            {set.isKeepTags ? null : TagsVNode}
                                            { slot }
                                        </el-scrollbar>
                                    </el-main>
                                </>
                            )
                    }
                </el-container>
            </el-container>
        );
    };
}, {
    name: "AsideLayout",
});
</script>

<style lang="scss" scoped>
.layout {
    &-container {
        height: 100%;
    }
    &-aside {
        --el-aside-width: auto;
        background-color: var(--menu-bg-color);
        transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            background-color var(--el-transition-duration);
        overflow: hidden;
        &-scrollbar {
            height: calc(100% - 50px);
        }
        @include border(right, var(--border-light-color)) {
            @include when-inverted {
                background-color: var(--border-inverted-color);
            }
            @include when-dark {
                background-color: var(--border-dark-color);
            }
        };
    }
}
</style>