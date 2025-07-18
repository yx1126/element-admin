<script lang="tsx">
import Header from "../components/header/index.vue";
import Tags from "../components/Tags/index.vue";
import Menu from "../components/menu/index.vue";
import Logo from "../components/Logo.vue";
import Breadcrumb from "../components/Breadcrumb.vue";
import Collapse from "../components/Collapse.vue";
import { useIsHideAside } from "../components/menu/MenuItem";
import { Configs } from "@/config";
import { useZIndex } from "element-plus";
import { Transition } from "vue";
import { parseIcon } from "@/utils/route";
import type { NavTheme } from "#/stores";
import type { MenuItem } from "#/system";

export default defineComponent((_, { slots }) => {
    const set = useSetStore();
    const user = useUserStore();
    const route = useRoute();
    const { currentZIndex } = useZIndex();

    const hoverMenu = ref<Empty<MenuItem>>(null);

    const headerTheme = computed<NavTheme>(() => {
        const { navMode, inverted } = set;
        return navMode === "inverted" ? inverted ? "inverted" : "light" : navMode;
    });
    const { isHidden } = useIsHideAside();
    const asideWidth = computed(() => {
        if(set.isMenuFixed) {
            return !hoverMenu.value || !hoverMenu.value?.children?.length ? "0px" : "160px";
        }
        return `${isHidden.value ? 0 : set.collapsed ? 64 : 160}px`;
    });
    const asideMenuList = computed(() => {
        if(!set.isMenuFixed) return;
        return parseIcon(hoverMenu.value?.children, hoverMenu.value);
    });

    watch(() => set.isMenuFixed, val => {
        hoverMenu.value = val ? user.routerList.find(r => r.path === route.matched[1].path) : null;
    });

    function onMenuItemHover(_: MenuItem, i: number) {
        if(!set.isMenuFixed) return;
        hoverMenu.value = user.routerList[i];
    }

    function onMouseleave() {
        if(!set.isMenuFixed) return;
        hoverMenu.value = null;
    }

    return () => {
        const { headerHeight, tagsHeight } = Configs;
        const { navMode, collapsed, inverted, isShowTabs, isShowLogo, isKeepTags, isShowBreadcrumb, isMenuFixed, isMainFull } = set;
        const FixedIcon = (
            <div class="icon box-center" onClick={() => set.isMenuFixed = !set.isMenuFixed}>
                <icon icon={isMenuFixed ? "unfix" : "fix"} />
            </div>
        );
        const AsideChild = (
            <el-aside
                v-show={!isMainFull}
                class={`layout-aside-child ${isMenuFixed ? "layout-aside-fixed" : ""}`}
                style={{
                    "--el-aside-width": asideWidth.value,
                    "--el-aside-zIndex": isMenuFixed ? currentZIndex.value : 1,
                }}
            >
                <el-scrollbar class="layout-aside-child-scrollbar">
                    <Menu
                        collapse={isMenuFixed ? false : collapsed}
                        options={asideMenuList.value}
                        type="children"
                        theme={navMode === "dark" ? "dark" : "light"}
                        width="160"
                    />
                </el-scrollbar>
                <div class="layout-collapse">
                    { !isMenuFixed ? <Collapse mode="menu" width={160} collapsedWidth={64} border="top" /> : null }
                    <Transition name="fade-icon">
                        {isMenuFixed ? FixedIcon : !collapsed ? FixedIcon : null}
                    </Transition>
                </div>
            </el-aside>
        );
        const TagsVNode = (isShowTabs ? <el-header height={tagsHeight + "px"}><Tags /></el-header> : null);
        return (
            <el-container class="layout-container" style={`--layout-header-height:${headerHeight}px;`}>
                <el-aside v-show={!isMainFull} class="layout-aside" onMouseleave={onMouseleave}>
                    { isShowLogo ? <Logo collapsed showText={false} width="80" collapsedWidth={80} /> : null }
                    <el-scrollbar class={isShowLogo ? "layout-aside-scrollbar" : ""}>
                        <Menu class="layout-menu" type="root" width="80" onMenuItemHover={onMenuItemHover} />
                    </el-scrollbar>
                    { isMenuFixed ? AsideChild : null}
                </el-aside>
                <el-container class="layout-container" direction="vertical">
                    <el-header v-show={!isMainFull} height={headerHeight + "px"}>
                        <Header theme={headerTheme.value}>
                            { isShowBreadcrumb ? <Breadcrumb class="ml-[10px]" inverted={inverted && navMode === "inverted"} /> : null }
                        </Header>
                    </el-header>
                    <el-container class="layout-container-main">
                        { !isMenuFixed ? AsideChild : null}
                        <el-container direction="vertical">
                            {isKeepTags ? TagsVNode : null}
                            <el-main class="layout-main">
                                <el-scrollbar class="layout-scrollbar">
                                    {isKeepTags ? null : TagsVNode}
                                    { renderSlot(slots, "default") }
                                </el-scrollbar>
                            </el-main>
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
        transition:
            width 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            background-color var(--el-transition-duration);
        @include border(right, var(--border-light-color)) {
            @include when-inverted {
                background-color: var(--menu-bg-base-color);
            }
            @include when-dark {
                background-color: var(--border-dark-color);
            }
        }
        &-scrollbar {
            height: calc(100% - 50px);
        }
        &-fixed {
            position: fixed !important;
            bottom: 0;
            left: 80px;
            height: calc(100vh - 50px);
            z-index: var(--el-aside-zIndex);
        }
    }
    &-aside-child {
        transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
        background-color: #fff;
        @include when-dark {
            background-color: var(--menu-bg-color);
        }
        @include border(right, var(--border-light-color)) {
            @include when-dark {
                background-color: var(--border-dark-color);
            }
        }
        &-scrollbar {
            height: calc(100% - 42px);
        }
    }
    &-menu {
        :deep(.el-menu-item) {
            margin: 4px 8px;
            padding: 9px 5px !important;
            flex-direction: column;
            height: auto;
            line-height: normal;
            gap: 8px;
            border-radius: 6px;
            .el-icon {
                font-size: 20px !important;
                margin: 0;
                transition: all 0.25s ease;
            }
            & > span {
                font-size: 12px;
            }
            &:hover .el-icon {
                transform: scale(1.2);
            }
        }
    }
    &-collapse {
        position: relative;
        height: 42px;
        .icon {
            cursor: pointer;
            position: absolute;
            top: 50%;
            right: 10px;
            padding: 3px;
            border-radius: 3px;
            transform: translateY(-50%);
            transition: background-color var(--el-transition-duration);
            &:hover {
                background-color: var(--item-hover-bg-color);
                @include when-dark {
                    background-color: var(--item-hover-bg-dark-color);
                }
            }
        }
    }
}

.fade-icon {
    @at-root {
        &-leave-active,
        &-enter-active {
            transition: all 0.2s;
        }
        &-enter-from,
        &-leave-to {
            opacity: 0;
        }
    }
}
</style>