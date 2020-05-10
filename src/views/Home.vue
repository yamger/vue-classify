<template>
    <div>
        <el-header>
            <el-menu :default-active="default_active" class="el-menu-demo" mode="horizontal" @select="select">
                <el-menu-item index="1">
                    <router-link to="/home/search">数据搜索</router-link>
                </el-menu-item>
                <el-menu-item index="2">
                    <router-link to="/home/admin">后台管理</router-link>

                </el-menu-item>
                <el-menu-item class="right">
                    <el-dropdown>
                          <span class="el-dropdown-link">
                            设置<i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <a @click="quit">退出</a>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-menu-item>
            </el-menu>

        </el-header>
        <el-container>
            <el-main class="main">
                <keep-alive >

                    <router-view v-if="this.$route.meta.keepAlive"></router-view>
                </keep-alive>
                <router-view v-if="!this.$route.meta.keepAlive"></router-view>
            </el-main>
        </el-container>
        <el-footer class="footer">
            <ul class="ul-class">
                <li class="li-class">
                    <el-link type="primary" href="mailto://534443403@qq.com">联系我</el-link>
                </li>
            </ul>
        </el-footer>
    </div>
</template>
<script>
    export default {
        name: "home",
        data() {
            return {
                default_active: "1"
            }
        },
        methods: {
            quit() {
                console.log("quit login")
                this.storageRemove("token");
                this.$router.push({
                    name: "login"
                })
            },
            select(index) {
                this.default_active = index;
            }
        }
    };
</script>
<style scoped>

    .main {
        padding-right: 20px;
    }

    .footer {
        display: flex;
        justify-content: center;
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

    .right {
        position: absolute;
        right: 1.5rem;
    }
</style>
