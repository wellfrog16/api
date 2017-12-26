const database = require('../helper/database');
const handleSend = require('../helper/handleSend');

let db = null;

database.load('imooc-shop').then((value)=> (db = value)).catch((err)=>{ console.log(err); });

let model = {
    goods : {
        detail(req, res) {
            db.goods.findOne({id: +req.params.id}, (err, docs)=> handleSend(res, err, docs));
        },
        list(req, res) {
            db.goods.find({}).sort({id: 1}).exec((err, docs)=> handleSend(res, err, docs));
        }
    }
};

module.exports = model;