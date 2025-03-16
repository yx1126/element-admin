import type { ButtonConfigContext, MessageConfigContext } from "element-plus";
import type { Raw } from "vue";

function createConfig<T extends object>(config: T) {
    return markRaw(readonly(config)) as Raw<T>;
}

/**
 * el-config-provider button 配置
 */
const buttonConfig: ButtonConfigContext = createConfig({
    autoInsertSpace: true,
});

/**
 * el-config-provider message 配置
 */
const messageConfig: MessageConfigContext = createConfig({
    duration: 1500,
});

/**
 * 全局配置
 */
const LayoutConfig = createConfig({
    /**
     * 头部高度
     * @default 50
     */
    headerHeight: 50,
    /**
     * 标签高度
     * @default 35
     */
    tagsHeight: 35,
    /**
     * 菜单宽度
     * @default 200
     */
    menuWidth: 200,
    /**
     * @default ["#409EFF", "#18a058", "#67C23A", "#E6A23C", "#F56C6C", "#909399"]
     * 主题色预设
     */
    themes: ["#409EFF", "#18a058", "#67C23A", "#E6A23C", "#F56C6C", "#909399"],
});

export {
    buttonConfig,
    messageConfig,
    LayoutConfig,
};