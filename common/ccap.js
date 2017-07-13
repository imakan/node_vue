/**
 * 验证码生成器
 */
'use strict'
let express = require('express');
let router = express.Router();
let redis = require('./redis')
let ccap = require('ccap')
let captcha = '';
var ccapConfig = {}
var options = { //验证码配置参数
	width: 180,
	height: 60,
	offset: 40,
	quality: 100,
	fontsize: 50,
}
let _ccap = function (val) {
	if (!val) {
		ccapConfig = {
			generate: function () {//自定义生成随机数
				var str_ary = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; //定义随机数组
				var str_num = 4,
					r_num = str_ary.length,
					text = '';
				for (var i = 0; i < str_num; i++) {
					var pos = Math.floor(Math.random() * r_num)
					text += str_ary[pos];
				}
				return text;
			}
		}
	} else {
		ccapConfig = {
			generate: function () {//直接返回当前值
				return JSON.parse(val);
			}
		}
	}
	ccapConfig = Object.assign(ccapConfig, options);
	return ccapConfig
}
router.get('/:query', function (req, res, next) {
	var imgId = req.params.query;
	var reg = /^\+?[1-9][0-9]*$/;
	if (!reg.test(imgId) || !imgId) { //如果验证码不是正整数 直接返回错误
		console.log('验证码id为空或者不是正整数')
		res.end('');
		return false
	}
	redis.get(imgId, (err, val) => {
		if (err) {
			console.log('redis.get，获取验证码imgId错误：', err)
			return false
		}
		if (!!val) { //redis中存在imgId
			console.log(`redis中存在,imgId:${imgId},val:${val}`)
			captcha = ccap(_ccap(val));
			var _captcha = captcha.get();
			var text = _captcha[0];
			var buffer = _captcha[1];
			res.set('Content-Type', 'image/jpeg');
			res.end(buffer);
		} else {
			console.log('redis中不存在', imgId)
			captcha = ccap(_ccap());
			var _captcha = captcha.get();
			var text = _captcha[0];
			var buffer = _captcha[1];
			redis.set(imgId, text, 3000, (err) => {
				if (err) {
					console.log('redis.set:', err)
				} else {
					console.log(`验证码,imgId:${imgId},text:${text},存储成功`)
					res.set('Content-Type', 'image/jpeg');
					res.end(buffer);
				}
			},1)
		}

	},1)
});


// router.post('/', function (req, res, next) {
// 	var ary = captcha.get();//ary[0] is captcha's text,ary[1] is captcha picture buffer.
// 	var text = ary[0];
// 	var buffer = ary[1];
// 	console.log(text)
// 	console.log(buffer)
// 	res.end(buffer);
// });

module.exports = router
