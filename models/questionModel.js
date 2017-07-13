/**
 * Created by makan on 2017/4/25.
 */
var path = require('path');
var fs = require('fs');
var db = require('./db');
var mysql = require('mysql');
/**
 * 产生随机数
 */
function getx(arr) {
	for (var i = 0; i > -1; i++) {
		var flag = true;
		var num = Math.floor(Math.random() * 260) + 1;
		for (var i in arr) {
			if (arr[i] == num) {
				flag = false;
				break;
			}
		}
		if (flag == true) {
			arr.push(num);
			return;
		}
	}
}
/**
 * 查询题库
 * @param callback
 */
exports.getQuestionList = function (callback) {
	//生成随机数
	var arr = [];
	for (var i = 0; i < 10; i++) {
		getx(arr);
	}
	console.log(arr)
	var _arr = arr.join(",")
	var sql = 'select Id,Question as question,OptionA,OptionB,OptionC,OptionD from `FA_EconomyQuestionBank` where Id in (' + _arr + ') '
	db.execCommand(sql, null, callback);
}
/**
 * 根据id获取10道题的答案
 */
exports.getAnswer = function (arr, callback) {
	//生成随机数
	var sql = 'select Id as id,Question as question,OptionA as A,OptionB as B,OptionC as C,OptionD as D,Answer as answer from `FA_EconomyQuestionBank` where Id in (' + arr + ') '
	db.execCommand(sql, null, callback);
}
/**
 * 查询公司总数
 */

exports.companyRankofAnswerTotalPage = function (CompanyType, callback) {
	/**
	 * @type {params}
	 */
	var sql = 'select count(*) as pages from `FA_EconomyCompany` where CompanyType=?';
	db.execCommand(sql, mysql.escape(CompanyType), callback);
}
/**
 * 根据当前页查询，以及每页数量查询答题人所属公司的排行
 */
exports.companyRankofAnswerPage = function (values, callback) {
	/**
	 * @type {params}
	 */
	//var sql = 'select a.* from FA_EconomyCompany  as a join FA_EconomyCompany b on a.id=b.id where a.CompanyType = ? order by a.Count DESC limit ?,?;';
	//var sql = 'select Id,Company,Count from FA_EconomyCompany where CompanyType = 1 order by Count desc limit 30,10';   给count加key
	var sql = 'select Company,CompanyType,Count from `FA_EconomyCompany` where CompanyType = ? ORDER BY `Count` DESC ,`Id` ASC limit ?,?';
	db.execCommand(sql, values, callback);
}
/**
 * 获取上一次用户答题分数
 */
exports.getScore = function (values, callback) {
	/**
	 * @type {params}
	 */
	var sql = 'select MaxScore from `FA_EconomyAnswerRecord` where userId = ? And companyId = ?';
	db.execCommand(sql, values, callback);
}

/**
 * 插入分数
 */
exports.setScore = function (flag, values, callback) {
	var sql = ''
	if (flag) {
		sql = 'insert into FA_EconomyAnswerRecord(userId,companyId,maxScore,updateTime,createTime,company,source) values(?,?,?,?,?,?,?)';
	} else {
		sql = 'update `FA_EconomyAnswerRecord` set maxScore = ?,updateTime = ?,source= ? where userId = ? And companyId = ?'
	}
	db.execCommand(sql, values, callback);


}
exports.setCompanyCount = function (values, callback) {
	var sql = 'select version,Count from `FA_EconomyCompany` where Id = ? And Company = ? And CompanyType = ?'
	db.execCommand(sql, values, function (err,rows) {
		var _obj = JSON.stringify(rows);
		var version = JSON.parse(_obj)[0].version
		var count = JSON.parse(_obj)[0].Count
		var sql = "update `FA_EconomyCompany` set version = "+(Number(version)+1)+",Count = "+(Number(count)+1)+" where version ="+version+" And Id = ? And Company = ? And CompanyType = ?"
		db.execCommand(sql, values,callback)
	});



}


//获取当前日期
exports.getNowFormatDate = function () {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
		+ " " + date.getHours() + seperator2 + date.getMinutes()
		+ seperator2 + date.getSeconds();
	return currentdate;
}
