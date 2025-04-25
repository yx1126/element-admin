<script setup lang="ts">
const router = useRouter();

function onLogin() {
    router.replace("/");
}
</script>

<template>
    <div class="">
        login
        <el-button @click="onLogin">Login</el-button>
    </div>
</template>