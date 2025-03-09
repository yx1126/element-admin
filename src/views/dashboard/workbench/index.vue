<script setup lang="ts">
import IconSelect from "@/components/IconSelect";
import LazyInput from "@/components/LazyInput";

const icon = ref("");

const lazyValue = ref("");
</script>

<template>
    <div>
        <div class="">
            workbench
        </div>
        <div v-drag class="w-[100px] h-[100px] bg-red"></div>
        <div mt-10>
            <icon-select v-model="icon" size="large" placement="prefix" clearable style="width: 280px;" />
            <lazy-input v-model="lazyValue" />
            <h1 c-blue mt-10>{{ lazyValue }}</h1>
        </div>
    </div>
</template>