<template>
    <div>
        <el-row class="header-wrapper">
            <el-col :span="8" :offset="8" class="wrapper">
                <el-header>
                    <div>
                        <h2 class="header">欢迎登陆期刊搜索系统</h2>
                    </div>
                </el-header>
            </el-col>
        </el-row>

        <el-row class="main-wrapper">
            <el-col :span="6" :offset="9">
                <el-card shadow="always">
                    <el-form :model="loginForm">
                        <el-form-item label="用户名">
                            <el-input
                                    v-model="loginForm.username"
                                    placeholder="请输入用户名"
                                    maxlength="16"
                                    minlength="6"
                            ></el-input>
                        </el-form-item>

                        <el-form-item label="密码">
                            <el-input
                                    v-model="loginForm.password"
                                    placeholder="输入密码"
                                    type="password"
                                    show-password
                                    maxlength="16"
                                    minlength="6"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="验证码">
                            <el-alert
                                    title="验证码错误"
                                    type="error"
                                    v-show="error"
                                    @close="onAlertClose"
                            ></el-alert>
                            <el-input type="text" v-model="loginForm.captcha" placeholder="输入验证码" minlength="5"
                                      maxlength="5"></el-input>
                            <img @click="getCaptcha" :src="captcha" alt="验证码"
                                 style="width: 100px;height: 30px;padding-top: 10px"/>
                            <!--                            <el-button type="primary" @click="getCaptcha">刷新</el-button>-->
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit" @keyup.enter="onSubmit">登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>

        <div class="footer">
            <ul class="ul-class">
                <li class="li-class">
                    <el-link type="primary" href="mailto://534443403@qq.com">联系我</el-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    const md5 = require('js-md5');
    export default {
        name: "login",
        data() {
            return {
                loginForm: {
                    username: "",
                    password: "",
                    keepAlive: true,
                    captcha: ""
                },
                captcha: "",
                captchaCode: 0,
                error: false
            }
                ;
        },
        methods: {
            checkCaptcha() {
                return this.loginForm.captcha === this.captchaCode;
            },
            onSubmit() {
                if (!this.checkCaptcha()) {
                    this.error = true;
                    this.getCaptcha();
                    return;
                }
                let transferData = Object.assign({}, this.loginForm);
                transferData.password = md5(transferData.password);
                this.postKeyValueRequest("/login", transferData).then(resp => {
                    if (resp.data.status === 301) {

                        //登陆成功，跳转页面
                        this.$store.commit('set_token', {
                            token: resp.data.data['_token']
                        });
                        console.log(this.$store.state);
                        console.log(this.$store);
                        this.$router.replace("/home/").then(() => {
                            this.storageSet("token", resp.data.data['_token']);
                        });
                    }
                });
            },
            getCaptcha() {
                this.getRequest("/basic/getCaptcha").then(res => {
                    this.captcha = res.data.data['base64'];
                    this.captchaCode = res.data.data['code'];
                }).catch(reason => {
                    console.log(reason);
                })
            },
            onAlertClose() {
                this.error = false;
                this.loginForm.captcha = "";
            }
        },
        created() {

            if (this.storageGet("token") != null) {
                this.$router.push({
                    name: "home"
                })
            }


            this.getCaptcha();

        }
    };
</script>
<style scoped>
    .header {
        text-align: center;
    }

    .header-wrapper {
        height: 150px;
        display: flex;
        align-items: center;
        margin-bottom: 50px;
    }

    .main-wrapper {
        margin-bottom: 150px;
    }

    .ul-class {
        display: flex;
        justify-content: center;
    }

    .li-class {
        display: list-item;
        margin-right: 15px;
        list-style: none;
    }
</style>
