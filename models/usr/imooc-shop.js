const database = require('../../helper/database');
const utils = require('../../utils/utils');
const dbModel = require('../../models/sys/database');
const moment = require('moment');
const Chance = require('chance');
const chance = new Chance();

const db = database('imooc-shop', 'usr');

let model = {};

// 商品
model.goods = {

    // 单品详细
    detail(id) {
        // 数值化
        id = +id;

        return new Promise((resolve, reject) => {
            db.goods.findOne({id}, (err, doc) => utils.promise.test(resolve, reject, err, doc));
        });
    },

    // 列表，带分页
    list(query) {
        const { page = 1, pagesize = 12, sortPrice = 0, start = 0, end = 0 } = query;

        // 查询参数
        let params = {};
        if (end > 0) {
            params.price = { $gt: +start, $lte: +end };
        }

        return new Promise((resolve, reject) => {
            db.goods.find(params).sort({price: sortPrice}).skip((page - 1) * pagesize).limit(+pagesize).exec((err1, list) => {
                db.goods.count({params}, (err2, total) => utils.promise.test(resolve, reject, (err1 + err2), {total, list}));
            });
        });
    },

    // 加入新货物
    async insert(doc) {
        let id = 0;

        // 尝试获取
        try {
            id = await dbModel.guid.getGuid('goods', 'immoc-shop');
        } catch (e) {
            return utils.promise.reject(e);
        }

        let data = Object.assign({id}, doc);
        // let data = Object.assign({id}, {
        //     name: '三星',
        //     price: 799,
        //     photo: 'https://dummyimage.com/300/F1F',
        //     checked: true
        // });

        return new Promise((resolve, reject) => {
            db.goods.insert(data, (err, doc) => utils.promise.test(resolve, reject, err, doc));
        });
    }
};

// 购物车
model.cart = {

    // 添加商品
    async insert(userId, goodsId) { // 加入到user的shop下
        // 数值化
        userId = +userId;
        goodsId = +goodsId;

        let userDoc = null;
        let goodsDoc = null;

        // 尝试获取
        try {
            userDoc = await model.user.detail(userId);
            goodsDoc = await model.goods.detail(goodsId);
        } catch (e) {
            return utils.promise.reject(e);
        }

        // 获取正常
        goodsDoc.count = 1;
        goodsDoc.checked = true;

        let flagItem = false;

        // 如果已经有相同编号的产品，则数量加1
        for (const item of userDoc.shop.cart) {
            if (item.id === goodsId) {
                item.count++;
                flagItem = true;
                break;
            }
        }

        // 如果没有相同编号的产品，则直接添加
        if (!flagItem) {
            userDoc.shop.cart.push(goodsDoc);
        }

        // 更新依旧返回Promise
        return model.user.update(userDoc);
    },

    // 商品列表
    async list(userId) {
        // 数值化
        userId = +userId;

        let userDoc = null;

        try {
            userDoc = await model.user.detail(userId);
        } catch (e) {
            return utils.promise.reject(e);
        }

        // 获取数据成功后
        let err = null;
        let doc = {};
        if (!userDoc) {
            err = '用户信息读取错误';
        } else {
            doc = {list: userDoc.shop.cart};
        }

        return utils.promise.default(err, doc);
    },

    // 删除，todo: 直接数据库删除
    async delete(userId, goodsId) {
        // 数值化
        userId = +userId;
        goodsId = +goodsId;

        let userDoc = null;

        // 尝试获取
        try {
            userDoc = await model.user.detail(userId);
        } catch (e) {
            return utils.promise.reject(e);
        }

        let err = null;
        let effect = 0;

        if (userDoc) {
            for (const goods of userDoc.shop.cart) {
                if (goods.id === goodsId) {
                    userDoc.shop.cart.splice(userDoc.shop.cart.indexOf(goods), 1);
                    break;
                }
            }

            effect = await model.user.update(userDoc);
        } else {
            err = '用户信息读取错误';
        }

        return utils.promise.default(err, {effect});
    },

    // 更新信息
    async update(userId, goodsDoc) {
        // 数值化
        userId = +userId;

        let userDoc = null;

        try {
            userDoc = await model.user.detail(userId);
        } catch (e) {
            return utils.promise.reject(e);
        }

        // 如果已经有相同编号的产品，则数量加1
        for (const item of userDoc.shop.cart) {
            if (item.id === +goodsDoc.id) {
                item.count = +goodsDoc.count;
                item.checked = +goodsDoc.checked;
                break;
            }
        }

        // 更新依旧返回Promise
        return model.user.update(userDoc);
    },

    // 全checked更新
    async checkAll(userId, flagChecked) {
        // 数值化
        userId = +userId;

        let userDoc = null;

        try {
            userDoc = await model.user.detail(userId);
        } catch (e) {
            return utils.promise.reject(e);
        }

        // 如果已经有相同编号的产品，则数量加1
        for (const item of userDoc.shop.cart) {
            item.checked = flagChecked;
        }

        // 更新依旧返回Promise
        return model.user.update(userDoc);
    },

    async count(userId) {
        // 数值化
        userId = +userId;

        let userDoc = null;

        try {
            userDoc = await model.user.detail(userId);
        } catch (e) {
            return utils.promise.reject(e);
        }

        // 获取数据成功后
        let err = null;
        let doc = {};
        let count = 0;
        if (!userDoc) {
            err = '用户信息读取错误';
        } else {
            for (const item of userDoc.shop.cart) {
                count += item.count;
            }
            doc.count = count;
        }

        return utils.promise.default(err, doc);
    }
};

// 用户
model.user = {
    detail(id) {
        // 数值化
        id = +id;

        return new Promise((resolve, reject) => {
            db['user'].findOne({id}, (err, doc) => utils.promise.test(resolve, reject, err, doc));
        });
    },
    // 临时添加固定用户
    async insert() {
        let id = 0;

        // 尝试获取
        try {
            id = await dbModel.guid.getGuid('users', 'immoc-shop');
        } catch (e) {
            return utils.promise.reject(e);
        }

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
            db.user.insert(data, (err, doc) => utils.promise.test(resolve, reject, err, doc));
        });
    },

    update(userDoc) {
        delete userDoc._id;
        return new Promise((resolve, reject) => {
            db.user.update({id: +userDoc.id}, {$set: userDoc}, {returnUpdatedDocs: true}, (err, numAffected, doc) => utils.promise.test(resolve, reject, err, numAffected));
        });
    },
    // 登入
    login(name, password) {
        return new Promise((resolve, reject) => {
            db.user.findOne({name, password}, (err, doc) => {
                const result = { };
                if (doc) {
                    result.id = doc.id;
                    result.name = doc.name;
                }
                return utils.promise.test(resolve, reject, err, result);
            });
        });
        // console.log(`name:${name}, password:${password}`);
    }
};

// 地址
model.address = {
    // 添加商品
    async insert(userId, addressDoc) { // 加入到user的address下
        // 数值化
        userId = +userId;

        let userDoc = null;
        let id = 0;

        // 尝试获取
        try {
            id = await dbModel.guid.getGuid('address', 'immoc-shop');
            userDoc = await model.user.detail(userId);
        } catch (e) {
            return utils.promise.reject(e);
        }

        addressDoc.id = id;
        addressDoc.default = false;

        userDoc.shop.address.push(addressDoc);
        return model.user.update(userDoc);
    },

    // 地址列表
    async list(userId) {
        // 数值化
        userId = +userId;

        let userDoc = null;

        try {
            userDoc = await model.user.detail(userId);
        } catch (e) {
            return utils.promise.reject(e);
        }

        // 获取数据成功后
        let err = null;
        let doc = {};
        if (!userDoc) {
            err = '用户信息读取错误';
        } else {
            doc = {list: userDoc.shop.address};
        }

        return utils.promise.default(err, doc);
    },

    // 删除，todo: 直接数据库删除
    async delete(userId, addressId) {
        // 数值化
        userId = +userId;
        addressId = +addressId;

        let userDoc = null;

        // 尝试获取
        try {
            userDoc = await model.user.detail(userId);
        } catch (e) {
            return utils.promise.reject(e);
        }

        let err = null;
        let effect = 0;

        if (userDoc) {
            for (const address of userDoc.shop.address) {
                if (address.id === addressId) {
                    userDoc.shop.address.splice(userDoc.shop.address.indexOf(address), 1);
                    break;
                }
            }

            effect = await model.user.update(userDoc);
        } else {
            err = '用户信息读取错误';
        }

        return utils.promise.default(err, {effect});
    },

    // 设置默认地址
    async default(userId, addressId) {
        // 数值化
        userId = +userId;
        addressId = +addressId;

        let userDoc = null;

        // 尝试获取
        try {
            userDoc = await model.user.detail(userId);
        } catch (e) {
            return utils.promise.reject(e);
        }

        // 遍历地址，更新default值
        for (const item of userDoc.shop.address) {
            item.default = item.id === addressId;
        }

        // 更新依旧返回Promise
        return model.user.update(userDoc);
    }
};

// 订单
model.order = {
    async detail(userId, orderId) {
        // 数值化
        userId = +userId;

        let userDoc = null;

        try {
            userDoc = await model.user.detail(userId);
        } catch (e) {
            return utils.promise.reject(e);
        }

        // 获取数据成功后
        let err = null;
        let doc = null;
        if (!userDoc) {
            err = '用户信息读取错误';
        } else {
            for(const item of userDoc.shop.order) {
                if (orderId === item.id) {
                    doc = item;
                    break;
                }
            }
        }

        return utils.promise.default(err, doc);
    },

    async insert(userId, { addressId, discount, tax, shipping }) {
        let orderDoc = {};
        orderDoc.id = createOrderId();

        // 数值化
        userId = +userId;
        addressId = +addressId;
        orderDoc.discount = +discount;
        orderDoc.tax = +tax;
        orderDoc.shipping = +shipping;

        let userDoc = null;

        // 尝试获取
        try {
            userDoc = await model.user.detail(userId);
        } catch (e) {
            return utils.promise.reject(e);
        }

        // 获取数据成功后
        let addressDoc = null;
        let cartDoc = [];

        orderDoc.totalPrice = 0;

        // 遍历地址，获得指定的地址
        for (const item of userDoc.shop.address) {
            if (item.id === addressId) {
                addressDoc = item;
                break;
            }
        }

        // 遍历购物，获得选中的商品
        for (const item of userDoc.shop.cart) {
            if (item.checked) {
                cartDoc.push(item);
                orderDoc.totalPrice += item.price * item.count;
            }
        }

        // 订单总价格
        orderDoc.totalOrder = orderDoc.totalPrice - orderDoc.discount + orderDoc.tax + orderDoc.shipping;

        orderDoc.address = addressDoc;
        orderDoc.goodsList = cartDoc;
        orderDoc.status = 1;
        orderDoc.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');

        userDoc.shop.order.push(orderDoc);

        try {
            await model.user.update(userDoc);
            return utils.promise.resolve({ id: orderDoc.id });
        } catch (e) {
            return utils.promise.reject(e);
        }
    },

    // 订单列表
    async list(userId) {
        // 数值化
        userId = +userId;

        let userDoc = null;

        try {
            userDoc = await model.user.detail(userId);
        } catch (e) {
            return utils.promise.reject(e);
        }

        // 获取数据成功后
        let err = null;
        let doc = {};
        if (!userDoc) {
            err = '用户信息读取错误';
        } else {
            doc = {list: userDoc.shop.order};
        }

        return utils.promise.default(err, doc);
    },

    // 删除，todo: 直接数据库删除
    async delete(userId, orderId) {
        // 数值化
        userId = +userId;

        let userDoc = null;

        // 尝试获取
        try {
            userDoc = await model.user.detail(userId);
        } catch (e) {
            return utils.promise.reject(e);
        }

        let err = null;
        let effect = 0;

        if (userDoc) {
            for (const order of userDoc.shop.order) {
                if (order.id === orderId) {
                    userDoc.shop.order.splice(userDoc.shop.order.indexOf(order), 1);
                    break;
                }
            }

            effect = await model.user.update(userDoc);
        } else {
            err = '用户信息读取错误';
        }

        return utils.promise.default(err, {effect});
    }
};

const createOrderId = () => `${moment().format('YYYYMMDDhhmmss')}${chance.integer({min: 1000, max: 9999})}`;

module.exports = model;
