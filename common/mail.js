'use strict'
const mailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const config = require('../serverConfig/config.global');
const util = require('util');
const transport = mailer.createTransport(smtpTransport(config.mailConfig));
//域名domain没有的时留空
const SITE_ROOT_URL = 'http://' + (config.ServerType === 1 ?  config.domain : (config.localhost + ":" + config.port));

/**
 * 邮件发送
 * @param {Object} data 邮件对象
 */
function sendMail(mailOptions) {
	transport.sendMail(mailOptions, function (err, response) {
		if (err) {
			// 写为日志
			console.error(err);
		} else {
			console.log(response);
		}
		transport.close(); // 如果没用，关闭连接池
	});
}

/**
 * 发送激活通知邮件
 * @param {String} who 接收人的邮件地址
 * @param {String} token 重置用的token字符串
 * @param {String} name 接收人的用户名
 */
function sendActiveMail(who, token, name) {
	console.log(111)
	var from = util.format('%s <%s>', config.projectName, config.mailConfig.auth.user);
	var to = who;
	var subject = config.projectName + '帐号激活';
	var html = '<p>亲爱的用户 ' + name + ' 您好：</p>' +
		'<p>我们收到您在<a href  = "' + SITE_ROOT_URL + '">' + config.projectName + '</a>的注册信息，请点击下面的链接来激活帐户：</p>' +
		'<a href  = "' + SITE_ROOT_URL + '/api/active_account?key=' + token + '&name=' + name + '">激活链接</a>' +
		'<p>若您没有在' + config.name + '填写过注册信息，说明有人滥用了您的电子邮箱，请删除此邮件，我们对给您造成的打扰感到抱歉。</p>' +
		'<p>' + config.projectName + ' 谨上。</p>';
	//need_active_mail=false不发送邮件
	// if (!config.need_active_mail) {
	//     return;
	// }
	console.log(from)
	console.log(subject)
	console.log(to)
	console.log(html)
	sendMail({
		from: from,
		to: to,
		subject: subject,
		html: html
	});
}

/**
 * 发送密码重置通知邮件
 * @param {String} who 接收人的邮件地址
 * @param {String} token 重置用的token字符串
 * @param {String} name 接收人的用户名
 */
function sendResetPassMail(who, token, name) {
	var from = util.format('%s <%s>', config.name, config.mail_opts.auth.user);
	var to = who;
	var subject = config.name + '密码重置';
	var html = '<p>您好：' + name + '</p>' +
		'<p>我们收到您在' + config.name + '重置密码的请求，请在24小时内单击下面的链接来重置密码：</p>' +
		'<a href="' + SITE_ROOT_URL + '/#!/resetpass?key=' + token + '&name=' + name + '">重置密码链接</a>' +
		'<p>若您没有在' + config.name + '填写过注册信息，说明有人滥用了您的电子邮箱，请删除此邮件，我们对给您造成的打扰感到抱歉。</p>' +
		'<p>' + config.name + ' 谨上。</p>';

	sendMail({
		from: from,
		to: to,
		subject: subject,
		html: html
	});
}

function demo(who) {
	var from = util.format('%s <%s>', config.projectName, config.mailConfig.auth.user);
	var to = who;
	var subject = config.projectName + '上线邮件';
	var text =  '1111'; // plain text body
	var html = '<b>Hello world ?</b>' // html 内容
	sendMail({
		from: from,
		to: to,
		subject: subject,
		text:text,
		html: html
	});
}

module.exports = {sendMail, sendActiveMail, sendResetPassMail, demo};
