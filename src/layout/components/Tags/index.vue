<script setup lang="ts">
import {
    MoreOutlined,
    ReloadOutlined,
} from "@vicons/antd";
import router from "@/router";
import type { TagItem } from "#/stores";

defineOptions({
    name: "Tags",
});

const tagsRef = useTemplateRef("tagsRef");
const tags = useTagStore();
const route = useRoute();

const tagList = computed(() => [...tags.keepTags, ...tags.activeTags]);

watch(() => route.fullPath, fullPath => {
    tags.insert("activeTags", {
        closable: true,
        title: route.meta.title || route.fullPath,
        name: route.name as string,
        path: fullPath,
        meta: route.meta,
        query: route.query,
        matchedName: route.matched.map(item => (item.name as string)),
    });
}, {
    immediate: true,
});

function onClick(tag: TagItem) {
    router.push(tag.path);
}

function onClose(tag: TagItem, i: number) {
    tags.remove(tag.path);
    if(route.fullPath === tag.path) {
        const r = tagList.value[i + 1] || tagList.value.at(-1);
        router.push(r.path);
    }
}

function onMouseWheel(e: WheelEvent) {
    e.preventDefault();
    tagsRef.value!.scrollLeft += e.deltaY || e.detail;
}
</script>

<template>
    <div class="tag-wrapper h-[100%]" @click.right.prevent>
        <div ref="tagsRef" class="tag-list" @wheel="onMouseWheel">
            <template v-for="tag, i in tagList" :key="tag.path">
                <el-tag
                    class="tag-item"
                    :type="route.fullPath === tag.path ? 'primary' : 'info'"
                    :closable="tag.closable ?? true"
                    @click="onClick(tag)"
                    @close="onClose(tag, i)"
                >
                    {{ tag.title }}
                </el-tag>
            </template>
        </div>
        <div class="tag-actions">
            <Icon class="tag-actions-icon" size="18">
                <reload-outlined />
            </Icon>
            <el-divider direction="vertical" />
            <Icon class="tag-actions-icon" size="22">
                <more-outlined />
            </Icon>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.tag {
    &-wrapper {
        width: 100%;
        background-color: #fff;
        display: flex;
        align-items: center;
        @include when-dark {
            background-color: var(--dark-color);
        }
        @include border(bottom, var(--border-light-color)) {
            @include when-dark {
                background-color: var(--border-dark-color);
            }
        };
    }
    &-list {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 5px;
        gap: 5px;
        overflow-x: auto;
        @include hidden-scroll;
    }
    &-item {
        --el-tag-font-size: 14px;
        --el-tag-border-radius: 2px;
        cursor: pointer;
        height: 28px;
        &.el-tag--info {
            color: #000;
            background-color: rgb(250, 250, 252);
            border-color: rgb(224, 224, 230);
            @include when-dark {
                color: rgba($color: #fff, $alpha: 0.82);
                background-color: #0000;
                border-color: rgba($color: #fff, $alpha: 0.24);
            }
        }
    }
    &-actions {
        display: flex;
        align-items: center;
        height: 80%;
        box-shadow: -5px 1px 5px #d6d3d3;
        position: relative;
        top: -1px;
        z-index: 100;
        padding-left: 8px;
        padding-right: 8px;
        text-align: center;
        &-icon {
            cursor: pointer;
        }
        @include when-dark {
            box-shadow: var(--el-box-shadow-dark);
        }
    }
}
</style>