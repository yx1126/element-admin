<script lang="ts" setup>
import { routerTransList } from "@/stores";

const set = useSetStore();
const tags = useTagStore();
const keepMitt = useMitt("keepAlive");

const excludeName = ref("");

const routerTrans = computed(() => set.routerTrans);

const transitionMode = computed(() => {
    return routerTransList.find(r => r.value === routerTrans.value)?.mode || "default";
});

const keeps = computed(() => {
    const names = tags.tagList.filter(v => v.meta.keepAlive).flatMap(v => [...(v.matchedName || []), v.name]);
    return [...new Set(names)];
});
const excludeList = computed(() => {
    const val = ["Redirect"];
    if(excludeName.value) val.push(excludeName.value);
    return val;
});

keepMitt.on(name => {
    excludeName.value = name;
});
</script>

<template>
    <div class="layout-main">
        <router-view #default="{ Component, route }">
            <Transition :name="routerTrans" :mode="transitionMode">
                <KeepAlive :include="keeps" :exclude="excludeList">
                    <component :is="Component" :key="route.fullPath" />
                </KeepAlive>
            </Transition>
        </router-view>
    </div>
</template>

<style lang="scss" scoped>
.layout-main {
    padding: 10px;
}
</style>