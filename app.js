'use strict'
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
let logs = require('./logConfig/logs');

app.use(bodyParser.json({ 'limit':'10000kb'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'demo'
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
app.use(express.static(path.join(__dirname,'static')))
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));

app.locals.email = 'makan@feinno.com';

/** express路由中间件 **/
let route = require('./controller/index');
app.use('/', route);
app.use('/api', route);
app.use('/demo', route);

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
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	res.status(err.status || 500);
	res.render('error',{ title: '系统开小差了' });
	next();
});

app.set('x-powered-by', false);
console.log("项目路径是：" + __dirname);

module.exports = app;
