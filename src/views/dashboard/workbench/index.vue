<script setup lang="ts">
defineOptions({
    name: "Workbench",
});
</script>

<template>
    <div class="workbench">
        <el-card header="工作台" shadow="hover">
            <div class="flex justify-between items-center w-[100%]">
                <div class="flex items-center flex-1">
                    <el-avatar :size="64" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
                    <div class="ml-5">
                        <p class="m-0 text-[20px] c-[#333]">早安，Admin，开始您一天的工作吧！</p>
                        <p class="m-0 text-[14px] text-gray-400">今日阴转大雨，15℃ - 25℃，出门记得带伞哦。</p>
                    </div>
                </div>
                <div class="flex-1">
                    <div class="flex justify-end gap-[150px]">
                        <div class="text-right">
                            <div class="header-title">任务</div>
                            <div class="header-value">4/12</div>
                        </div>
                        <div class="text-right">
                            <div class="header-title">待办</div>
                            <div class="header-value">5/9</div>
                        </div>
                        <div class="text-right">
                            <div class="header-title">消息</div>
                            <div class="header-value">12</div>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<style lang="scss" scoped>
.workbench {
    .header{
        &-title {
            font-size: 14px;
            color: #767c82;
        }
        &-value {
            margin-top: 4px;
            font-size: 24px;
            color: #333639;
        }
    }
}
</style>