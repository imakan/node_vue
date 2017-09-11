// 'use strict'
let serverConfig = require('./serverConfig/config.global');
let path = require('path');
let express = require('express');
let app = express();
let history = require('connect-history-api-fallback');
let favicon = require('serve-favicon');
let cookieParser = require('cookie-parser');
let ejs = require('ejs');
let domain = require('domain');
let bodyParser = require('body-parser');
let session = require('express-session');
let RedisStore = require('connect-redis')(session)
let ioredis = require('ioredis')
let redisClient = new ioredis(serverConfig.redisConfig);
var swaggerJSDoc = require('swagger-jsdoc');
let logs = require('./logConfig/logs');
let auth = require('./common/auth');
let mail = require('./common/mail');

app.locals.email = 'makan@feinno.com';
app.use(bodyParser.json({ 'limit':'10000kb'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
	cookie:serverConfig.cookie,
	name:'sid.minglu.operator',
	secret: 'mingluoperator',
	resave: false,
	saveUninitialized: true,
	store: new RedisStore({
		client: redisClient,
		prefix:'SESSION:operator'
	}),
}));
// logs.configure();
// app.use(logs.useLog());

//试图模板
app.set('views',path.join(__dirname,'./src/views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.enable('trust proxy');

//静态资源
app.use('/dist', express.static(__dirname + '/dist'));
app.use('/util', express.static(__dirname + '/util'));
app.use(express.static(path.join(__dirname,'static')))
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));

app.locals.email = 'makan@feinno.com';

/** express路由中间件 **/
let route = require('./controller/index');
let upload = require('./controller/upload');


/**
 * 所有的接口判断需要用户登录
 * 如果当前页面不需要登录判断，那么放在这段代码前面
 * 比如帮助页面 app.use('/help')
 */
// app.use(function(req,res,next){
// 	// console.log(`用户信息===${JSON.stringify(req.session.user)}`)
// 	// console.log(`用户权限===${req.session.auth}`)
// 	auth.authUser(req,res,next)
// });
app.use('/api', route);
app.use('/upload', upload);


/** html5路由中间件，如果输地址栏 express没有监听到，则使用html中间件 **/
app.use(history({
	verbose: false, //是否生成日志
	htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
}));

app.use(function(req, res, next) {
	let d = domain.create();
	d.on('error', function(err) {
		console.log('进了domin');
		res.statusCode = 500;
		res.json({ 'sucess': false, 'messag': 'domain处理异常' });
	});
	d.add(req);
	d.add(res);
	d.run(next);
});
app.use(function(err, req, res, next) {
	// mail.sendErrorMail(app.locals.email,{err,req, res, next})
	console.error('发生错误-----:'+err);
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	res.status(err.status || 500);
	res.render('error',{ title: '系统开小差了' });
	next();
});

app.set('x-powered-by', false);
console.log("项目路径是：" + __dirname);

module.exports = app;
