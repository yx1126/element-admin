import type { ButtonConfigContext, MessageConfigContext } from "element-plus";
import type { TableColumn } from "@/hooks/useTable";
import type { Raw } from "vue";

function createConfig<T extends object>(config: T) {
    return markRaw(readonly(config)) as Raw<T>;
}

interface ConfigOptions {
    whiteList: string[];
    headerHeight: number;
    tagsHeight: number;
    menuWidth: number;
    themes: string[];
    queryKey: string;
    elConfigProvide: {
        button: ButtonConfigContext;
        message: MessageConfigContext;
    };
    tableColumn: TableColumn | ((column: TableColumn) => TableColumn);
    formSplit: boolean;
}

/**
 * 全局配置
 */
const Configs: ConfigOptions = createConfig({
    /**
     * 菜单白名单
     */
    whiteList: ["/login"],
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
     * @see {@link file://./layout/components/Tags/index.vue#L33}
     */
    queryKey: "tagName",
    /**
     * el-config-provider 配置
     */
    elConfigProvide: {
        button: {
            autoInsertSpace: false,
        },
        message: {
            duration: 2000,
            grouping: true,
        },
    },
    /**
     * `defineColumns`表格列默认属性
     * @see {@link file://./hooks/useTable.ts#L78}
     */
    tableColumn: column => {
        // 序号列、多选列
        const isIndexSelection = ["index", "selection"].includes(column.type!);
        // 操作列
        const isOperate = column.slotName === "operate" || column.label === "操作";
        // 时间
        const isTime = ["updatedAt", "createdAt"].includes(column.prop!);
        return {
            ...column,
            align: column.align ?? "center",
            width: isIndexSelection ? 80 : isTime ? 180 : undefined,
            minWidth: isIndexSelection ? undefined : 100,
            fixed: column.fixed ?? isIndexSelection ? "left" : isOperate ? "right" : undefined,
            showOverflowTooltip: (
                isOperate
                || column.slotName
                || ["selection", "index", "expand"].includes(column.type!)
            )
                ? false
                : column.showOverflowTooltip ?? true,
        };
    },
    /**
     * 搜索表单按钮固定在容器最右边
     * @see {@link file://./components/GlobalRegister/TableLayout/TableLayout.vue#L10}
     */
    formSplit: false,
});

export {
    Configs,
};