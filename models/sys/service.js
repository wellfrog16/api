const handleSend = require('../../helper/handleSend');
const multer = require('../../helper/upload/image');

let model = {
    file: {
        upload(req, res, next) {
            multer.single('avatar')(req, res, (err) => {
                if (err) {
                    handleSend(res, err, {});
                    return;
                }

                let docs = {};
                if (req.file) {
                    docs.path = req.file.filename.substring(0, 4) + '/' + req.file.filename.substring(4, 6);
                    docs.filename = req.file.filename;
                    docs.file = docs.path + '/' + docs.filename;
                } else {
                    err = '文件上传失败';
                }
                handleSend(res, err, docs);
            });
        }
    }
};

module.exports = model;