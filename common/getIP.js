/**
 * Created by makan on 2017/4/24.
 */
var interfaces = require('os').networkInterfaces();
/**
 * 预设服务器类型
 * 1、线网环境
 * 2、测试环境
 * 3、本地环境或者其他环境
 *
 */
var ServerType = ''
Array.prototype.contains = function ( needle ) {
	for (var i in this) {
		if (this[i] == needle) return true;
		break;
	}
}
//判断用户ip（内网ip）
function getIPAdress() {
	this.online = [ '10.30.61.121','10.30.61.107']
	this.dev = [ '10.10.220.130']
}
getIPAdress.prototype.getIp = function () {
	for (var devName in interfaces) {
		var iface = interfaces[devName];
		for (var i = 0; i < iface.length; i++) {
			var alias = iface[i];
			if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
				return alias.address;
			}
		}
	}
}
getIPAdress.prototype.ServerType = function () {
	if(this.online.contains(this.getIp())){ //线网环境
		ServerType = 1
	}else if(this.dev.contains(this.getIp())){ //测试环境
		ServerType = 2
	}else{ //其他环境
		ServerType = 3
	}
	return ServerType
}

var _getIPAdress = new getIPAdress()
console.log(`本机ip====${_getIPAdress.getIp()}`)
module.exports = _getIPAdress.ServerType()
