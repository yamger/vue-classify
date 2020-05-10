<template>
    <div>
        <div>
            <el-form :model="searchForm">


                <el-form-item label="选择学科" class="inline">

                    <el-cascader
                            v-model="searchForm.subject"
                            :options="searchForm.options">

                    </el-cascader>
                </el-form-item>
                <el-form-item label="开始日期" class="inline">
                    <el-date-picker
                            v-model="searchForm.startDate"
                            type="month"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期" class="inline">
                    <el-date-picker
                            v-model="searchForm.endDate"
                            type="month"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="筛查等级" class="inline">
                    <el-select v-model="level" placeholder="请选择筛查等级，默认3">
                        <el-option
                                v-for="item in levelOptions"
                                :key="item.key"
                                :label="item.label"
                                :value="item.value"

                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="inline">

                    <el-button type="primary" @click="submit">搜索</el-button>
                </el-form-item>
            </el-form>

        </div>
        <div class="result">
            <result-list ref="resList"></result-list>
        </div>
    </div>
</template>

<script>
    export default {
        name: "search",
        components: {
            ResultList: () => import("./resultList")

        },
        data() {
            const _this = this;
            return {
                value: "",
                options: [],
                props: {
                    lazy: true,
                    lazyLoad(node, resolve) {
                        const {value} = node;
                        _this.getRequest(`/category/getbyid`,
                            {
                                id: value
                            }
                        ).then(({data}) => {
                            resolve(data.data.map(item => {
                                return {
                                    label: item["classNum"] + " " + item["className"],
                                    value: item["id"],
                                    hasChildren: item["isParent"],
                                    leaf: !item["isParent"]
                                }
                            }))
                        })

                    }
                },
                searchForm: {
                    startDate: null,
                    endDate: null,
                    subject: null,
                    options: []
                },
                level: 3,
                levelOptions: [
                    {
                        key: 0,
                        label: "等级 1",
                        value: 1
                    },
                    {
                        key: 1,
                        label: "等级 2",
                        value: 2
                    },
                    {
                        key: 2,
                        label: "等级 3",
                        value: 3
                    },
                    {
                        key: 3,
                        label: "等级 4",
                        value: 4
                    }
                ]
            };
        },
        methods: {
            getDefaultList() {
                this.$refs.resList.getDefaultList(this.searchForm.subject);
            },
            submit() {
                let startYear = null;
                let startMonth = null;
                if (this.searchForm.startDate != null) {

                    startYear = this.searchForm.startDate.getFullYear();
                    startMonth = this.searchForm.startDate.getMonth() + 1;
                }
                let endYear = null;
                let endMonth = null;
                if (this.searchForm.endDate != null) {

                    endYear = this.searchForm.endDate.getFullYear();
                    endMonth = this.searchForm.endDate.getMonth() + 1;
                }
                this.$refs.resList.search(this.searchForm.subject, startYear, startMonth, endYear, endMonth, this.level);
            },
            getOptions() {
                this.getRequest("/category").then(res => {
                    this.options = res.data.data.map(item => {
                        return {
                            label: item["classNum"] + " " + item["className"],
                            value: item["id"],
                            hasChildren: item["isParent"],
                            isLeaf: !item["isParent"]

                        }
                    });
                }).catch(err => {
                    console.log(err)
                });
            },
            getSubjects() {
                this.getRequest("/subject").then(res => {
                    let {data} = res.data;
                    this.searchForm.options = data.map(item => {
                        return {
                            label: item["subjectName"],
                            value: item["subjectName"]
                        }
                    });
                })
            }

        },
        created() {
            this.getSubjects();
            // this.getOptions();
        },
        mounted() {
            setTimeout(
                () => {
                    this.submit();
                }, 100
            );
        }
    }
</script>

<style scoped>
    .inline {
        display: inline-block;
        width: 25%;
    }
</style>