const multer = require('multer');
const path = require('path');
const moment = require('moment');
// const md5 = require('md5');
const config = require('../../config/');

var storage = multer.diskStorage({
    // 设置上传文件路径,以后可以扩展成上传至七牛,文件服务器等等
    // Note:如果你传递的是一个函数，你负责创建文件夹，如果你传递的是一个字符串，multer会自动创建
    destination: path.join(config.upload.imgPath, moment().format('YYYY/MM')),
    // TODO:文件区分目录存放
    // 获取文件MD5，重命名，添加后缀,文件重复会直接覆盖
    filename(req, file, cb) {
        var fileFormat = (file.originalname).split('.');
        cb(null, moment().format('YYYYMMDDHHmmss') + Math.random().toString(36).substring(2, 8) + '.' + fileFormat[fileFormat.length - 1]);
    }
});

// 添加配置文件到muler对象。
var upload = multer({
    storage: storage,
    // 其他设置请参考multer的limits
    limits:{
        fieldSize: 1024 * 1024 * 2,
    }
});

// 导出对象
module.exports = upload;