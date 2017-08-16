'use strict'
let path = require('path');
let fs = require('fs');
let express = require('express');
let formidable = require('formidable');
require('shelljs/global');
let router = express.Router();
let request = require('request');
let serverConfig = require('../serverConfig/config.global');
let logs = require('../logConfig/logs').logger('http');
/**
 * 上传逻辑
 */
//接收文件
function acceptFiles(req, path) {
	let form = new formidable.IncomingForm();
	form.encoding = 'utf-8';
	form.uploadDir = path;
	form.keepExtensions = true;	 //保留后缀
	form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
	return new Promise((resolve, reject) => {
		form.parse(req, function (err, fields, files) {
			if (err) {
				reject(err)
			}
			resolve(files)
		});
	})
}
//发送到其他服务器
function sendFile(file,type) {
	let formData = {
		my_field:file,
		my_buffer:new Buffer(10),
		Filedata:fs.createReadStream(file)
	};
	let url = ''
	switch (type){
		case '1':
			url = serverConfig.host.uploadUrl+'/system/uploadFile'
			break;
		case '2':
			url = serverConfig.host.uploadUrl+'/system/upload'
			break;
		default:
			url = ''
	}
	return new Promise((resolve, reject) => {
		var options = {
			url: url,
			formData: formData
		}
		request.post(options,function(err, res, body){
			if (err) reject(err);
			resolve(body);
		})
	})
}




router.post('/uploaderFile/:type', function (req, res, next) {
	var type = req.params.type; //上传类型 1.表示上传文件，2.表示上传图片
	mkdir('-p', './userAvatar/')
	acceptFiles(req, './userAvatar/').then(
		(files) => {
			return Promise.all([sendFile(files.file.path,type)]);
		},
		(err) => {
			logs.info('接收文件报错')
		}).then(
		(body) => {
			rm('-rf', './userAvatar/*');
			logs.info(body)
			var data = JSON.parse(body[0])
			if(data.result){
				return res.json({
					code: 200,
					url:JSON.parse(body[0]).title,
					message: '上传成功'
				});
			}else{
				return res.json({
					code: 400,
					desc:data.failDesc,
					message: '上传失败'
				});
			}

		},
		(err) => {
			rm('-rf', './userAvatar/*');
			logs.info(`发生错误`)
			logs.info(err)
			return res.json({
				code: 400,
				desc:err,
				message: '上传失败'
			});
		}).catch(err=>res.send(err));
});
module.exports = router;