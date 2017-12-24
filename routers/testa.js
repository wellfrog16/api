const express = require('express');
const model = require('../models/database');
const router = express.Router();
const a = require('../helper/test');

router.get('/list', (req, res, next) => {
    a();

    res.send({'ok':1});
});

module.exports = router;