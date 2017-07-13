var filter = {};

/**
 * 自定义过滤器
 */
filter.isArray = (value) => {
	return toString.apply(value) === '[object Array]';
}
filter.format = (fmt) => {
	var date = new Date()
	var o = {
		"M+" : date.getMonth()+1, //月份
		"d+" : date.getDate(), //日
		"h+" : date.getHours()%12 == 0 ? 12 : date.getHours()%12, //小时
		"H+" : date.getHours(), //小时
		"m+" : date.getMinutes(), //分
		"s+" : date.getSeconds(), //秒
		"q+" : Math.floor((date.getMonth()+3)/3), //季度
		"S" : date.getMilliseconds() //毫秒
	}
	if(/(y+)/.test(fmt)) fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;

}
filter.formatMoney = (value) => {
	if(isNaN(value)) return value;
	return parseFloat(Math.round(value*100)/100).toFixed(2)
}


module.exports = filter
