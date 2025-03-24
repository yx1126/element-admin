import type { ButtonConfigContext, MessageConfigContext } from "element-plus";
import type { Raw } from "vue";

function createConfig<T extends object>(config: T) {
    return markRaw(readonly(config)) as Raw<T>;
}

interface ConfigOptions {
    headerHeight: number;
    tagsHeight: number;
    menuWidth: number;
    themes: string[];
    queryKey: string;
    elConfigProvide: {
        button: ButtonConfigContext;
        message: MessageConfigContext;
    };
}

/**
 * 全局配置
 */
const Configs: ConfigOptions = createConfig({
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
    /**
     * 标签名称参数
     * @default tagName
     * @see {@link file://./layout/components/Tags/index.vue#L32}
     */
    queryKey: "tagName",
    /**
     * el-config-provider 配置
     */
    elConfigProvide: {
        button: {
            autoInsertSpace: true,
        },
        message: {
            duration: 1500,
        },
    },
});

export {
    Configs,
};