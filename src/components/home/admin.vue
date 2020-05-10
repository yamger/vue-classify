<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
<!--            <el-tab-pane label="数据审查" name="first">-->

<!--                    <statistic/>-->

<!--            </el-tab-pane>-->
            <el-tab-pane label="数据上传" name="first">

                <upload/>
            </el-tab-pane>

<!--            <el-tab-pane label="用户管理" name="second">-->
<!--                <user/>-->
<!--            </el-tab-pane>-->
        </el-tabs>
    </div>
</template>


<script>
    export default {
        name: "admin",
        data() {
            return {
                activeName: 'first'
            };
        },
        components: {
            // User: () => import("../admin/user"),
            Upload: () => import('../admin/upload'),
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style scoped>


</style>

<!--
    todo: 管理页面
        - 文件上传
        - 用户管理
        - 期刊管理
            - 增删改查





-->