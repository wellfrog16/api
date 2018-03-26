const express = require('express');
const model = require('../models/usr/imooc-shop');
const utils = require('../utils/utils');
const router = express.Router();

router.post('/goods', (req, res, next) => model.goods.insert(req.body).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err)));
router.get('/goods', (req, res) => model.goods.list(req.query).then(docs => utils.handle.sendSuccess(res, docs), err => utils.handle.sendError(res, err)));
router.get('/goods/:id(\\d+)', (req, res) => model.goods.detail(req.params.id).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err)));

// 购物车
// ------------------------------------------

// 请求列表
router.get('/cart', (req, res, next) => {
    const user = req.signedCookies.user;

    if (user) {
        model.cart.list(user.id).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

// 添加商品
router.post('/cart', (req, res, next) => {
    const user = req.signedCookies.user;

    if (user) {
        model.cart.insert(user.id, req.body.goodsId).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

// 更新商品
router.put('/cart', (req, res, next) => {
    const user = req.signedCookies.user;

    if (user) {
        model.cart.update(user.id, req.body).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

// 删除商品
router.delete('/cart/:id(\\d+)', (req, res, next) => {
    const user = req.signedCookies.user;

    if (user) {
        model.cart.delete(user.id, req.params.id).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

// 更新商品check状态
router.put('/cart/checkAll', (req, res, next) => {
    const user = req.signedCookies.user;

    if (user) {
        model.cart.checkAll(user.id, req.body.checked).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

// 获得商品总数量
router.get('/cart/count', (req, res, next) => {
    const user = req.signedCookies.user;

    if (user) {
        model.cart.count(user.id).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

// 地址
// ------------------------------------------
// 请求列表
router.get('/address', (req, res, next) => {
    const user = req.signedCookies.user;

    if (user) {
        model.address.list(user.id).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

// 新建地址
router.post('/address', (req, res, next) => {
    const user = req.signedCookies.user;

    if (user) {
        model.address.insert(user.id, req.body).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

// 删除地址
router.delete('/address/:id(\\d+)', (req, res, next) => {
    const user = req.signedCookies.user;

    if (user) {
        model.address.delete(user.id, req.params.id).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

// 设置默认地址
router.put('/address/:id(\\d+)/default', (req, res, next) => {
    const user = req.signedCookies.user;

    if (user) {
        model.address.default(user.id, req.params.id).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

// 订单
// ------------------------------------------
// 请求指定订单信息
router.get('/order/:id(\\d+)', (req, res, next) => {
    const user = req.signedCookies.user;

    if (user) {
        model.order.detail(user.id, req.params.id).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

// 请求列表
router.get('/order', (req, res, next) => {
    const user = req.signedCookies.user;

    if (user) {
        model.order.list(user.id).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

// 创建订单
router.post('/order', (req, res, next) => {
    const user = req.signedCookies.user;

    if (user) {
        model.order.insert(user.id, req.body).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

// 删除指定的订单
router.delete('/order/:id', (req, res, next) => {
    const user = req.signedCookies.user;

    if (user) {
        model.order.delete(user.id, req.params.id).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

// 用户
// ------------------------------------------

// user，简单cookie校验
// router.get('/user/:id(\\d+)', (req, res) => model.user.detail(+req.params.id).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
router.get('/user/:id(\\d+)', (req, res) => {
    const user = req.signedCookies.user;

    // 如果登陆存在，刷新时间
    if (user && user.id === +req.params.id) {
        res.cookie('user', user, {
            path: '/',
            maxAge: 1000 * 60 * 60,
            signed: true
        });

        model.user.detail(req.params.id).then(
            doc => {
                delete doc.password;
                utils.handle.sendSuccess(res, doc);
            },
            err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登录');
    }
});

// 登陆
router.post('/user/login', (req, res) => model.user.login(req.body.name, req.body.password).then(doc => {
    // 登陆成功
    if (doc.id) {
        res.cookie('user', doc, {
            path: '/',
            maxAge: 1000 * 60 * 60,
            signed: true
        });

        utils.handle.sendSuccess(res, doc);
    } else {
        utils.handle.sendError(res, '未获取到用户信息');
    }
}).catch(err => utils.handle.sendError(res, err)));

// 登出
router.get('/user/logout', (req, res) => {
    res.cookie('user', '', {
        path: '/',
        maxAge: -1
    });
    utils.handle.sendSuccess(res, {logout: true});
});

router.get('/user/check-login', (req, res) => {
    const user = req.signedCookies.user;

    // 如果登陆存在，刷新时间
    if (user) {
        res.cookie('user', user, {
            path: '/',
            maxAge: 1000 * 60 * 60,
            signed: true
        });

        utils.handle.sendSuccess(res, user);
    } else {
        utils.handle.sendError(res, '未登录');
    }
});
// router.get('/user/fill', (req, res, next) => model.user.insert().then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err)));

module.exports = router;