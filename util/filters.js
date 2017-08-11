var filter = {};

/**
 * 自定义过滤器
 */
filter.isArray = (value) => {
	return toString.apply(value) === '[object Array]';
}
filter.format = (fmt,time) => {
	var date = ''
	if(time){
		date = new Date(time)
	}else{
		date = new Date()
	}
	var o = {
		"M+": date.getMonth() + 1, //月份
		"d+": date.getDate(), //日
		"h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
		"H+": date.getHours(), //小时
		"m+": date.getMinutes(), //分
		"s+": date.getSeconds(), //秒
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度
		"S": date.getMilliseconds() //毫秒
	}
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;

}
filter.formatMoney = (value) => {
	if (isNaN(value)) return value;
	return parseFloat(Math.round(value * 100) / 100).toFixed(2)
}

filter.getBaseurl = (value) => {
	var _url = ''
	if (value.indexOf('?') > -1) {
		var _index = value.indexOf('?')
		_url = value.substr(0, _index)
		return _url
	}
	_url = value;
	return _url

}

filter.subStringLen = (str, len) => {
	var newLength = 0;
	var newStr = "";
	var chineseRegex = /[^\x00-\xff]/g;
	var singleChar = "";
	var strLength = str.replace(chineseRegex, "**").length;
	for (var i = 0; i < strLength; i++) {
		singleChar = str.charAt(i).toString();
		if (singleChar.match(chineseRegex) != null) {
			newLength += 2;
		} else {
			newLength++;
		}
		if (newLength > len) {
			break;
		}
		newStr += singleChar;
	}
	if (strLength > len) {
		newStr += "...";
	}
	return newStr;
}

filter.uniqueStr = (str, arr) => {
	console.log(str)
	if (!arr.length) return str
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == str) {
			return ''
			break;
		}
	}
	return str;
}
filter.isEmojiCharacter = (substring) => {
	if (!substring) {
		return false
	}
	for (var i = 0; i < substring.length; i++) {
		var hs = substring.charCodeAt(i);
		if (0xd800 <= hs && hs <= 0xdbff) {
			if (substring.length > 1) {
				var ls = substring.charCodeAt(i + 1);
				var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
				if (0x1d000 <= uc && uc <= 0x1f77f) {
					return true;
				}
			}
		} else if (substring.length > 1) {
			var ls = substring.charCodeAt(i + 1);
			if (ls == 0x20e3) {
				return true;
			}
		} else {
			if (0x2100 <= hs && hs <= 0x27ff) {
				return true;
			} else if (0x2B05 <= hs && hs <= 0x2b07) {
				return true;
			} else if (0x2934 <= hs && hs <= 0x2935) {
				return true;
			} else if (0x3297 <= hs && hs <= 0x3299) {
				return true;
			} else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
				|| hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
				|| hs == 0x2b50) {
				return true;
			}
		}
	}
}


filter.loadImg = (imgKey) => {
	if (!imgKey) {
		return require('../static/image/1.jpg')
	}
	var Img = new Image();
	Img.src = imgKey;
	Img.onload = function () {
		return imgKey;
	};
	Img.onerror = function () {
		return require('../static/image/1.jpg')
	}

}

filter.http = (url) => {
	var flag   = url.startsWith('http://') || url.startsWith('https://')
	if(flag){
		return url
	}else{
		return 'http://'+url
	}

}

(function (name, definition) {
	//检测上下文是否为AMD 或者 CMD;
	var hasDefine = typeof define === 'function';
	//检测上下文是否为node
	var hasExports = typeof module !== 'undefined' && module.exports;
	if (hasDefine) {
		//AMD环境或者是CMD环境
		define(definition)
	} else if (hasExports) {
		//定义为普通Node模块
		module.exports = definition();
	} else {
		//将模块的执行结果挂载window变量中，在浏览器中this指向window对象
		this[name] = definition()
	}
})('filter', function () {
	return filter
})


