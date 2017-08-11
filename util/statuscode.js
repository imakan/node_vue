;(function (name,definition) {
	//检测上下文是否为AMD 或者 CMD;
	var hasDefine = typeof define === 'function';
	//检测上下文是否为node
	var hasExports = typeof module !== 'undefined' && module.exports;
	if(hasDefine){
		//AMD环境或者是CMD环境
		define(definition)
	}else if(hasExports){
		//定义为普通Node模块
		module.exports = definition();
	}else{
		//将模块的执行结果挂载window变量中，在浏览器中this指向window对象
		this[name] = definition()
	}
})('statuscode',function () {
	return {
		"3000": "鸣鹿运营管理后台",
		"3001": "操作成功",
		"3002": "操作失败",
		"3003": "登录超时，请重新登录",
		"3004": "当前账户登录异常，请重新登录",
		"3005": "图片超出限制，请重新上传",
		"3006": "文件超出限制，请重新上传",
		"3007": "哎呀，出问题了，请再来一次",
		"3008": "当前账号已在其它设备上登录，请及时修改您的密码",
		"3009": "用户名含有非法字符",
		"3010": "登录密码不能为空",
		"3011": "用户名密码不正确"
	}
})