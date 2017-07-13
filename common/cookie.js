/**
 * 1、存储key
 * 2、加密设置cookie
 * 3、解密获取cookie
 * 4、清空cookie
 * 5、判断是否用户信息是否存在（是否登录）登录时存储用户信息
 *
 */
var CryptoJs = require("./crypto.js");
var cookie = require('cookie');
var cookieConfig = require('../serverConfig/config.global').cookie
var authFile = require('../auth_config/auth')
Array.prototype.contains = function ( needle ) {
    for (var i in this) {
        if (this[i] == needle) return true;
    }
    return false;
}
function cookieUtil() {
    this.key = cookieConfig.cookie_secret;
}
cookieUtil.prototype.getKey = function () {
    return this.key;
}
//加密信息
cookieUtil.prototype.edCryptor = function (data) {
    return CryptoJs.edCryptor(data, this.getKey());
}
//解密信息
cookieUtil.prototype.edDecryptor = function (data) {
    return CryptoJs.edDecryptor(data, this.getKey());
}
/**
 * 设置cookie
 * @param request
 * @param response
 * @param name
 * @param val
 */
cookieUtil.prototype.setCookie = function (request, response, name, val) {
    var _val = CryptoJs.edCryptor(val, this.getKey());
    var options = {
        path: cookieConfig.path || '/',
        domain: cookieConfig.domain,
        secure: false, //true是https
        httpOnly: cookieConfig.httponly,
        // maxAge: '0' //关闭浏览器清除cookie
    };
    var headerVal = cookie.serialize(name, new String(_val), options);
    var prev = response.getHeader('set-cookie') || [];
    var header = Array.isArray(prev) ? prev.concat(headerVal)
        : Array.isArray(headerVal) ? [prev].concat(headerVal)
            : [prev, headerVal];
    response.setHeader('set-cookie', header);
}
/**
 * 获取
 * @param name
 */
cookieUtil.prototype.getCookie = function (name) {
    var _name = CryptoJs.edDecryptor(name, this.getKey())
    return _name
}
/**
 * 删除指定cookie
 * @param res
 * @param name
 */
cookieUtil.prototype.deleteCookie = function (res, name) {
    if(JSON.stringify(req.cookies) == '{}') return false
    var options = {
	    path: cookieConfig.path || '/',
	    domain: cookieConfig.domain,
	    secure: false, //true是https
	    httpOnly: cookieConfig.httponly,
        maxAge: 0
    };
    res.clearCookie(name,options)
}
/**
 * 清空cookie
 * @param req
 * @param res
 */
cookieUtil.prototype.clearCookie = function (req, res) {
    if(JSON.stringify(req.cookies) == '{}') return false
    for (var i in req.cookies) {
        var options = {
	        path: cookieConfig.path || '/',
	        domain: cookieConfig.domain,
	        secure: false, //true是https
	        httpOnly: cookieConfig.httponly,
            maxAge: 0
        };
        res.clearCookie(i,options)
    }
}
cookieUtil.prototype.isOnline = function (req, res, callback) {
    if (!!req.cookies.menuAuthor && !!req.cookies.authInfo && (req.cookies.user || req.cookies.agenciesInfo)) {   //判断是否有权限控制器
        console.log(`req.cookies.menuAthor:::权限是 ${this.getCookie(req.cookies.menuAuthor)}`)
        var menuAuthor = CryptoJs.edDecryptor(req.cookies.menuAuthor, this.getKey());
        console.log(`menuAuthor::::${menuAuthor}`)
        if (authFile.authType().contains(Number(menuAuthor))) {  //是否在线
            if(CryptoJs.edDecryptor(req.cookies.authInfo, this.getKey()).status == 1){ //state  1 是 用户 判断是否被冻结 useStatus 冻结字段
                if(CryptoJs.edDecryptor(req.cookies.user, this.getKey()).useStatus == 2){
                    console.log(`个人用户被冻结,useStatus = 2`);
                    this.clearCookie(req, res)
                    return callback(false);
                }else{
                    return callback(true);
                }
            }else if(CryptoJs.edDecryptor(req.cookies.authInfo, this.getKey()).status == 2){ //state 2 是 机构 判断是否被冻结 useState 冻结字段
                if(CryptoJs.edDecryptor(req.cookies.agenciesInfo, this.getKey()).useState == 2){
                    console.log(`机构账户被冻结,useStatus = 2`);
                    this.clearCookie(req, res)
                    return callback(false);
                }else{
                    return callback(true);
                }
            }else{
                console.log(`用户信息中冻结字段不正确,useStatus不是1  也不是 2`);
                this.clearCookie(req, res)
                return callback(false);
            }
        }else{
            console.log(`用户本地存储的信息menuAuthor不在线`);
            this.clearCookie(req, res)
            return callback(false);
        }
    } else {
        console.log(`用户本地存储的信息menuAuthor,authInfo,agenciesInfo或者user 不存在`);
        this.clearCookie(req, res)
        return callback(false);
    }
}
module.exports = new cookieUtil();
