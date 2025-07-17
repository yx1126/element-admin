<script setup lang="ts">
import { cloneDeep } from "lodash-es";
import { userUpdate } from "@/api/system/user";
import { uploadAvatar } from "@/api/upload";
import type { FormRules, UploadRawFile } from "element-plus";
import type { UserInfo } from "#/system";

defineOptions({
    name: "Person",
});

type TabsName = "base" | "safety";

const msgbox = useMessageBox();
const user = useUserStore();
const { ti, t, $t } = useLocal();
const pwdMitt = useMitt("updatePwd");
const formRef = useTemplateRef("formRef");

const loading = ref(false);
const tabsActive = ref<TabsName>("base");
const form = ref(cloneDeep(user.userInfo!));

const rules: FormRules = {
    userName: Require(() => ti("username2")),
    nickName: Require(() => ti("nickname2")),
    sex: Require(() => ti("sex"), "change"),
    // email: Require(() => ti("email2")),
};

function onSubmit() {
    formRef.value?.validate(async valid => {
        if(valid) {
            updateUser($t("button.save"), form.value);
        }
    });
}

async function onBeforeUpload(rawFile: UploadRawFile) {
    try {
        loading.value = true;
        const res = await uploadAvatar({
            file: rawFile,
        });
        await userUpdate({
            ...form.value,
            avatar: res.data.path,
        });
        user.initUserInfo();
    } finally {
        loading.value = false;
    }
    // console.log(res);
    return Promise.reject(false);
}

function onReset() {
    formRef.value?.resetFields();
}

function onEditPwd() {
    pwdMitt.emit();
}

function onRemoveAvatar() {
    updateUser(t("deleteAvatar"), {
        ...form.value,
        avatar: "",
    });
}

function updateUser(value: string, form: UserInfo) {
    msgbox.confirm($t("button.sure", [value]), {
        beforeClose: async (action, instance, done) => {
            if(action === "confirm") {
                try {
                    instance.confirmButtonLoading = true;
                    await userUpdate(form);
                    done();
                } finally {
                    instance.confirmButtonLoading = false;
                }
                return;
            }
            done();
        },
    }).then(() => {
        user.initUserInfo();
    });
}
</script>

<template>
    <div class="person">
        <el-row :gutter="12">
            <el-col :span="7">
                <el-card :header="t('userinfo')" shadow="never">
                    <div class="userinfo">
                        <div v-loading="loading" class="avatar">
                            <el-avatar :size="120" :src="user.getUserAvatar()" />
                            <div class="avatar-action">
                                <el-upload
                                    action="#"
                                    :limit="1"
                                    :before-upload="onBeforeUpload"
                                    :show-file-list="false"
                                >
                                    <Icon icon="EleEdit" size="20" color="#fff" />
                                </el-upload>
                                <Icon icon="EleDelete" size="20" cursor color="#fff" @click="onRemoveAvatar" />
                            </div>
                        </div>
                        <div class="w-[90%] mt-[30px]">
                            <div class="item-justify">
                                <div>{{ t('nickname') }}</div>
                                <div>{{ user.userInfo?.nickName }}</div>
                            </div>
                            <div class="item-justify">
                                <div>{{ t('username') }}</div>
                                <div>{{ user.userInfo?.userName }}</div>
                            </div>
                            <div class="item-justify">
                                <div>{{ t('phone') }}</div>
                                <div>{{ user.userInfo?.phone }}</div>
                            </div>
                            <div class="item-justify">
                                <div>{{ t('department') }}</div>
                                <div>技术部门</div>
                            </div>
                            <div class="item-justify">
                                <div>{{ t('email') }}</div>
                                <div>{{ user.userInfo?.email }}</div>
                            </div>
                            <div class="item-justify">
                                <div>{{ t('create') }}</div>
                                <div>{{ user.userInfo?.createdAt?.split(" ").at(0) }}</div>
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
                                <el-form-item prop="userName" :label="t('username2')">
                                    <el-input v-model="form.userName" :placeholder="$t('input', [t('username2')])" readonly />
                                </el-form-item>
                                <el-form-item prop="nickName" :label="t('nickname2')">
                                    <el-input v-model="form.nickName" :placeholder="$t('input', [t('nickname2')])" />
                                </el-form-item>
                                <el-form-item prop="sex" :label="t('sex')">
                                    <el-radio-group v-model="form.sex">
                                        <el-radio value="2">{{ t('sex-unknow') }}</el-radio>
                                        <el-radio value="0">{{ t('sex-0') }}</el-radio>
                                        <el-radio value="1">{{ t('sex-1') }}</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item prop="email" :label="t('email2')">
                                    <el-input v-model="form.email" :placeholder="$t('input', [t('email2')])" />
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit">{{ $t('button.save') }}</el-button>
                                    <el-button @click="onReset">{{ $t("button.reset") }}</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane :label="t('securitySettings')" name="safety" lazy>
                            <el-list>
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
                                            <span class="description">{{ t('bindPhoneDesc') }}：+86 {{ user.userInfo?.phone }}</span>
                                        </template>
                                    </el-thing>
                                    <template #suffix>
                                        <el-button type="primary" link>{{ $t('button.edit') }}</el-button>
                                    </template>
                                </el-list-item>
                                <el-list-item>
                                    <el-thing :title="t('bindEmail')">
                                        <template #description>
                                            <span class="description">{{ t('bindEmailDesc') }}：{{ user.userInfo?.email }}</span>
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
            & + .item-justify {
                margin-top: 10px;
            }
            & > div:first-child::after {
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
        .avatar {
            position: relative;
            overflow: hidden;
            width: 120px;
            height: 120px;
            &:hover {
                .avatar-action {
                    opacity: 1;
                }
            }
            &-action {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                background-color: var(--el-overlay-color-lighter);
                gap: 10px;
                transition: opacity var(--el-transition-duration);
                opacity: 0;
                & > div {
                    height: 20px;
                }
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
  create: 创建日期
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
  sex-unknow: 未知
  sex-0: 男
  sex-1: 女
  deleteAvatar: 删除头像
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
  sex-unknow: unknow
  sex-0: male
  sex-1: female
  deleteAvatar: delete avatar
</i18n>