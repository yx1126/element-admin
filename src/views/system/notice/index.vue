<script setup lang="ts">
import { encrypt } from "@/utils/crypto";
import { login } from "@/api/login";
import type { LoginInfo } from "#/views";

defineOptions({
    name: "Notice",
});
const info: LoginInfo = {
    username: "admin",
    password: "123456",
    code: "12",
    uuid: "11-22-33-13-55",
};

function onClick() {
    const str = encrypt(JSON.stringify(info));
    login(str).then(res => {
        // eslint-disable-next-line no-console
        console.log("res", res);
    });
}
function onClick2() {
    const str = encrypt(JSON.stringify(info));
    // eslint-disable-next-line no-console
    console.log("str", str);
}
</script>

<template>
    <div class="notice">
        <el-card-v2>
            <el-button type="primary" @click="onClick2">Encrypt</el-button>
            <el-button type="primary" @click="onClick">Login</el-button>
            <el-button @click="onClick">Login1</el-button>
        </el-card-v2>
    </div>
</template>