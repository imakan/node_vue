'use strict'
let ServerType = require('../common/getIP') //服务器类型
let path = require('path')
let projectName = path.basename(path.dirname(__dirname))
let domain = '';
let apiUrl = '';
let uploadUrl = '';
let redisConfig = {};
let mysqlConfig = {};
let mailConfig = {};
var _config = function (index) {
	if(index == 1){
		domain = '';
		apiUrl = '';
		uploadUrl = '';
		redisConfig = {   //redis 配置参数
			host: '',
			password:'',
			port: ''
		};
		mysqlConfig = {
			host:'',
			user:'',
			password:'',
			port:'',
			database:'',
		};
		mailConfig = {
			host: "smtp.qq.com", // 主机
			secure: true, // secure:true for port 465, secure:false for port 587
			port: 465, // SMTP 端口
			auth: {
				user: "1368204755@qq.com", // 账号
				pass: "nabuamduppqsfigi" // 密码
			}
		}
	}else{
		domain = '';
		apiUrl = '';
		uploadUrl = '';
		redisConfig = {   //redis 配置参数
			host: '',
			password:'',
			port: ''
		};
		mysqlConfig = {
			host:'',
			user:'',
			password:'',
			port:'',
			database:'',
		};
		mailConfig = {
			host: "smtp.qq.com", // 主机
			secure: true, // secure:true for port 465, secure:false for port 587
			port: 465, // SMTP 端口
			auth: {
				user: "1368204755@qq.com", // 账号
				pass: "nabuamduppqsfigi" // 密码
			}
		}
	}
}
switch (ServerType) {
	case 1:  //线网环境
		_config(1)
		break;
	case 2: //测试环境
		_config(2)
		break;
	case 3: //其他环境
		_config(1)
		break;
	default:
		try {
			throw '服务器类型错误'
		}
		catch (err) {
			conole.log('服务器类型错误')
		}
		break;
}
module.exports = {
	projectName: '项目成名',
	localhost:'127.0.0.1',
	domain:domain,
	ServerType:ServerType,
	port: "13007",
	cookie: {
		cookie_secret: projectName + 'cookie$secret*Key#2017',//cookie密匙
		path: '/',
		domain:domain,
		httponly:true
	},
	host:{
		apiUrl:apiUrl,
		uploadUrl:uploadUrl,
	},
	mysqlConfig:mysqlConfig,
	redisConfig:redisConfig,
	session_secret: '', // session密匙
	mailConfig:mailConfig
}
