'use strict'
process.env.NODE_ENV = '"development"';
let webpack = require('webpack')
let app = require('../app');
let webpackConfig = require('./webpack.dev.conf')
var debug = require('debug');
let compiler = webpack(webpackConfig)
let serverConfig = require('../serverConfig/config.global')
let port = normalizePort(process.env.PORT || serverConfig.port);
let devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
})
let hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {
    }
})
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({action: 'reload'})
        cb()
    })
})
app.use(devMiddleware)
app.use(hotMiddleware)
console.log('启动测试服务器...')
let server = app.listen(port)
server.on('error', onError);
server.on('listening', onListening);
function normalizePort(val) {
    let port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' 哎呦，需要提升权限');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' 哎呦，端口已经被占用了，去看看谁用的');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
module.exports = {
    close: () => {
        server.close()
    }
}
