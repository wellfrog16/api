const express = require('express');
const model = require('../models/database');
const router = express.Router();

router.get('/database/list', (req, res, next) => model.database.list(req, res, next));

module.exports = router;