<script setup lang="ts">
import Echarts from "@/components/Echarts";
import CountTo from "@/components/CountTo";
import { lineOptions, gaugeOptions, pieOptions, barOptions, lineOptions2 } from "../echarts";

defineOptions({
    name: "Console",
});

const cardPanels = [
    { title: "New Visits", value: 102400, icon: "card-people", active: "#40c9c6" },
    { title: "Messages", value: 81212, icon: "card-message", active: "#36a3f7" },
    { title: "Purchases", value: 9280, icon: "card-money", active: "#f4516c" },
    { title: "Shoppings", value: 13600, icon: "card-shopping", active: "#34bfa3" },
];
</script>

<template>
    <div class="">
        <div class="grid grid-cols-4 grid-rows-[120px] gap-[12px]">
            <template v-for="item in cardPanels" :key="item.title">
                <el-card shadow="hover">
                    <div class="pointer w-[100%] h-[100%] flex justify-between items-center group" :style="`---icon-color: ${item.active}`">
                        <div class="box-center icon w-[80px] h-[80px] text-[var(---icon-color)] rounded-[6px] transition duration-380 ease-out group-hover:bg-[var(---icon-color)] group-hover:text-white">
                            <Icon :icon="item.icon" :size="45" />
                        </div>
                        <div>
                            <div class="leading-[18px] text-[16px] text-right mb-[12px]">{{ item.title }}</div>
                            <div class="text-[20px] text-right">
                                <count-to :value="item.value" :options="{ duration: 1000 }" />
                            </div>
                        </div>
                    </div>
                </el-card>
            </template>
        </div>
        <el-card class="mt-[12px]" shadow="hover">
            <div class="h-[350px]">
                <Echarts :options="lineOptions2" />
            </div>
        </el-card>
        <div class="grid grid-cols-3 gap-[12px]">
            <el-card class="mt-[12px]" shadow="hover">
                <div class="h-[350px]">
                    <Echarts :options="gaugeOptions" />
                </div>
            </el-card>
            <el-card class="mt-[12px]" shadow="hover">
                <div class="h-[350px]">
                    <Echarts :options="pieOptions" />
                </div>
            </el-card>
            <el-card class="mt-[12px]" shadow="hover">
                <div class="h-[350px]">
                    <Echarts :options="barOptions" />
                </div>
            </el-card>
        </div>
        <el-card class="mt-[12px]" shadow="hover">
            <div class="h-[350px]">
                <Echarts :options="lineOptions" />
            </div>
        </el-card>
    </div>
</template>
