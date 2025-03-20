export const lineOptions = {
    title: {
        text: "Stacked Line",
    },
    tooltip: {
        trigger: "axis",
    },
    legend: {
        data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
    },
    grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
    },
    toolbox: {
        feature: {
            saveAsImage: {},
        },
    },
    xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
        type: "value",
    },
    series: [
        {
            name: "Email",
            type: "line",
            stack: "Total",
            data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
            name: "Union Ads",
            type: "line",
            stack: "Total",
            data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
            name: "Video Ads",
            type: "line",
            stack: "Total",
            data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
            name: "Direct",
            type: "line",
            stack: "Total",
            data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
            name: "Search Engine",
            type: "line",
            stack: "Total",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
    ],
};

export const gaugeOptions = {
    series: [
        {
            type: "gauge",
            center: ["50%", "60%"],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            splitNumber: 12,
            itemStyle: {
                color: "#FFAB91",
            },
            progress: {
                show: true,
                width: 30,
            },
            pointer: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    width: 30,
                },
            },
            axisTick: {
                distance: -45,
                splitNumber: 5,
                lineStyle: {
                    width: 2,
                    color: "#999",
                },
            },
            splitLine: {
                distance: -52,
                length: 14,
                lineStyle: {
                    width: 3,
                    color: "#999",
                },
            },
            axisLabel: {
                distance: -20,
                color: "#999",
                fontSize: 20,
            },
            anchor: {
                show: false,
            },
            title: {
                show: false,
            },
            detail: {
                valueAnimation: true,
                width: "60%",
                lineHeight: 40,
                borderRadius: 8,
                offsetCenter: [0, "-15%"],
                fontSize: 60,
                fontWeight: "bolder",
                formatter: "{value} °C",
                color: "inherit",
            },
            data: [
                {
                    value: 20,
                },
            ],
        },
        {
            type: "gauge",
            center: ["50%", "60%"],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            itemStyle: {
                color: "#FD7347",
            },
            progress: {
                show: true,
                width: 8,
            },
            pointer: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            detail: {
                show: false,
            },
            data: [
                {
                    value: 20,
                },
            ],
        },
    ],
};

export const pieOptions = {
    tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
        left: "center",
        bottom: "10",
        data: ["Industries", "Technology", "Forex", "Gold", "Forecasts"],
    },
    series: [
        {
            name: "WEEKLY WRITE ARTICLES",
            type: "pie",
            roseType: "radius",
            radius: [15, 95],
            center: ["50%", "38%"],
            data: [
                { value: 320, name: "Industries" },
                { value: 240, name: "Technology" },
                { value: 149, name: "Forex" },
                { value: 100, name: "Gold" },
                { value: 59, name: "Forecasts" },
            ],
            animationEasing: "cubicInOut",
            animationDuration: 1000,
        },
    ],
};

export const barOptions = {
    tooltip: {
        trigger: "axis",
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
    },
    grid: {
        top: 10,
        left: "2%",
        right: "2%",
        bottom: "3%",
        containLabel: true,
    },
    xAxis: [{
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisTick: {
            alignWithLabel: true,
        },
    }],
    yAxis: [{
        type: "value",
        axisTick: {
            show: false,
        },
    }],
    series: [{
        name: "pageA",
        type: "bar",
        stack: "vistors",
        barWidth: "60%",
        data: [79, 52, 200, 334, 390, 330, 220],
        animationDuration: 1000,
    }, {
        name: "pageB",
        type: "bar",
        stack: "vistors",
        barWidth: "60%",
        data: [80, 52, 200, 334, 390, 330, 220],
        animationDuration: 1000,
    }, {
        name: "pageC",
        type: "bar",
        stack: "vistors",
        barWidth: "60%",
        data: [30, 52, 200, 334, 390, 330, 220],
        animationDuration: 1000,
    }],
};

export const lineOptions2 = {
    xAxis: {
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        boundaryGap: false,
        axisTick: {
            show: false,
        },
    },
    grid: {
        left: 10,
        right: 10,
        bottom: 20,
        top: 30,
        containLabel: true,
    },
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "cross",
        },
        padding: [5, 10],
    },
    yAxis: {
        axisTick: {
            show: false,
        },
    },
    legend: {
        data: ["expected", "actual"],
    },
    series: [{
        name: "expected", itemStyle: {
            directly: {
                color: "#FF005A",
                lineStyle: {
                    color: "#FF005A",
                    width: 2,
                },
            },
        },
        smooth: true,
        type: "line",
        data: [100, 120, 161, 134, 105, 160, 165],
        animationDuration: 1000,
        animationEasing: "cubicInOut",
    },
    {
        name: "actual",
        smooth: true,
        type: "line",
        itemStyle: {
            directly: {
                color: "#3888fa",
                lineStyle: {
                    color: "#3888fa",
                    width: 2,
                },
                areaStyle: {
                    color: "#f3f8ff",
                },
            },
        },
        data: [120, 82, 91, 154, 162, 140, 145],
        animationDuration: 1000,
        animationEasing: "quadraticOut",
    }],
};

const data = [76.98, 75.4, 86.1, 75.4, 76.98, 86.1];
const indicatorname = ["主业营收", "规模增长", "盈利能力", "规模增长", "企业外部资源整合", "专业管理能力"];
const maxdata = [100, 100, 100, 100, 100, 100];

function contains(arrays: any[], obj: any) {
    let i = arrays.length;
    while(i--) {
        if(arrays[i] === obj) {
            return i;
        }
    }
    return false;
}

export const radarOptions = {
    backgroundColor: "transparent",
    tooltip: {
        show: true,
        formatter: function() {
            let html = "";
            for(let i = 0; i < data.length; i++) {
                html += indicatorname[i] + " : " + data[i] + "<br>";
            }
            return html;
        },
        borderWidth: 0,
    },
    radar: {
        radius: "50%", // 大小
        axisNameGap: 40, // 图中工艺等字距离图的距离
        center: ["50%", "50%"], // 图的位置
        axisName: {
            rich: {
                a: {
                    fontSize: "12",
                    color: "#333333",
                    lineHeight: "20",
                    fontWeight: "500",
                },
                b: {
                    fontSize: "12",
                    color: "#666666",
                },
            },
            formatter: function(params: any) {
                const i = contains(indicatorname, params);
                const percent = (data[i as number] / 100) * 100;
                return "{b|" + params + "}\n" + "{a|" + percent + "}";
            },
        },
        indicator: indicatorname.map((item, i) => ({ name: item, max: maxdata[i] })),
        axisLine: {
            lineStyle: {
                color: "#3299FD30",
            },
            show: true,
            symbolSize: [1, 30],
            symbol: ["none", "rect"],
            symbolOffset: [0, 25],
        },
        splitArea: {
            show: false,
            areaStyle: {
                color: "transparent", // 图表背景的颜色
            },
        },
        splitLine: {
            show: true,
            lineStyle: {
                width: 1,
                color: "#3299FD30", // 设置网格的颜色
            },
        },
    },
    series: [
        {
            name: "报警类型分析",
            type: "radar",
            symbol: "circle",
            itemStyle: {
                areaStyle: {
                    type: "default",
                },
            },
            data: [
                {
                    symbol: "none",
                    symbolSize: 5,
                    value: data,
                    areaStyle: { color: "transparent" },
                    lineStyle: {
                        color: "#3299FD",
                        width: 4,
                    },
                },
            ],
        },
    ],
};
