<script lang="tsx">
import Header from "../components/header/index.vue";
import Tags from "../components/Tags/index.vue";
import Menu from "../components/menu/index.vue";
import Logo from "../components/Logo.vue";
import Collapse from "../components/Collapse.vue";
import Breadcrumb from "../components/Breadcrumb.vue";
import { useIsHideAside } from "../components/menu/MenuItem";
import { Configs } from "@/config";

export default defineComponent((_, { slots }) => {
    const set = useSetStore();
    const menuTheme = computed(() => {
        const { navMode, inverted } = set;
        return navMode === "inverted" ? inverted ? "inverted" : "light" : undefined;
    });
    const { isHidden } = useIsHideAside();
    return () => {
        const { headerHeight, tagsHeight, menuWidth } = Configs;
        const { navMode, isKeepTags, isShowTabs, isShowLogo, isShowBreadcrumb, isCutMenu, inverted, collapsed, isMainFull } = set;
        const TagsVNode = (isShowTabs ? <el-header height={tagsHeight + "px"}><Tags /></el-header> : null);
        return (
            <el-container class="layout-container">
                <el-header v-show={!isMainFull} height={headerHeight + "px"}>
                    <Header theme={navMode}>
                        {isShowLogo ? <Logo indent={16} /> : null}
                        {
                            isCutMenu
                                ? (
                                    <Menu
                                        class="layout-header-menu"
                                        type="root"
                                        mode="horizontal"
                                        style={`--menu-width: ${isShowLogo ? 200 : 0}px`}
                                    />
                                )
                                : isShowBreadcrumb && !isCutMenu
                                    ? <Breadcrumb inverted={navMode === "inverted"} />
                                    : null
                        }
                    </Header>
                </el-header>
                <el-container class="layout-container-main">
                    <el-aside
                        v-show={!isMainFull}
                        class={
                            [
                                "layout-aside",
                                {
                                    "is-inverted": inverted && navMode === "inverted",
                                },
                            ]
                        }
                        style={{ "--el-aside-width": `${isHidden.value ? 0 : collapsed ? 64 : menuWidth}px` }}
                    >
                        <el-scrollbar class="layout-aside-scrollbar">
                            <Menu collapse={collapsed} theme={menuTheme.value} type={isCutMenu ? "children" : "default"} />
                        </el-scrollbar>
                        <Collapse inverted={inverted} collapsedWidth={64} width={menuWidth} border="top" />
                    </el-aside>
                    <el-container direction="vertical">
                        {isKeepTags ? TagsVNode : null}
                        <el-main>
                            <el-scrollbar>
                                {isKeepTags ? null : TagsVNode}
                                { renderSlot(slots, "default") }
                            </el-scrollbar>
                        </el-main>
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