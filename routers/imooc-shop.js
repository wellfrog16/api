const express = require('express');
const hello = require('../helper/databse');
const router = express.Router();

hello();


// let shop = db.load('imooc-shop');

// shop.goods.findOne()

router.get('/list', (req, res) => {
    res.send({ content: 'list' });  
});


router.get('/detail/:id', (req, res) => { 
    res.send({ content: 'detail', id : req.params.id });  
}); 


module.exports = router;