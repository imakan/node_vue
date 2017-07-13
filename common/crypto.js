/**
 * Created by makan on 2016/12/12.
 */
var CryptoJS = require("crypto-js");
function aes() {
}
/**
 * 加密
 * @param data
 * @param key
 * @returns {boolean}
 */
aes.prototype.edCryptor = function (data, key) {
	if(!data){
		console.log('加密时，cookie的值为空！')
		return false
	}else{
		var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), key);
		return ciphertext.toString();
	}

}

/**
 * 解密
 * @param data
 * @param key
 * @returns {*}
 */
aes.prototype.edDecryptor = function (data, key) {
	var plaintext = '';
	if(!data){
		console.log(`cookie中${data}:不存在`)
		return false
	}else{
		if(Object.prototype.toString.call(data) === "[object String]"){
			try {
				var bytes = CryptoJS.AES.decrypt(data.toString(), key);
				plaintext = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
			} catch (e) {
				console.log("解密失败:" + e);
				return null;
			}
		}else{
			console.log('解密时，获取cookie的key不存在！或者没有改key的加密')
			return false
		}

	}
	return plaintext;
}

module.exports = new aes();
