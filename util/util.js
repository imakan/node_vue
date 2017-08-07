/**
 * Created by makan on 2017/7/21.
 */
var customerConfig = {
	customerName: '鸣鹿运营平台',
	theme1: '#48b0fe',
	theme2: '#2dcdb1'
}
window._failFn = (data) => {
	swal({
		title: customerConfig.customerName,
		text: statuscode['3007'],
		showCancelButton: false,
		confirmButtonColor: customerConfig.theme1,
		closeOnConfirm: true,
		confirmButtonText: "确定"
	});
}

window._statusFn = (data, callback) => {
	if (data.code == 501) {
		swal({
			title: customerConfig.customerName,
			text: statusCode['3008'],
			confirmButtonColor: customerConfig.theme1,
			confirmButtonText: "确定"
		}, function () {
			location.href = "/loginout"
		});
	} else if (data.code == 505) {
		swal({
			title: customerConfig.customerName,
			text: statusCode['3004'],
			confirmButtonColor: customerConfig.theme1,
			confirmButtonText: "确定"
		}, function () {
			location.href = "/loginout"
		});
	} else {
		swal({
			title: customerConfig.customerName,
			text: data.desc,
			showCancelButton: false,
			confirmButtonColor: customerConfig.theme1,
			closeOnConfirm: true
		}, function () {
			if (typeof callback == 'function') {
				callback();
			}
		});
	}
}
