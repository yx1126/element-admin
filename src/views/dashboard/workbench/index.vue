<script setup lang="ts">
import ToDoList from "./components/ToDoList.vue";
import Echarts from "@/components/Echarts";
import { radarOptions } from "../echarts";

defineOptions({
    name: "Workbench",
});

const user = useUserStore();
const { t } = useLocal();

const underwayList = ref([
    { title: "ElementPlus", icon: "element-plus", desc: "基于 Vue 3，面向设计师和开发者的组件库", group: "NaiveUI", time: "9小时前" },
    { title: "Vite", icon: "vite", desc: "Vite 下一代的前端工具链 为开发提供极速响应", group: "Vite", time: "9小时前" },
    { title: "Vue", icon: "vue", desc: "渐进式 JavaScript 框架 易学易用，性能出色，适用场景丰富的 Web 前端框架。", group: "Vue", time: "9小时前" },
    { title: "Typescript", icon: "typescript", desc: "TypeScript是JavaScript类型的超集。", group: "Typescript9", time: "9小时前" },
    { title: "Scss", icon: "sass", desc: "世界上最成熟、最稳定、最强大的专业级CSS扩展语言！", group: "Scss", time: "9小时前" },
    { title: "Milkdown", icon: "milkdown", desc: "插件驱动的所见即所得的Markdown编辑器框架", group: "Milkdown", time: "9小时前" },
]);
</script>

<template>
    <div class="workbench">
        <el-card shadow="never">
            <div class="text-[18px] mb-[20px]">工作台</div>
            <div class="flex justify-between items-center w-[100%] ">
                <div class="flex items-center flex-1">
                    <el-avatar class="min-w-64px" :size="64" :src="user.getUserAvatar()" />
                    <div class="ml-5 whitespace-nowrap">
                        <p class="m-0 text-[20px] c-[#333] dark:c-white">{{ t("salutation", [user.userInfo?.nickName]) }}</p>
                        <p class="m-0 text-[14px] text-gray-400">{{ t("weather") }}</p>
                    </div>
                </div>
                <div class="flex-1">
                    <div class="flex justify-end gap-[150px]">
                        <div class="text-right">
                            <div class="header-title">{{ t("task") }}</div>
                            <div class="header-value">4/12</div>
                        </div>
                        <div class="text-right">
                            <div class="header-title">{{ t("todo") }}</div>
                            <div class="header-value">5/9</div>
                        </div>
                        <div class="text-right">
                            <div class="header-title">{{ t("information") }}</div>
                            <div class="header-value">12</div>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
        <div class="grid grid-cols-[16fr_8fr] gap-[12px]">
            <div class="overflow-auto">
                <el-card class="mt-12px no-padding" shadow="never">
                    <template #header>
                        <div class="flex justify-between items-center">
                            <span v-copy="'11'" v-copy:success="() => {}">{{ t("card1-title") }}</span>
                            <el-button type="primary" link>{{ t("card1-btn") }}</el-button>
                        </div>
                    </template>
                    <div class="grid grid-cols-3">
                        <template v-for="c in underwayList" :key="c.title">
                            <el-thing class="project-card">
                                <template #avatar>
                                    <Icon :icon="c.icon" :size="28" />
                                </template>
                                <template #header>{{ c.title }}</template>
                                <div class="h-45px">{{ c.desc }}</div>
                                <template #footer>
                                    <div class="flex justify-between">
                                        <span class="pointer hover:c-primary">{{ c.group }}</span>
                                        <span class="text-gray-400">{{ c.time }}</span>
                                    </div>
                                </template>
                            </el-thing>
                        </template>
                    </div>
                </el-card>
                <el-card class="no-padding mt-12px" :header="t('card2-title')" shadow="never">
                    <to-do-list />
                </el-card>
            </div>
            <div class="overflow-auto">
                <el-card class="no-padding mt-[12px]" :header="t('card3-title')" shadow="never">
                    <el-carousel trigger="click" height="240px">
                        <el-carousel-item>
                            <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg">
                        </el-carousel-item>
                        <el-carousel-item>
                            <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg">
                        </el-carousel-item>
                        <el-carousel-item>
                            <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg">
                        </el-carousel-item>
                        <el-carousel-item>
                            <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg">
                        </el-carousel-item>
                    </el-carousel>
                </el-card>
                <el-card class="mt-[12px]" :header="t('card4-title')" shadow="never">
                    <div class="grid grid-cols-4 gap-13px">
                        <el-link type="primary">操作一</el-link>
                        <el-link type="primary">操作二</el-link>
                        <el-link type="primary">操作三</el-link>
                        <el-link type="primary">操作四</el-link>
                        <el-link type="primary">操作五</el-link>
                        <el-link type="primary">操作六</el-link>
                    </div>
                </el-card>
                <el-card class="mt-[12px]" shadow="never">
                    <div class="h-320px">
                        <Echarts :options="radarOptions" />
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.workbench {
    .header {
        &-title {
            font-size: 14px;
            color: #767c82;
        }
        &-value {
            margin-top: 4px;
            font-size: 24px;
            color: #333639;
            @include when-dark {
                color: #fff;
            }
        }
    }
    .project-card {
        padding: 20px 24px;
        transition: all 0.3s ease-out;
        &:nth-child(-n + 3) {
            border-bottom: 1px solid var(--el-border-color);
        }
        &:not(:nth-child(3n)) {
            border-right: 1px solid var(--el-border-color);
        }
        &:hover {
            box-shadow: var(--el-box-shadow);
        }
    }
    .carousel-img {
        width: 100%;
        height: 240px;
        object-fit: cover;
    }
}
</style>

<i18n lang="yaml">
zh:
  salutation: 早安，{0}，开始您一天的工作吧！
  weather: 今日阴转大雨，15℃ - 25℃，出门记得带伞哦。
  task: 任务
  todo: 待办
  information: 消息
  card1-title: 进行中的项目
  card1-btn: 全部项目
  card2-title: 待办
  card3-title: 公告
  card4-title: 便捷操作
en:
  salutation: Good morning, {0}, start your day's work!
  weather: It will be cloudy and then rainy today, 15℃ - 25℃, please remember to bring an umbrella when you go out.
  task: Task
  todo: To Do
  information: Information
  card1-title: Ongoing Projects
  card1-btn: All Projects
  card2-title: To Do
  card3-title: Announcement
  card4-title: Convenient operation
</i18n>