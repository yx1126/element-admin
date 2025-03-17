<script lang="tsx">
import Header from "../components/header/index.vue";
import Tags from "../components/Tags/index.vue";
import Menu from "../components/menu/index.vue";
import Logo from "../components/Logo.vue";
import Breadcrumb from "../components/Breadcrumb.vue";
import Collapse from "../components/Collapse.vue";
import { LayoutConfig } from "@/config";
import { useIsHideAside } from "../components/menu/MenuItem";
import { Transition } from "vue";
import { parseIcon } from "@/utils/route";
import type { NavTheme } from "#/stores";
import type { RouteRecordRaw } from "vue-router";

export default defineComponent((_, { slots }) => {
    const set = useSetStore();
    const user = useUserStore();
    const route = useRoute();

    const hoverMenu = ref<Empty<RouteRecordRaw>>(null);

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
    }, {
        immediate: true,
    });

    function onMenuItemHover(_: RouteRecordRaw, i: number) {
        if(!set.isMenuFixed) return;
        hoverMenu.value = user.routerList[i];
    }

    function onMouseleave() {
        if(!set.isMenuFixed) return;
        hoverMenu.value = null;
    }

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
        const AsideChild = (
            <el-aside
                class={`layout-aside-child ${set.isMenuFixed ? "layout-aside-fixed" : ""}`}
                style={{ "--el-aside-width": asideWidth.value }}
            >
                <el-scrollbar class="layout-aside-child-scrollbar">
                    <Menu
                        collapse={set.isMenuFixed ? false : set.collapsed}
                        options={asideMenuList.value}
                        type="children"
                        theme={set.navMode === "dark" ? "dark" : "light"}
                        width="160"
                    />
                </el-scrollbar>
                <div class="layout-collapse">
                    { !set.isMenuFixed ? <Collapse mode="menu" width={160} collapsedWidth={64} border="top" /> : null }
                    <Transition name="fade-icon">
                        {!set.collapsed
                            ? (
                                <div class="icon box-center" onClick={() => set.isMenuFixed = !set.isMenuFixed}>
                                    <icon icon={set.isMenuFixed ? "unfix" : "fix"} />
                                </div>
                            )
                            : null}
                    </Transition>
                </div>
            </el-aside>
        );
        const TagsVNode = (set.isShowTabs ? <el-header height={tagsHeight + "px"}><Tags /></el-header> : null);
        const slot = renderSlot(slots, "default");
        return (
            <el-container class="layout-container" style={`--layout-header-height:${headerHeight}px;`}>
                <el-aside class="layout-aside" onMouseleave={onMouseleave}>
                    { set.isShowLogo ? <Logo collapsed showText={false} width="80" collapsedWidth={80} /> : null }
                    <el-scrollbar class={set.isShowLogo ? "layout-aside-scrollbar" : ""}>
                        <Menu class="layout-menu" type="root" width="80" onMenuItemHover={onMenuItemHover} />
                    </el-scrollbar>
                    { set.isMenuFixed ? AsideChild : null}
                </el-aside>
                <el-container class="layout-container" direction="vertical">
                    {HeaderVNode}
                    <el-container class="layout-container-main">
                        { !set.isMenuFixed ? AsideChild : null}
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
        @include border(right, var(--border-light-color)) {
            @include when-inverted {
                background-color: var(--border-inverted-color);
            }
            @include when-dark {
                background-color: var(--border-dark-color);
            }
        };
        &-scrollbar {
            height: calc(100% - 50px);
        }
        &-fixed {
            position: fixed !important;
            bottom: 0;
            left: 80px;
            height: calc(100vh - 50px);
            z-index: 1;
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
        };
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
                transition: all .25s ease;
            }
            &>span {
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