/**
 * Created by makan on 2017/4/18.
 */
var mysql = require('mysql'),
	mysqlConfig = require('../serverConfig/config.global').mysqlConfig;

var db = {};
db.connection = null;

var processConnect = function () {
	//创建连接
	db.connection = mysql.createConnection(mysqlConfig);
	//连接
	db.connection.connect(function (error) {
		if (error) {
			setTimeout(processConnect, 3000);
		}

		db.connection.on('error', function (err) {
			console.log(new Date());
			console.log('db error, reconnect');
			console.log(err);
			processConnect();
		});
		console.log('数据库连接id====' + db.connection.threadId);
	});
};

processConnect();

var execCommand = function (sqlQuery, params,callback) {
	try{
		db.connection.query(sqlQuery, params,callback);
	}catch(e){
		return "数据库连接错误"
	}
};

db.execCommand = execCommand;

module.exports = db;
