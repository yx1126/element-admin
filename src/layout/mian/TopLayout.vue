<script lang="tsx">
import Header from "../components/header/index.vue";
import Tags from "../components/Tags/index.vue";
import Menu from "../components/menu/index.vue";
import Logo from "../components/Logo.vue";
import { LayoutConfig } from "@/config";

export default defineComponent((_, { slots }) => {
    const set = useSetStore();
    return () => {
        const { headerHeight, tagsHeight } = LayoutConfig;
        const HeaderVNode = (
            <el-header height={headerHeight + "px"}>
                <Header theme={set.navMode}>
                    {set.isShowLogo ? <Logo minWidth="200" /> : null}
                    <Menu class="layout-menu" style={{ "--menu-width": set.isShowLogo ? "200px" : "0px" }} mode="horizontal" />
                </Header>
            </el-header>
        );
        const TagsVNode = (set.isShowTabs ? <el-header height={tagsHeight + "px"}><Tags /></el-header> : null);
        const slot = renderSlot(slots, "default");
        return (
            <el-container class="layout-container" direction="vertical">
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
        );
    };
}, { name: "TopLayout" });
</script>

<style lang="scss" scoped>
.layout {
    &-container {
        height: 100%;
    }
    &-menu {
        width: calc(100% - var(--menu-width));
        max-width: calc(100% - var(--menu-width));
    }
}
</style>