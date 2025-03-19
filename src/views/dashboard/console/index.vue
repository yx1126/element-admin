<script setup lang="ts">
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
                    <div class="w-[100%] h-[100%] flex justify-between items-center" :style="`--color: ${item.active}`">
                        <div class="box-center w-[80px] h-[80px] text-[var(--color)] rounded-[6px] transition-all duration-380 ease-out hover:bg-[var(--color)] hover:text-white">
                            <Icon :icon="item.icon" :size="45" />
                        </div>
                        <div>
                            <div class="leading-[18px] text-[16px] text-right mb-[12px]">{{ item.title }}</div>
                            <div class="text-[20px] text-right">
                                <el-statistic :value="item.value" />
                            </div>
                        </div>
                    </div>
                </el-card>
            </template>
        </div>
    </div>
</template>
