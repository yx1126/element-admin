<script lang="tsx">
import Header from "../components/header/index.vue";
import Tags from "../components/Tags/index.vue";
import Menu from "../components/menu/index.vue";
import Logo from "../components/Logo.vue";
import Collapse from "../components/Collapse.vue";
import Breadcrumb from "../components/Breadcrumb.vue";
import { useIsHideAside } from "../components/menu/MenuItem";
import { LayoutConfig } from "@/config";

export default defineComponent((_, { slots }) => {
    const set = useSetStore();
    const menuTheme = computed(() => {
        const { navMode, inverted } = set;
        return navMode === "inverted" ? inverted ? "inverted" : "light" : undefined;
    });
    const { isHidden } = useIsHideAside();
    return () => {
        const { headerHeight, tagsHeight, menuWidth } = LayoutConfig;
        const TagsVNode = (set.isShowTabs ? <el-header height={tagsHeight + "px"}><Tags /></el-header> : null);
        const slot = renderSlot(slots, "default");
        return (
            <el-container class="layout-container">
                <el-header height={headerHeight + "px"}>
                    <Header theme={set.navMode}>
                        {set.isShowLogo ? <Logo indent={16} /> : null}
                        {
                            set.isCutMenu
                                ? (
                                    <Menu
                                        class="layout-header-menu"
                                        type="root"
                                        mode="horizontal"
                                        style={`--menu-width: ${set.isShowLogo ? 200 : 0}px`}
                                    />
                                )
                                : set.isShowBreadcrumb && !set.isCutMenu
                                    ? <Breadcrumb inverted={set.navMode === "inverted"} />
                                    : null
                        }
                    </Header>
                </el-header>
                <el-container class="layout-container-main">
                    <el-aside
                        class={
                            [
                                "layout-aside",
                                {
                                    "is-inverted": set.inverted && set.navMode === "inverted",
                                },
                            ]
                        }
                        style={{ "--el-aside-width": `${isHidden.value ? 0 : set.collapsed ? 64 : menuWidth}px` }}
                    >
                        <el-scrollbar class="layout-aside-scrollbar">
                            <Menu collapse={set.collapsed} theme={menuTheme.value} type={set.isCutMenu ? "children" : "default"} />
                        </el-scrollbar>
                        <Collapse inverted={set.inverted} collapsedWidth={64} width={menuWidth} border="top" />
                    </el-aside>
                    <el-container direction="vertical">
                        {
                            set.isKeepTags
                                ? (
                                    <>
                                        {TagsVNode}
                                        <el-main>
                                            <el-scrollbar>{ slot }</el-scrollbar>
                                        </el-main>
                                    </>
                                )
                                : (
                                    <el-main>
                                        <el-scrollbar>
                                            {TagsVNode}
                                            { slot }
                                        </el-scrollbar>
                                    </el-main>
                                )
                        }
                    </el-container>
                </el-container>
            </el-container>
        );
    };
}, {
    name: "MixinLayout",
});
</script>

<style lang="scss" scoped>
.layout {
    &-container {
        height: 100%;
        &-main {
            height: calc(100% - 50px);
        }
    }
    &-header-menu {
        width: calc(100% - var(--menu-width));
    }
    &-aside {
        transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            background-color var(--el-transition-duration);
        overflow: hidden;
        @include when(inverted) {
            background-color: var(--menu-bg-color);
        }
        @include border(right, var(--border-light-color)) {
            @include when-dark {
                background-color: var(--border-dark-color);
            }
        };
        &-scrollbar {
            height: calc(100% - 42px);
        }
    }
}
</style>