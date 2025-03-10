<script setup lang="ts">
import type { FormRules } from "element-plus";

defineOptions({
    name: "Person",
});

type TabsName = "base" | "safety";

const user = useUserStore();
const pwdMitt = useMitt("updatePwd");
const formRef = useTemplateRef("formRef");

const tabsActive = ref<TabsName>("base");
const form = ref(getForm());

const rules: FormRules = {
    username: { required: true, message: "请输入用户名！", trigger: "blur" },
    nickName: { required: true, message: "请输入昵称！", trigger: "blur" },
    sex: { required: true, message: "请选择性别！", trigger: "change" },
    email: { required: true, message: "请输入邮箱！", trigger: "blur" },
};

function getForm() {
    return {
        ...user.userInfo,
        email: "test1234@163.com",
        description: "你在干什么！",
    };
}

function onSubmit() {}

function onReset() {
    formRef.value?.resetFields();
}

function onEditPwd() {
    pwdMitt.emit();
}
</script>

<template>
    <div class="person">
        <el-row :gutter="12">
            <el-col :span="7">
                <el-card header="个人信息" shadow="never">
                    <div class="userinfo">
                        <div class="avatar">
                            <el-avatar :size="120" :src="user.userInfo?.avatar" />
                        </div>
                        <el-button class="mt-[20px]" type="primary" link>修改头像</el-button>
                        <div class="w-[90%] mt-[30px]">
                            <div class="item-justify">
                                <div>用户昵称</div>
                                <div>{{ user.userInfo?.nickName }}</div>
                            </div>
                            <div class="item-justify">
                                <div>用户账号</div>
                                <div>{{ user.userInfo?.username }}</div>
                            </div>
                            <div class="item-justify">
                                <div>手机号码</div>
                                <div>166****3090</div>
                            </div>
                            <div class="item-justify">
                                <div>所属部门</div>
                                <div>技术部门</div>
                            </div>
                            <div class="item-justify">
                                <div>邮箱地址</div>
                                <div>test1234@163.com</div>
                            </div>
                            <div class="item-justify">
                                <div>创建时间</div>
                                <div>2022-08-12</div>
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="17">
                <el-card shadow="never">
                    <el-tabs v-model="tabsActive">
                        <el-tab-pane label="基本资料" name="base" lazy>
                            <el-form
                                ref="formRef"
                                class="w-[400px]"
                                :model="form"
                                :rules="rules"
                                label-position="top"
                                label-suffix="："
                                require-asterisk-position="right"
                            >
                                <el-form-item prop="username" label="用户名">
                                    <el-input v-model="form.username" placeholder="请输入用户名" readonly />
                                </el-form-item>
                                <el-form-item prop="nickName" label="昵称">
                                    <el-input v-model="form.nickName" placeholder="请输入用户名" clearable />
                                </el-form-item>
                                <el-form-item prop="sex" label="性别">
                                    <el-radio-group v-model="form.sex">
                                        <el-radio label="男" :value="1" />
                                        <el-radio label="女" :value="2" />
                                        <el-radio label="未知" :value="0" />
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item prop="email" label="邮箱">
                                    <el-input v-model="form.email" placeholder="请输入邮箱" clearable />
                                </el-form-item>
                                <el-form-item prop="description" label="个人简介">
                                    <el-input v-model="form.description" type="textarea" placeholder="请输入个人简介" clearable />
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit">保存</el-button>
                                    <el-button @click="onReset">重置</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="安全设置" name="safety" lazy>
                            <el-list class="list-no-padd">
                                <el-list-item>
                                    <el-thing title="账户密码">
                                        <template #description>
                                            <span class="description">设置密码，帐号更安全</span>
                                        </template>
                                    </el-thing>
                                    <template #suffix>
                                        <el-button type="primary" link @click="onEditPwd">修改</el-button>
                                    </template>
                                </el-list-item>
                                <el-list-item>
                                    <el-thing title="绑定手机">
                                        <template #description>
                                            <span class="description">已绑定手机号：+86 177****3090</span>
                                        </template>
                                    </el-thing>
                                    <template #suffix>
                                        <el-button type="primary" link>修改</el-button>
                                    </template>
                                </el-list-item>
                                <el-list-item>
                                    <el-thing title="绑定邮箱">
                                        <template #description>
                                            <span class="description">已绑定邮箱：test****@163.com</span>
                                        </template>
                                    </el-thing>
                                    <template #suffix>
                                        <el-button type="primary" link>修改</el-button>
                                    </template>
                                </el-list-item>
                                <el-list-item>
                                    <el-thing title="账号注销">
                                        <template #description>
                                            <span class="description">该账号将被注销，且不支持找回!</span>
                                        </template>
                                    </el-thing>
                                    <template #suffix>
                                        <el-button type="primary" link>注销</el-button>
                                    </template>
                                </el-list-item>
                            </el-list>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<style lang="scss" scoped>
.person {
    .userinfo {
        display: flex;
        flex-direction: column;
        align-items: center;
        .item-justify {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            position: relative;
            padding-bottom: 10px;
            &+.item-justify {
                margin-top: 10px;
            }
            &>div:first-child::after {
                content: "：";
            }
            &::after {
                content: "";
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 1px;
                background-color: var(--el-border-color);
            }
        }
    }
    .description {
        color: #909399;
    }
}
</style>