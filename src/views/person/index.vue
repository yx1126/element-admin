<script setup lang="ts">
import type { FormRules } from "element-plus";

defineOptions({
    name: "Person",
});

type TabsName = "base" | "safety";

const user = useUserStore();
const { t } = useLocal();
const pwdMitt = useMitt("updatePwd");
const formRef = useTemplateRef("formRef");

const tabsActive = ref<TabsName>("base");
const form = ref(getForm());

const rules: FormRules = {
    username: Require(t("username2")),
    nickName: Require(t("nickname2")),
    sex: Require(t("sex"), "change"),
    email: Require(t("email2")),
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
                <el-card :header="t('userinfo')" shadow="never">
                    <div class="userinfo">
                        <div class="avatar">
                            <el-avatar :size="120" :src="user.userInfo?.avatar" />
                        </div>
                        <el-button class="mt-[20px]" type="primary" link>{{ t('picture') }}</el-button>
                        <div class="w-[90%] mt-[30px]">
                            <div class="item-justify">
                                <div>{{ t('nickname') }}</div>
                                <div>{{ user.userInfo?.nickName }}</div>
                            </div>
                            <div class="item-justify">
                                <div>{{ t('username') }}</div>
                                <div>{{ user.userInfo?.username }}</div>
                            </div>
                            <div class="item-justify">
                                <div>{{ t('phone') }}</div>
                                <div>166****3090</div>
                            </div>
                            <div class="item-justify">
                                <div>{{ t('department') }}</div>
                                <div>技术部门</div>
                            </div>
                            <div class="item-justify">
                                <div>{{ t('email') }}</div>
                                <div>test1234@163.com</div>
                            </div>
                            <div class="item-justify">
                                <div>{{ t('create') }}</div>
                                <div>2022-08-12</div>
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="17">
                <el-card shadow="never">
                    <el-tabs v-model="tabsActive">
                        <el-tab-pane :label="t('basicInfo')" name="base" lazy>
                            <el-form
                                ref="formRef"
                                class="w-[400px]"
                                :model="form"
                                :rules="rules"
                                label-position="top"
                                label-suffix="："
                                require-asterisk-position="right"
                            >
                                <el-form-item prop="username" :label="t('username2')">
                                    <el-input v-model="form.username" :placeholder="$t('input', [t('username2')])" readonly />
                                </el-form-item>
                                <el-form-item prop="nickName" :label="t('nickname2')">
                                    <el-input v-model="form.nickName" :placeholder="$t('input', [t('nickname2')])" clearable />
                                </el-form-item>
                                <el-form-item prop="sex" :label="t('sex')">
                                    <el-radio-group v-model="form.sex">
                                        <el-radio label="男" :value="1" />
                                        <el-radio label="女" :value="2" />
                                        <el-radio label="未知" :value="0" />
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item prop="email" :label="t('email2')">
                                    <el-input v-model="form.email" :placeholder="$t('input', [t('email2')])" clearable />
                                </el-form-item>
                                <el-form-item prop="description" :label="t('personalProfile')">
                                    <el-input v-model="form.description" type="textarea" :placeholder="$t('input', [t('personalProfile')])" clearable />
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit">{{ $t('button.save') }}</el-button>
                                    <el-button @click="onReset">{{ $t("button.reset") }}</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane :label="t('securitySettings')" name="safety" lazy>
                            <el-list class="list-no-padd">
                                <el-list-item>
                                    <el-thing :title="t('pwd')">
                                        <template #description>
                                            <span class="description">{{ t('pwdDesc') }}</span>
                                        </template>
                                    </el-thing>
                                    <template #suffix>
                                        <el-button type="primary" link @click="onEditPwd">{{ $t('button.edit') }}</el-button>
                                    </template>
                                </el-list-item>
                                <el-list-item>
                                    <el-thing :title="t('bindPhone')">
                                        <template #description>
                                            <span class="description">{{ t('bindPhoneDesc') }}：+86 177****3090</span>
                                        </template>
                                    </el-thing>
                                    <template #suffix>
                                        <el-button type="primary" link>{{ $t('button.edit') }}</el-button>
                                    </template>
                                </el-list-item>
                                <el-list-item>
                                    <el-thing :title="t('bindEmail')">
                                        <template #description>
                                            <span class="description">{{ t('bindEmailDesc') }}：test****@163.com</span>
                                        </template>
                                    </el-thing>
                                    <template #suffix>
                                        <el-button type="primary" link>{{ $t('button.edit') }}</el-button>
                                    </template>
                                </el-list-item>
                                <el-list-item>
                                    <el-thing :title="t('destroy')">
                                        <template #description>
                                            <span class="description">{{ t('destroyDesc') }}</span>
                                        </template>
                                    </el-thing>
                                    <template #suffix>
                                        <el-button type="primary" link>{{ t('comfirm') }}</el-button>
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

<i18n lang="yaml">
zh:
  userinfo: 个人信息
  nickname: 用户昵称
  username: 用户账号
  phone: 手机号码
  department: 所属部门
  email: 邮箱地址
  create: 邮箱地址
  basicInfo: 基本资料
  securitySettings: 安全设置
  username2: 用户名
  nickname2: 昵称
  sex: 性别
  email2: 邮箱
  personalProfile: 个人简介
  picture: 修改头像
  pwd: 账户密码
  pwdDesc: 设置密码，帐号更安全
  bindPhone: 绑定手机
  bindPhoneDesc: 已绑定手机
  bindEmail: 绑定邮箱
  bindEmailDesc: 已绑定邮箱
  destroy: 账号注销
  destroyDesc: 该账号将被注销，且不支持找回！
  comfirm: 注销
en:
  userinfo: User information
  nickname: Nickname
  username: Username
  phone: Phone
  department: Department
  email: Email
  create: CreateTime
  basicInfo: BasicInfo
  securitySettings: Security Settings
  username2: username
  nickname2: nickname
  sex: sex
  email2: email
  personalProfile: Personal Profile
  picture: Change profile picture
  pwd: Account password
  pwdDesc: Set password, account security!
  bindPhone: Bind phone
  bindPhoneDesc: Already bound mobile phone
  bindEmail: Bind Email
  bindEmailDesc: Already bound email
  destroy: Account cancellation
  destroyDesc: The account will be cancelled and cannot be retrieved！
  comfirm: Comfirm
</i18n>