const handleSend = require('../../helper/handleSend');

let model = {
    file: {
        upload(req, res, next) {
            let err = '';
            let docs = {};

            if (req.file) {
                docs.path = req.file.filename.substring(0, 4) + '/' + req.file.filename.substring(4, 6);
                docs.filename = req.file.filename;
            } else {
                err = '文件上传失败';
            }
            handleSend(res, err, docs);
        }
    }
};

module.exports = model;