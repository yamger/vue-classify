<template>
    <div class="container">
        <!--        <el-form ref="form" :model="form" label-width="80px" class="center">-->
        <!--            <el-form-item label="年数" class="inline">-->
        <!--                <el-input type="text" v-model="form.year"></el-input>-->
        <!--            </el-form-item>-->
        <!--            <el-form-item label="期数" class="inline">-->
        <!--                <el-input type="text" v-model="form.month"></el-input>-->
        <!--            </el-form-item>-->
        <!--            <el-form-item label="分类层级" class="inline">-->
        <!--                <el-input type="text" v-model="form.level"></el-input>-->
        <!--            </el-form-item>-->
        <!--            <el-form-item class="inline">-->
        <!--                <el-button type="primary" @click="getPieData">获取</el-button>-->

        <!--            </el-form-item>-->


        <!--        </el-form>-->
        <div>
            <el-select v-model="selectVal" @change="change">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"

                >

                </el-option>
            </el-select>
        </div>
        <div style="height: 50px;">

            <div style="position: absolute;right: 150px;">

                <span style="margin-right: 15px">降噪</span>
                <el-switch
                        v-model="filter"
                        active-color="#13ce66"
                        inactive-color="#eaeefb"


                ></el-switch>
            </div>
            <div style="position: absolute;right: 150px;margin-top: 30px;">

                <span style="margin-right: 15px">强关联</span>
                <el-switch
                        v-model="strict"
                        active-color="#13ce66"
                        inactive-color="#eaeefb"


                ></el-switch>
            </div>
        </div>
        <div class="chart">

            <h3 style="display: flex;justify-content: center;margin-top: 60px;">期刊分类结果统计图</h3>
            <ve-pie :data="chartData" theme-name="期刊分类结果统计图" height="400px"></ve-pie>

        </div>
    </div>
</template>

<script>
    export default {
        name: "statistic",
        props: ['list', 'filters', 'stricts'],
        data() {
            return {
                chartData: {
                    columns: ['classNum', 'proportion'],
                    rows: this.list

                },
                originRows: this.list,
                form: {
                    month: "",
                    year: "",
                    level: ""
                },
                filter: false,
                strict: false,
                selectVal: this.$route.params['level'],
                options: [
                    {
                        label: "粒度 1",
                        value: 1
                    },
                    {
                        label: "粒度 2",
                        value: 2
                    },
                    {
                        label: "粒度 3",
                        value: 3
                    }, {
                        label: "粒度 4",
                        value: 4
                    }

                ]
            }
        },
        methods: {
            getPieData() {
                this.filter = false;
                this.strict = false;
                this.chartData.rows = [];
                this.originRows = [];
                this.getRequest("/journal/statistic", {
                    year: this.form.year,
                    month: this.form.month,
                    level: this.form.level === "" ? 3 : this.form.level
                }).then(res => {
                    let {data} = res.data;
                    data.forEach(item => {
                        this.originRows.push({
                            classNum: item['classNum'],
                            proportion: item['proportion']
                        });
                    });
                    this.chartData.rows = this.originRows;
                    this.filter = true;
                });
            },
            change(value) {
                this.filter = false;
                this.originRows = [];
                this.getRequest("/journal/detail", {
                    journalName: this.$route.params.journalName,
                    year: this.$route.params.year,
                    month: this.$route.params.month,
                    level: value
                }).then(res => {
                    let {data} = res.data;
                    // console.log(data)
                    data.forEach(item => {
                        this.originRows.push({
                            classNum: item['classNum'],
                            proportion: item['proportion']
                        })
                    });
                    this.chartData.rows = this.originRows;
                    this.filter = true;
                });
            }
        },
        watch: {
            filter(val) {
                if (val) {
                    this.chartData.rows = this.originRows.filter(item => {
                        return item['proportion'] >= 0.025;
                    });
                } else {
                    if (this.strict) {
                        this.strict = false;
                    }
                    this.chartData.rows = this.originRows;
                }
            },
            strict(val) {
                if (val) {
                    if (this.filter === false) {
                        this.filter = true;
                    }
                    this.chartData.rows = this.originRows.filter(item => {
                        return item['proportion'] >= 0.06;
                    });
                } else {
                    if (this.filter) {
                        this.chartData.rows = this.originRows.filter(item => {
                            return item['proportion'] >= 0.025;
                        });
                    } else {

                        this.chartData.rows = this.originRows;
                    }
                }
            },
            filters: {
                immediate: true,
                handler(value) {
                    this.filter = value;
                }
            }
        }
    }
</script>

<style scoped>
    .inline {
        display: inline-block;
        width: 18%;
    }

    .container {
        padding: 10px 120px;
    }

    .chart {
        margin-top: 25px;
        border: 0.1rem solid #BFEFFF;
    }

    .center {
        display: flex;
        justify-content: center;
    }
</style>