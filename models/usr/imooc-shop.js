const database = require('../../helper/database');
const handleSend = require('../../helper/handleSend');
const dbModel = require('../../models/sys/database');
const utils = require('../../utils/utils');

const db = database('imooc-shop', 'usr');

let model = {
    goods: {
        detail(req, res) {
            db.goods.findOne({id: +req.params.id}, (err, docs) => handleSend(res, err, docs));
        },
        list(req, res) {
            const { page = 1, pagesize = 12, sortPrice = 0 } = req.query;
            db.goods.find({}).sort({price: sortPrice}).skip((page - 1) * pagesize).limit(+pagesize).exec((err1, list) => {
                db.goods.count({}, (err2, total) => {
                    handleSend(res, (err1 + err2), {total, list});
                });
            });
        },
        async insert(req, res) {
            const id = await dbModel.guid.getGuid('goods', 'immoc-shop');
            let data = Object.assign({id}, {
                name: '三星',
                price: '799.00',
                photo: 'https://dummyimage.com/300/F1F'
            });
            db.goods.insert(data, (err, docs) => handleSend(res, err, docs));
        },
    }
};

module.exports = model;
