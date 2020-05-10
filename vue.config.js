module.exports = {
    //配置跨域请求
    devServer: {
        open: true,    //是否自动打开浏览器
        port: 8000,

        // proxy: 'http://localhost:8080'
        proxy: { // 配置跨域

            '/api': {
                target: 'http://192.168.0.104:8080',
                changeOrigin: true,    //是否开启代理
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        before: app => {
        }
    },
};
