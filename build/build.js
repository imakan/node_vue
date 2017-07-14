process.env.NODE_ENV = 'production'
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')
console.log("启动服务,要先启动服务哦，获取ip，判断环境")
var spinner = ora('开始构建项目...')
spinner.start()
webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')
})
