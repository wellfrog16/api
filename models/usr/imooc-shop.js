const database = require('../../helper/database');
const handleSend = require('../../helper/handleSend');
const {handlePromise} = require('../../helper/handle');
const dbModel = require('../../models/sys/database');
const utils = require('../../utils/utils');

const db = database('imooc-shop', 'usr');

let model = {};

// 商品
model.goods = {
    detail(id) {
        return new Promise((resolve, reject) => {
            db.goods.findOne({id}, (err, doc) => handlePromise(resolve, reject, err, doc));
        });
    },
    list(query) {
        const { page = 1, pagesize = 12, sortPrice = 0, start = 0, end = 0 } = query;

        // 查询参数
        let params = {};
        if (end > 0) {
            params.price = { $gt: +start, $lte: +end };
        }

        return new Promise((resolve, reject) => {
            db.goods.find(params).sort({price: sortPrice}).skip((page - 1) * pagesize).limit(+pagesize).exec((err1, list) => {
                db.goods.count({params}, (err2, total) => handlePromise(resolve, reject, (err1 + err2), {total, list}));
            });
        });
    },
    async insert(req, res) {
        const id = await dbModel.guid.getGuid('goods', 'immoc-shop');
        let data = Object.assign({id}, {
            name: '三星',
            price: 799,
            photo: 'https://dummyimage.com/300/F1F'
        });
        db.goods.insert(data, (err, doc) => handleSend(res, err, doc));
    }
};

// 购物车
model.cart = {
    async add(id) { // 加入到user的shop下
        const userDoc = await model.user.detail(1);
        const goodsDoc = await model.goods.detail(id);
        goodsDoc.count = 1;

        let flagItem = false;

        // 如果已经有相同编号的产品，则数量加1
        for (const item of userDoc.shop.cart) {
            if (item.id === id) {
                item.count++;
                flagItem = true;
                break;
            }
        }

        // 如果没有相同编号的产品，则直接添加
        if (!flagItem) {
            userDoc.shop.cart.push(goodsDoc);
        }

        return model.user.update(userDoc);
    }
};

// 用户
model.user = {
    detail(id) {
        return new Promise((resolve, reject) => {
            db['user'].findOne({id}, (err, doc) => handlePromise(resolve, reject, err, doc));
        });
    },
    // 临时添加固定用户
    async insert() {
        const id = await dbModel.guid.getGuid('users', 'immoc-shop');
        let data = Object.assign({id}, {
            name: 'frog',
            password: '123456',
            shop: {
                cart: [],
                order: [],
                address: []
            }
        });

        return new Promise((resolve, reject) => {
            db.user.insert(data, (err, doc) => handlePromise(resolve, reject, err, doc));
        });
    },

    update(userDoc) {
        delete userDoc._id;
        return new Promise((resolve, reject) => {
            db.user.update({id: +userDoc.id}, {$set: userDoc}, {returnUpdatedDocs: true}, (err, numAffected, doc) => handlePromise(resolve, reject, err, doc));
        });
    }
};

module.exports = model;
