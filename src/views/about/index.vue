<script setup lang="ts">
import packageJson from "../../../package.json";

defineOptions({
    name: "About",
});

const { t } = useLocal();
</script>

<template>
    <div class="about flex flex-col gap-[10px]">
        <el-card :header="t('prodTitle')" shadow="never">
            <el-descriptions border label-width="250">
                <template v-for="(v, k) in packageJson.dependencies" :key="k">
                    <el-descriptions-item :label="k">
                        <span>{{ v }}</span>
                    </el-descriptions-item>
                </template>
            </el-descriptions>
        </el-card>
        <el-card :header="t('devTitle')" shadow="never">
            <el-descriptions border label-width="250">
                <template v-for="(v, k) in packageJson.devDependencies" :key="k">
                    <el-descriptions-item :label="k">
                        <span>{{ v }}</span>
                    </el-descriptions-item>
                </template>
            </el-descriptions>
        </el-card>
    </div>
</template>

<i18n lang="yaml">
zh:
  devTitle: 开发环境依赖
  prodTitle: 生产环境依赖
en:
  devTitle: devDependencies
  prodTitle: dependencies
</i18n>