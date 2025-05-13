<script setup lang="ts">
import "@wangeditor-next/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor-next/editor-for-vue";
import { parseUnit } from "@/utils/unit";
import { tryOnScopeDispose } from "@vueuse/core";
import type { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor-next/editor";
import type { StyleValue } from "vue";

const modelValue = defineModel<string>();

const {
    mode = "default",
    height = 500,
    placeholder,
    readonly,
    autoFocus,
    maxLength,
    editorConfig,
    toolbar,
    toolbarConfig,
    modalAppendToBody = true,
    excludeKeys,
} = defineProps<{
    mode?: "default" | "simple";
    height?: string | number;
    placeholder?: string;
    readonly?: boolean;
    autoFocus?: boolean;
    maxLength?: number;
    editorConfig?: Partial<IEditorConfig>;
    toolbar?: IToolbarConfig["toolbarKeys"];
    toolbarConfig?: Partial<IToolbarConfig>;
    modalAppendToBody?: boolean;
    excludeKeys?: string[];
}>();

const emit = defineEmits<{
    "on-created": [IDomEditor];
    "on-change": [IDomEditor];
}>();

const { t } = useLocal();

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef<Noable<IDomEditor>>(undefined);

const styles = computed<StyleValue>(() => {
    return {
        "--wangeditor-height": parseUnit(height),
    };
});

const defaultToolbarConfig = computed<Partial<IToolbarConfig>>(() => {
    const defaultValue: Partial<IToolbarConfig> = {
        modalAppendToBody,
        excludeKeys,
        // insertKeys: {
        //     index: -1,
        //     keys: ["preview"],
        // },
        ...toolbarConfig,
    };
    if(toolbar) {
        defaultValue["toolbarKeys"] = toolbar;
    }
    return defaultValue;
});

const defaultEditorConfig = computed<Partial<IEditorConfig>>(() => {
    return {
        placeholder: placeholder ?? t("placeholder"),
        readOnly: readonly,
        autoFocus,
        maxLength,
        ...editorConfig,
    };
});

watch(() => readonly, val => {
    if(val) {
        editorRef.value?.disable();
    } else {
        editorRef.value?.enable();
    }
});

tryOnScopeDispose(destroy);

function onModalChange() {
    if(!modalAppendToBody) return;
    editorRef.value?.on("modalOrPanelShow", modalOrPanel => {
        if(modalOrPanel.type !== "modal") return;

        const { $elem } = modalOrPanel; // modal element
        const width = $elem.width();
        const height = $elem.height();

        // set modal position z-index
        $elem.css({
            left: "50%",
            top: "50%",
            marginLeft: `-${width / 2}px`,
            marginTop: `-${height / 2}px`,
            zIndex: 3002,
        });

        // show mask
    });
    editorRef.value?.on("modalOrPanelHide", () => {
        // hide mask
    });
}

function destroy() {
    if(editorRef.value) {
        editorRef.value.destroy();
    }
}

function onCreated(editor: IDomEditor) {
    emit("on-created", editor);
    editorRef.value = editor;
    nextTick(() => {
        onModalChange();
    });
};

function onChange(editor: IDomEditor) {
    emit("on-change", editor);
}

function setHtml(html: string) {
    editorRef.value?.setHtml(html);
}

function getHtml() {
    return editorRef.value?.getHtml();
}

function getText() {
    return editorRef.value?.getText();
}

defineExpose({
    editor: editorRef,
    setHtml,
    getHtml,
    getText,
});
</script>

<template>
    <div class="wangeditor-wrapper" :style="styles">
        <Toolbar
            class="wangeditor-bar"
            style="border-bottom: 1px solid #ccc"
            :editor="editorRef"
            :default-config="defaultToolbarConfig"
            :mode="mode"
        />
        <Editor
            v-model="modelValue"
            class="wangeditor-editor"
            :default-config="defaultEditorConfig"
            :mode="mode"
            @on-created="onCreated"
            @on-change="onChange"
        />
    </div>
</template>

<style lang="scss" scoped>
.wangeditor {
    &-wrapper {
        border: 1px solid #ccc;
        @include when-dark {
            // textarea - css vars
            --w-e-textarea-bg-color: transparent;
            --w-e-textarea-color: #333;
            --w-e-textarea-border-color: var(--border-dark-color);
            --w-e-textarea-slight-border-color: #e8e8e8;
            --w-e-textarea-slight-color: #d4d4d4;
            --w-e-textarea-slight-bg-color: #f5f2f0;
            --w-e-textarea-selected-border-color: #B4D5FF; // 选中的元素，如选中了分割线
            --w-e-textarea-handler-bg-color: #4290f7; // 工具，如图片拖拽按钮

            // toolbar - css vars
            --w-e-toolbar-color: #595959;
            --w-e-toolbar-bg-color: var(--el-bg-color-overlay);
            --w-e-toolbar-active-color: #fff;
            --w-e-toolbar-active-bg-color: transparent;
            --w-e-toolbar-disabled-color: #999;
            --w-e-toolbar-border-color: var(--border-dark-color);

            // modal - css vars
            --w-e-modal-button-bg-color: transparent;
            --w-e-modal-button-border-color: #d9d9d9;
            border-color: var(--border-dark-color);
            :deep(.w-e-text-container [data-slate-editor]) {
                border-top-color: var(--border-dark-color) !important;
            }
        }
    }
    &-bar {
        border-bottom: 1px solid #ccc;
        @include when-dark {
            border-bottom-color: var(--border-dark-color) !important;
        }
    }
    &-editor {
        height: var(--wangeditor-height) !important;
        overflow-y: hidden;
    }
}
</style>

<i18n lang="yaml">
zh:
  placeholder: 请输入内容...
en:
  placeholder: Please enter content...
</i18n>