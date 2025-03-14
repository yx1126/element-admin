<script setup lang="ts">
import {
    MoreOutlined,
    ReloadOutlined,
} from "@vicons/antd";
import router from "@/router";
import Dropdown from "./Dropdown.vue";
import type { TagItem } from "#/stores";

defineOptions({
    name: "Tags",
});

const tagsRef = useTemplateRef("tagsRef");
const dropdownRef = useTemplateRef("dropdownRef");
const tags = useTagStore();
const route = useRoute();

const currentIndex = computed(() => tags.tagList.findIndex(v => v.path === route.fullPath));

watch(() => route.fullPath, fullPath => {
    tags.insert("activeTags", {
        closable: true,
        title: route.meta.title || route.fullPath,
        name: route.name as string,
        path: fullPath,
        meta: route.meta,
        query: route.query,
        matchedName: route.matched.map(item => (item.name as string)),
        type: "activeTags",
    });
}, {
    immediate: true,
});

function onClick(tag: TagItem) {
    router.push(tag.path);
}

function onClose(tag: TagItem, i: number) {
    dropdownRef.value?.close();
    tags.remove(tag.path);
    if(route.fullPath === tag.path) {
        const r = tags.tagList[i] || tags.tagList.at(-1);
        router.push(r.path);
    }
}

function onMouseWheel(e: WheelEvent) {
    e.preventDefault();
    tagsRef.value!.scrollLeft += e.deltaY || e.detail;
}

function onRightClick(e: MouseEvent, index: number) {
    dropdownRef.value?.open(e, index);
}

function onMoreClick(e: MouseEvent) {
    const index = tags.tagList.findIndex(v => v.path === route.fullPath);
    if(index === -1) return;
    dropdownRef.value?.open(e, index, "icon");
}

function onSelect(type: string, index: number) {
    const tag = tags.tagList[index];
    const current = tags.tagList[currentIndex.value];
    switch(type) {
    case "current":
        onClose(tag, index);
        break;
    case "left":
        if(currentIndex.value < index) {
            router.push(tags.tagList[index].path);
        }
        tags.removeLeft(tag.path);
        break;
    case "right":
        if(currentIndex.value > index) {
            router.push(tags.tagList[index].path);
        }
        tags.removeRight(tag.path);
        break;
    case "other":

        if(tag.type === "activeTags") {
            if(current.path !== tag.path) {
                router.push(tag.path);
            }
            tags.removeOther(tag.path);
            break;
        }
        if(current.type === "activeTags") {
            router.push(tag.path);
        }
        tags.removeAll(tag.path);
        break;
    case "all":
        if(current.type === "keepTags") {
            if(tag.path !== current.path) {
                router.push(tags.keepTags.at(-1)!.path);
                tags.removeAll(tag.path);
                break;
            }
            tags.removeAll(tag.path);
            break;
        }
        router.push(tags.keepTags.at(-1)!.path);
        tags.removeAll(tag.path);
        break;
    case "removeFixed":
        tags.removeFixed(tag.path);
        break;
    case "keepFixed":
        tags.keepFixed(tag.path);
        break;
    case "clear":
        break;
    default:
        break;
    }
}
</script>

<template>
    <div class="tag-wrapper h-[100%]" @click.right.prevent>
        <div ref="tagsRef" class="tag-list" @wheel="onMouseWheel">
            <template v-for="tag, i in tags.tagList" :key="tag.path">
                <el-tag
                    class="tag-item"
                    :type="route.fullPath === tag.path ? 'primary' : 'info'"
                    :closable="tag.closable ?? true"
                    @click="onClick(tag)"
                    @click.right="onRightClick($event, i)"
                    @close="onClose(tag, i)"
                >
                    <!-- <Icon v-if="tag.meta.icon" :icon="tag.meta.icon" /> -->
                    {{ tag.title }}
                </el-tag>
            </template>
        </div>
        <div class="tag-actions">
            <Icon class="tag-actions-icon" size="18">
                <reload-outlined />
            </Icon>
            <el-divider direction="vertical" />
            <Icon class="tag-actions-icon" size="22" @click.stop="onMoreClick">
                <more-outlined />
            </Icon>
        </div>
    </div>
    <Dropdown ref="dropdownRef" @select="onSelect" />
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