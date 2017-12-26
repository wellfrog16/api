const express = require('express');
const model = require('../models/database');
const router = express.Router();

router.get('/database', (req, res, next) => model.database.list(req, res, next));

module.exports = router;