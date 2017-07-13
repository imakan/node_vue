/**
 * Created by makan on 2017/6/19.
 */
const redis = require('redis');
const config = require('../serverConfig/config.global.js').redisConfig
const redisObj = {
	client: null,
	connect() {
		this.client = redis.createClient(config.port, config.host)
		this.client.auth(config.password, function () { //redis连接密码校验
			console.log('redis----通过认证')
		});
		this.client.on('error', function (err) { //redis连接异常
			console.error('reids Error ' + err);
		});
		this.client.on('ready', function () { //连接成功
			console.info('Redis连接成功');
		});
	},
	init(){
		this.connect(); // 创建连接
		const instance = this.client; //实例一个redis
		/**
		 *  重写了一下三个方法。可以根据需要定义。
		 */
		//字符串存取
		const info = instance.info;
		const get = instance.get;
		const set = instance.set;
		const keys = instance.keys;
		const incr = instance.incr;
		//哈希
		const hset = instance.hset;
		const hget = instance.hget;
		const hgetall = instance.hgetall;
		const randomkey = instance.randomkey;
		instance.info = function (callback) {
			info.call(instance, (err, infos) => {
				if (err) {
					callback(err, null);
				}
				callback(null, infos);
			})
		};
		//字符串存取
		instance.keys = function (allkey,callback,dbIndex) {
			if (!callback || (typeof callback != 'function')) {
				console.error('redis.get:::未指定callback函数或者callback不是function')
				return false
			}
			if (!dbIndex) {
				dbIndex = 0;
			}
			instance.select(dbIndex, (err) => {
				if (err) {
					callback(err, null)
				} else {
					keys.call(instance, allkey,(err, val) => {
						if (err) {
							callback(err, null);
						}
						callback(null, val);
					})
				}
			})
		};
		instance.incr = function (key,callback,dbIndex) {
			if (!callback || (typeof callback != 'function')) {
				console.error('redis.get:::未指定callback函数或者callback不是function')
				return false
			}
			if (!dbIndex) {
				dbIndex = 0;
			}
			this.get(key, (err,val) => {
				if(err){
					console.log('redis.incr:::',err)
				}else{
					if(isNaN(val)){ //这里如果key对应的值 不存在则返回null
						console.log('redis.incr:::key的值必须为整数型')
						return false
					}else{
						instance.select(dbIndex, (err) => {
							if (err) {
								callback(err, null)
							} else {
								incr.call(instance, key,(err, val) => {
									if (err) {
										callback(err, null);
									}
									callback(null, val);
								})
							}
						})
					}
				}
			}, dbIndex)


		};
		instance.get = function (key, callback, dbIndex) {
			if (!callback || (typeof callback != 'function')) {
				console.error('redis.get:::未指定callback函数或者callback不是function')
				return false
			}
			if (!dbIndex) {
				dbIndex = 0;
			}
			instance.select(dbIndex, (err) => {
				if (err) {
					callback(err, null)
				} else {
					get.call(instance, key, (err, val) => {
						if (err) {
							callback(err, null);
						}
						callback(null, val);
					});
				}
			})
		};
		instance.set = function (key, value, expire, callback, dbIndex) {
			if (!callback || (typeof callback != 'function')) {
				console.error('redis.set:::未指定callback函数或者callback不是function')
				return false
			}
			if (!dbIndex) {
				dbIndex = 0;
			}
			instance.select(dbIndex, (err) => {
				if (err) {
					callback(err, null)
				} else {
					set.call(instance, key, JSON.stringify(value), callback);
					if (!isNaN(expire) && expire > 0) {
						instance.expire(key, parseInt(expire));
					}
				}
			})

		};
		//哈希存取
		instance.hset = function () {

		}

		return instance


	}
}
// 返回的是一个redis.client的实例
module.exports = redisObj.init();
