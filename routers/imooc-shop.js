const express = require('express');
const model = require('../models/usr/imooc-shop');
const router = express.Router();


router.get('/add', (req, res) => {
    res.send({ content: 'add' });  
});

router.get('/edit', (req, res) => {
    res.send({ content: 'edit' });  
});


router.get('/goods/list', (req, res, next) => model.goods.list(req, res, next));
router.get('/goods/detail/:id(\\d+)', (req, res, next) => model.goods.detail(req, res, next));


module.exports = router;