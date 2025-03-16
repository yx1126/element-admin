<script lang="tsx">
import Header from "../components/header/index.vue";
import Tags from "../components/Tags/index.vue";
import Menu from "../components/menu/index.vue";
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
        const { headerHeight, tagsHeight } = LayoutConfig;
        const HeaderVNode = (
            <el-header height={headerHeight + "px"}>
                <Header theme={headerTheme.value}>
                    {
                        set.isShowBreadcrumb
                            ? <Breadcrumb class="ml-[10px]" inverted={set.inverted && set.navMode === "inverted"} />
                            : null
                    }
                </Header>
            </el-header>
        );
        const TagsVNode = (set.isShowTabs ? <el-header height={tagsHeight + "px"}><Tags /></el-header> : null);
        const slot = renderSlot(slots, "default");
        return (
            <el-container class="layout-container" style={`--layout-header-height:${headerHeight}px;`}>
                <el-aside class="layout-aside" width="80px"><Menu type="root" width="80" /></el-aside>
                <el-container class="layout-container" direction="vertical">
                    {HeaderVNode}
                    <el-container class="layout-container-main">
                        <el-aside width="160px"><Menu type="children" theme="light" width="160" /></el-aside>
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
            </el-container>
        );
    };
}, {
    name: "AsideMixinLayout",
});
</script>

<style lang="scss" scoped>
.layout {
    &-container {
        height: 100%;
        &-main {
            height: calc(100% - var(--layout-header-height));
        }
    }
    &-main {
        height: 100%;
    }
    &-aside {
        --el-aside-width: auto;
        background-color: var(--menu-bg-color);
        transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            background-color var(--el-transition-duration);
        overflow: hidden;
        // &-scrollbar {
        //     height: calc(100% - 50px);
        // }
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