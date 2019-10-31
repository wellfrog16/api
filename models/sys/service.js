const axios = require('axios');
const handleSend = require('../../helper/handleSend');
const multer = require('../../helper/upload/image');

let model = {
    file: {
        upload(req, res, next) {
            multer().single('avatar')(req, res, (err) => {
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
    },
    translate(req, res, next) {
        axios.get('http://dict-co.iciba.com/api/dictionary.php', {
            params: {
                type: 'json',
                key: 'E56ABC10E12BCE88717FEE502FC46EBF',
                w: 'love',
            }
        }).then((res) => {
            console.log(res.data);
        })
    },
};

module.exports = model;