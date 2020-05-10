<template>
    <div>
        <el-table :data="getList" v-loading="getLoading" stripe header-align="center">
            <el-table-column prop="journalName" label="期刊名称" align="center"></el-table-column>
            <el-table-column prop="publishMonth" label="期数" align="center"></el-table-column>
            <el-table-column prop="publishYear" label="发布年" align="center"></el-table-column>
            <!--            <el-table-column prop="classNum" label="分类号" align="center"></el-table-column>-->
            <!--            <el-table-column prop="proportion" label="占比" align="center"></el-table-column>-->
            <el-table-column prop="level" label="层级" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" @click="detail(scope)">详情</el-button>
                    <!--                    <router-link :to="{name: 'journal-info'}" tag="el-link" class="el-link el-link&#45;&#45;primary is-underline">详情</router-link>-->
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :hide-on-single-page="hideOnSinglePage" small layout="prev,pager,next"
                       :total="Total"
                       :page-size="pageSize"
                       @current-change="currentChange"
                       style="margin-left: 50px;"
        ></el-pagination>
    </div>
</template>
<script>
    export default {
        name: "resultList",
        props: [],
        data() {

            return {
                resList: [],
                Total: 0,
                hideOnSinglePage: true,
                currentPage: 1,
                pageSize: 15,
                listLoading: false,
                subjectName: null,
                startYear: null,
                startMonth: null,
                endYear: null,
                endMonth: null
            };
        },
        methods: {
            search(subjectName, startYear, startMonth, endYear, endMonth, level) {
                this.subjectName = subjectName === null ? null : subjectName[0];
                this.startYear = startYear;
                this.startMonth = startMonth;
                this.endYear = endYear;
                this.endMonth = endMonth;
                this.resList = [];
                this.listLoading = true;
                this.getRequest("/journal/list", {
                    subjectName: subjectName === null ? null : subjectName[0],
                    startYear,
                    startMonth,
                    endYear,
                    endMonth,
                    level
                }).then(res => {
                    let {data} = res.data;

                    this.resList = data["records"];
                    this.Total = data["total"];
                    this.listLoading = false;
                }).catch(err => {
                    this.listLoading = false;
                    console.log(err);
                })
            },
            getDefaultList() {
                this.listLoading = true;

                this.getRequest('/journal', {
                    page: this.currentPage,
                    size: this.pageSize
                }).then(res => {
                    let {data} = res.data;
                    this.resList = res.data.data['records'];
                    this.Total = data['total'];

                    this.listLoading = false;

                }).catch(err => {
                    this.listLoading = false;
                    console.log(err);
                });
            },
            currentChange(val) {
                this.listLoading = true;
                this.getRequest("/journal/query", {
                    subjectName: this.subjectName === null ? null : this.subjectName[0],
                    startYear: this.startYear,
                    startMonth: this.startMonth,
                    endYear: this.endYear,
                    endMonth: this.endMonth,
                    currentPage: val
                }).then(res => {
                    let {data} = res.data;

                    this.resList = data["records"];
                    this.Total = data["total"];
                    this.listLoading = false;
                }).catch(err => {
                    this.listLoading = false;
                    console.log(err);
                })

            },
            detail(scope) {
                let {row} = scope;
                this.$router.push({
                    name: 'journal-info',
                    params: {
                        journalName: row['journalName'],
                        year: row['publishYear'],
                        month: row['publishMonth'],
                        level: row['level']
                    }
                })
            }
        },
        computed: {
            getList() {
                return this.resList;
            },
            getLoading() {
                return this.listLoading;
            },
        },
        created() {
            // this.getDefaultList();
        }
    };
</script>
<style scoped>
</style>