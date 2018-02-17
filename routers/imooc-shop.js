const express = require('express');
const model = require('../models/usr/imooc-shop');
const handleSend = require('../helper/handleSend');
const router = express.Router();

router.get('/goods/fill', (req, res, next) => model.goods.insert(req, res, next));
router.get('/goods', (req, res) => model.goods.list(req.query).then((docs, err) => { handleSend(res, err, docs); }));
router.get('/goods/:id(\\d+)', (req, res) => model.goods.detail(+req.params.id).then((docs, err) => { handleSend(res, err, docs); }));

// 购物车
router.get('/cart', (req, res, next) => model.cart.add(+req.params.id).then((doc, err) => { handleSend(res, err, doc); }));
router.post('/cart/:id(\\d+)', (req, res, next) => model.cart.add(+req.params.id).then((doc, err) => { handleSend(res, err, doc); }));

// user，简单cookie校验
router.get('/user/:id(\\d+)', (req, res) => model.user.detail(+req.params.id).then((docs, err) => handleSend(res, err, docs)));
router.post('/user/login', (req, res) => model.user.login(req.body.name, req.body.password).then((doc, err) => {
    // 登陆成功
    if (doc.id) {
        res.cookie('user', doc, {
            path: '/',
            maxAge: 1000 * 60 * 60,
            signed: true
        });
    }
    return handleSend(res, err, doc);
}));
router.get('/user/logout', (req, res) => {
    res.cookie('user', '', {
        path: '/',
        maxAge: -1
    });
    return handleSend(res, null, {'logout': 'ok'});
});
router.get('/user/checklogin', (req, res) => {
    const user = req.signedCookies.user;
    // 如果登陆存在，刷新时间
    if (user) {
        res.cookie('user', user, {
            path: '/',
            maxAge: 1000 * 60 * 60,
            signed: true
        });
    }
    return handleSend(res, null, user);
});
router.get('/user/fill', (req, res, next) => model.user.insert().then((docs, err) => { handleSend(res, err, docs); }));

module.exports = router;