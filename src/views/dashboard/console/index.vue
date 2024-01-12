<template>
    <div class="">
        console
        <icon icon="EleQuestionFilled" rotate="0" />
        <div ref="divRef" style="width: 50%; height: 400px; border: 1px solid red;">
            <scroll-bar always is-resize>
                <template v-for="item in 50" :key="item">
                    <p>{{ item }}</p>
                </template>
            </scroll-bar>
        </div>
    </div>
</template>

<script setup lang="ts">
import ScrollBar from "@/components/ScrollBar";


</script>

<style lang="scss" scoped></style>