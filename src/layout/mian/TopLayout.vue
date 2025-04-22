<script lang="tsx">
import Header from "../components/header/index.vue";
import Tags from "../components/Tags/index.vue";
import Menu from "../components/menu/index.vue";
import Logo from "../components/Logo.vue";
import { Configs } from "@/config";

export default defineComponent((_, { slots }) => {
    const set = useSetStore();
    return () => {
        const { headerHeight, tagsHeight } = Configs;
        const { navMode, isKeepHeader, isKeepTags, isShowTabs, isShowLogo, isMainFull } = set;
        const HeaderVNode = (
            <el-header v-show={!isMainFull} height={headerHeight + "px"}>
                <Header theme={navMode}>
                    {isShowLogo ? <Logo minWidth="200" /> : null}
                    <Menu class="layout-menu" style={{ "--menu-width": isShowLogo ? "200px" : "0px" }} mode="horizontal" />
                </Header>
            </el-header>
        );
        const TagsVNode = (isShowTabs ? <el-header height={tagsHeight + "px"}><Tags /></el-header> : null);
        return (
            <el-container class="layout-container" direction="vertical">
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