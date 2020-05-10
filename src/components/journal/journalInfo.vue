<template>
    <div>
        <i class="el-icon-arrow-left" @click="back">返回</i>
        <div style="margin-top: 12px;">
            <el-card>
                <div slot="header">
                    <span>期刊信息</span>
                </div>
                <div style="padding: 0 2rem;">
                    <div class="inline" v-for="item in baseInfo" :key="item.label">
                        <label>{{item.label}}</label>
                        <p>{{item.value}}</p>

                    </div>
                </div>
                <div>
                    <statistic ref="stat" :list="originRows" :filters="filters" :stricts="stricts"/>
                </div>
            </el-card>
        </div>

    </div>
</template>

<script>
    import Statistic from '../admin/statistic'

    export default {
        name: "journalInfo",
        data() {
            return {
                chartData: {
                    columns: ['classNum', 'proportion'],
                    rows: [
                        {
                            classNum: 1,
                            proportion: 1
                        }
                    ]
                },
                originRows: [],
                baseInfo: [
                    {
                        label: '期刊名',
                        value: this.$route.params.journalName
                    }
                ],
                filters: false,
                stricts: false
            }
        },
        components: {
            Statistic
        },
        methods: {
            back() {
                this.$router.back();
            },
            getJournalDetail() {
                this.getRequest("/journal/detail", {
                    journalName: this.$route.params.journalName,
                    year: this.$route.params.year,
                    month: this.$route.params.month,
                    level: this.$route.params.level
                }).then(res => {
                    let {data} = res.data;
                    data.forEach(item => {
                        this.originRows.push({
                            classNum: item['classNum'],
                            proportion: item['proportion']
                        });
                    });
                    this.filters = true;
                });
            }
        },
        created() {
            this.getJournalDetail();

        }
    }
</script>

<style scoped>
    .inline p {
        display: inline-block;
    }

    .inline label {
        margin-right: 1rem;
    }
</style>