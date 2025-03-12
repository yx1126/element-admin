<script lang="tsx">
import Menu from "../components/menu/index.vue";
import Header from "../components/header/index.vue";
import Tags from "../components/Tags/index.vue";
import Logo from "../components/Logo.vue";

export default defineComponent((_, { slots }) => {
    const set = useSetStore();
    return () => {
        const HeaderVNode = (<el-header height="50px"><Header inverted={set.inverted} /></el-header>);
        const TagsVNode = (set.isShowTabs ? <el-header height="35px"><Tags /></el-header> : null);
        const slot = renderSlot(slots, "default");
        return (
            <el-container class="layout-container">
                <el-aside class="layout-aside" style="--el-aside-width: auto;">
                    <Logo collapsed={set.collapsed} collapsed-width={64} indent={16} />
                    <el-scrollbar class={{ "layout-aside-scrollbar": set.isShowLogo }}>
                        <Menu />
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
        background-color: var(--menu-bg-color);
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