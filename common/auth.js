/**
 * 用户权限控制
 */
'use strict'
function user() {
	this.menuAuthor = '';
}
user.prototype.authType = function () {
    var authArr = ['',1,2]
    return authArr;
}
user.prototype.showMenu = function (data) { //用户权限
    if(!data){ //个人登录
	    console.log('=============用户登录异常=============')
	    return false
    }
    this.identity = data*1;
    switch (this.identity) {
        case null:
        case '':
            this.menuAuthor = this.authType()[0]
            break;
        case 1:
	        this.menuAuthor = this.authType()[1]
            break;
        case 2:
	        this.menuAuthor = this.authType()[2]
            break;
        default:
	        this.menuAuthor = this.authType()[0]
    }
    return this.menuAuthor;
}
user.prototype.authUser = (req, res, next) => { //验证用户是否登录
	if (!req.session.user || !req.session.auth) { //session中不存在用户信息或者是权限信息
		if(req.url=="/login"){
			next();
			return false
		}else{
			res.redirect('/login')
			return false
		}
		return false
	}
	next();
}
module.exports = new user();
