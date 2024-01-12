export function useThemeColor() {

    const color = readonly({
        themeColor: "#409EFF",  // 主题色
        darkColor: "#001428",   // 侧边栏北京市
        textColor: "#BBB",      // 侧边栏文字颜色
    });

    return color;
}