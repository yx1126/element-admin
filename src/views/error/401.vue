<template>
    <el-card shadow="never">
        <div class="four-zero-three">
            <el-button type="primary" icon="EleArrowLeft" @click="back">返 回</el-button>
            <el-row>
                <el-col :span="12">
                    <h1 class="text-jumbo text-ginormous">401错误!</h1>
                    <h2 class="text-h2">您没有访问权限！</h2>
                    <h6 class="text-h6">对不起，您没有访问权限，请不要进行非法操作！您可以返回主页面</h6>
                    <ul class="list-unstyled">
                        <li class="link-type">
                            <el-button link type="primary" @click="back">回首页</el-button>
                        </li>
                    </ul>
                </el-col>
                <el-col :span="12">
                    <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream." />
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>

<script setup lang="ts">
import ErrGif from "@/assets/image/401.gif";

const router = useRouter();
const errGif = ref(ErrGif + "?" + +new Date());

function back() {
    router.push("/");
}
</script>

<style lang="scss" scoped>
.four-zero-three {
    width: 800px;
    max-width: 100%;
    margin: 100px auto;
    .pan-gif {
        margin: 0 auto;
        display: block;
    }
    .pan-img {
        display: block;
        margin: 0 auto;
        width: 100%;
    }
    .text-jumbo {
        font-size: 60px;
        font-weight: 700;
        color: #484848;
        margin: 40px 0;
    }
    .text-h2 {
        margin: 15px 0;
    }
    .text-h6 {
        margin: 20px 0;
    }
    // .list-unstyled {
    //     font-size: 14px;
    //     li {
    //         padding-bottom: 5px;
    //     }
    //     a {
    //         text-decoration: none;
    //         &:hover {
    //             text-decoration: underline;
    //         }
    //     }
    // }
}
</style>
