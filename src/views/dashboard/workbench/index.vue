<template>
    <div>
        <div class="" c-ff0000-25>
            workbench
        </div>
        <div w-100p h-50 b-1-red>red</div>
        <div m="t-10 b-10">color</div>
        <div v-drag w-100 h-100 b="1 solid red"></div>
        <div mt-10>
            <icon-select v-model="icon" size="large" placement="preffix" clearable style="width: 280px;" />
            <lazy-input v-model.lazy="lazyValue" w-100 />
            <lazy-input v-model="lazyValue" w-100 />
            <h1 c-blue mt-10>{{ lazyValue }}</h1>
        </div>
    </div>
</template>

<script setup lang="ts">
import IconSelect from "@/components/IconSelect";
import LazyInput from "@/components/LazyInput";
const icon = ref("vue");

const lazyValue = ref("");
</script>

<style lang="scss" scoped></style>