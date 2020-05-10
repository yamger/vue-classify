<template>
    <div class="container">


        <div>
            <el-upload
                    drag
                    action=""

                    :file-list="fileList"
                    :auto-upload="false"
                    accept=".xls,.xlsx"
                    :multiple="true"
                    :http-request="httpRequest"
                    :on-change="onChange"
                    :on-success="onSuccess"
                    :on-remove="onRemove"
                    ref="upload"
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击选择文件</em></div>
                <div class="el-upload__tip" slot="tip">只能上传excel文件</div>

            </el-upload>
            <el-button type="primary" @click="submit" style="margin-top: 1rem">点击上传</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "upload", data() {
            return {
                headers: {
                    "Authorization": this.$store.getters.getToken
                },
                fileList: []
            }
        },
        methods: {
            onbeforeunload: function (file) {
                let formData = new FormData();
                formData.append("file", file);
                this.postRequest("/upload", formData
                ).then(res => {
                    if (res.data.status === 200) {
                        this.$notify({
                            title: "结果通知",
                            position: "top-right",
                            type: "success",
                            message: "文件已上传至服务器，请等待数据处理。"
                        })
                    }

                })
            },
            submit() {
                let formData = new FormData();
                const data = this.fileList;
                data.forEach(item => {

                    formData.append("files", item.raw);
                })
                this.postRequest("/upload", formData
                ).then(res => {
                    if (res.data.status === 200) {
                        this.$notify({
                            title: "结果通知",
                            position: "top-right",
                            type: "success",
                            message: "文件已上传至服务器，请等待数据处理。"
                        })
                    }

                })
                // this.$refs.upload.submit();
            },
            httpRequest() {
                let formData = new FormData();
                const data = this.fileList;
                data.forEach(item => {

                    formData.append("files", item);
                })
                this.postRequest("/upload", formData
                ).then(res => {
                    if (res.data.status === 200) {
                        this.$notify({
                            title: "结果通知",
                            position: "top-right",
                            type: "success",
                            message: "文件已上传至服务器，请等待数据处理。"
                        })
                    } else if (res.data.data !== 0) {

                        this.$notify({
                            title: "结果通知",
                            position: "top-right",
                            type: "error",
                            message: "文件上传失败，请重试"
                        })

                    }

                })
            },
            onChange(file, fileList) {
                this.fileList = fileList;
            },
            onSuccess(res) {
                if (res.data.status === 200) {
                    this.$notify({
                        title: "结果通知",
                        position: "top-right",
                        type: "success",
                        message: "文件已上传至服务器，请等待数据处理。"
                    })
                } else {
                    this.$notify({
                        title: "结果通知",
                        position: "top-right",
                        type: "error",
                        message: "文件上传失败，请重试"
                    })
                }
            },
            onRemove(file, fileList) {
                this.fileList = fileList;
            }
        }
    }
</script>

<style scoped>
    .container {
        display: flex;
        justify-content: center;
    }
</style>