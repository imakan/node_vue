'use strict'
let path = require('path');
let fs = require('fs');
let express = require('express');
let router = express.Router();
let mail = require('../common/mail');
Array.prototype.contains = function (needle) {
    for (let i in this) {
        if (this[i] == needle) return true;
    }
    return false;
}

router.get('/aaa', function (req, res, next) {
    var args = req.body;
    var email = 'makan@feinno.com'
    var loginname = 'makan@feinno.com'
    console.log(mail)
	mail.demo('makan@feinno.com')

    // let paths = path.join(__dirname,'img_tmp');
    // let file = 'http://220.231.2.42:8001/file/download?file_id=0700b1bbb27da17c0fd92cd3a7abe323&range=0-&filename=1.amr'
    // ffmpeg(file)
    //     .withNoVideo()
    //     .audioCodec('libmp3lame')
    //     .audioBitrate(128)
    //     .format('mp3')
    //     .on('error', (err) => console.error(err))
    //     .on('end', () => console.log('Finished!'))
    //     .pipe(fs.createWriteStream("streamed.mp3"));

    res.json('1231')
})


module.exports = router;
