<script setup lang="ts">
import { SearchOutlined } from "@vicons/antd";
import type { MenuItem } from "#/menu";
import { isLink } from "@/utils/validata";

defineOptions({
    name: "SearchInput",
});

const user = useUserStore();
const router = useRouter();

const selectRef = useTemplateRef("selectRef");
const loading = ref(false);
const options = ref<MenuItem[]>([]);

const routeList = computed(() => formatMenuList(user.routerList));

function onRemoteMethod(query: string) {
    if(query) {
        loading.value = true;
        options.value = routeList.value.filter(item => {
            return item.title.includes(query) || item.path.includes(query);
        });
        loading.value = false;
    } else {
        options.value = [];
    }
}

function onChange(menu: MenuItem) {
    if(isLink(menu.link) && menu.isIframe === "0") {
        window.open(menu.link);
    } else {
        router.push(menu.path);
    }
    selectRef.value?.blur();
}

function formatMenuList(menus: MenuItem[], split = " -> ") {
    const result: MenuItem[] = [];
    function start(list: MenuItem[], parentList: MenuItem[] = []) {
        for(let i = 0; i < list.length; i++) {
            const item = list[i];
            if(!item.children || (item.children as MenuItem[])?.length <= 0) {
                result.push({ ...item, title: [...parentList, item].map(item => item.title).join(split) });
                continue;
            }
            start((item.children as MenuItem[]) || [], [...parentList, item]);
        }
    }
    start(menus);
    return result;
}
</script>

<template>
    <div class="search-wrapper">
        <el-select
            ref="selectRef"
            class="search-input"
            filterable
            remote
            reserve-keyword
            value-key="path"
            :placeholder="$t('input')"
            :loading="loading"
            :remote-method="onRemoteMethod"
            @change="onChange"
        >
            <template #prefix>
                <Icon size="20"><search-outlined /></Icon>
            </template>
            <el-option v-for="item in options" :key="item.path" :value="item" :label="item.title" />
        </el-select>
    </div>
</template>

<style lang="scss" scoped>
.search {
    &-input {
        :deep(.el-select__wrapper) {
            padding-left: 0;
            padding-right: 0;
            border-radius: 0;
            box-shadow: none;
            border-bottom: 1px solid transparent;
            background-color: transparent;
            .el-select{
                &__prefix {
                    cursor: pointer;
                }
                &__selection {
                    width: 0;
                    transition: width 0.2s cubic-bezier(.4, 0, .2, 1);
                }
            }
            @include when(focused) {
                border-bottom-color: var(--el-color-primary);
                .el-select__selection {
                    width: 200px;
                }
            }
            .el-select__caret {
                font-size: 20px;
                transform: rotateZ(0deg) !important;
            }
        }
    }
}
</style>