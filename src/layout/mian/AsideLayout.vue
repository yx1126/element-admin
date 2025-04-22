<script lang="tsx">
import Header from "../components/header/index.vue";
import Tags from "../components/Tags/index.vue";
import Menu from "../components/menu/index.vue";
import Logo from "../components/Logo.vue";
import Collapse from "../components/Collapse.vue";
import Breadcrumb from "../components/Breadcrumb.vue";
import { Configs } from "@/config";
import type { NavTheme } from "#/stores";

export default defineComponent((_, { slots }) => {
    const set = useSetStore();
    const headerTheme = computed<NavTheme>(() => {
        const { navMode, inverted } = set;
        return navMode === "inverted" ? inverted ? "inverted" : "light" : navMode;
    });
    return () => {
        const {
            inverted,
            navMode,
            isKeepHeader,
            isKeepTags,
            isShowBreadcrumb,
            isShowTabs,
            isShowLogo,
            collapsed,
            isMainFull,
        } = set;
        const { headerHeight, tagsHeight, menuWidth } = Configs;
        const HeaderVNode = (
            <el-header v-show={!isMainFull} height={headerHeight + "px"}>
                <Header theme={headerTheme.value}>
                    <Collapse
                        inverted={inverted}
                        width={headerHeight}
                        height={headerHeight}
                        collapsedWidth={headerHeight}
                    />
                    { isShowBreadcrumb ? <Breadcrumb inverted={inverted && navMode === "inverted"} /> : null }
                </Header>
            </el-header>
        );
        const TagsVNode = (isShowTabs ? <el-header height={tagsHeight + "px"}><Tags /></el-header> : null);
        return (
            <el-container class="layout-container">
                <el-aside v-show={!isMainFull} class="layout-aside">
                    {isShowLogo ? <Logo collapsed={collapsed} width={menuWidth} indent={16} /> : null}
                    <el-scrollbar class={{ "layout-aside-scrollbar": isShowLogo }}>
                        <Menu collapse={collapsed} />
                    </el-scrollbar>
                </el-aside>
                <el-container direction="vertical">
                    {isKeepHeader ? HeaderVNode : null}
                    {isKeepTags ? TagsVNode : null}
                    <el-main class="layout-main">
                        <el-scrollbar class="layout-scrollbar">
                            {isKeepHeader ? null : HeaderVNode}
                            {isKeepTags ? null : TagsVNode}
                            { renderSlot(slots, "default") }
                        </el-scrollbar>
                    </el-main>
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