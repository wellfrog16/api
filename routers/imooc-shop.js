const express = require('express');
const model = require('../models/usr/imooc-shop');
const handleSend = require('../helper/handleSend');
const router = express.Router();

router.get('/goods/fill', (req, res, next) => model.goods.insert(req, res, next));
router.get('/goods', (req, res) => model.goods.list(req.query).then((docs, err) => { handleSend(res, err, docs); }));
router.get('/goods/:id(\\d+)', (req, res) => model.goods.detail(+req.params.id).then((docs, err) => { handleSend(res, err, docs); }));

router.get('/cart/:id(\\d+)', (req, res, next) => model.cart.add(+req.params.id).then((doc, err) => { handleSend(res, err, doc); }));

router.get('/user/:id(\\d+)', (req, res) => model.user.detail(+req.params.id).then((docs, err) => { handleSend(res, err, docs); }));
router.get('/user/fill', (req, res, next) => model.user.insert().then((docs, err) => { handleSend(res, err, docs); }));

module.exports = router;