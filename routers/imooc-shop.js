const express = require('express');
const router = express.Router();

router.get('/list', (req, res) => {  
    res.send({ content: 'list' });  
});


router.get('/detail/:id', (req, res) => { 
    res.send({ content: 'detail', id : req.params.id });  
}); 


module.exports = router;