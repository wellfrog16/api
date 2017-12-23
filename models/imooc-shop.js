const database = require('../helper/databse');
const handleSend = require('../helper/handleSend');

let db = null;

database.load('imooc-shop').then((value)=> (db = value));

let model = {
    goods : {
        detail(req, res, next) {
            db.goods.findOne({id: +req.params.id}, (err, docs)=> handleSend(res, err, docs));
        },
        list(req, res, next) {
            db.goods.find({}).sort({id: 1}).exec((err, docs)=> handleSend(res, err, docs));
        }
    }
}

module.exports = model;