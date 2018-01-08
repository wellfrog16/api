const express = require('express');
const model = require('../models/usr/config');
const router = express.Router();

router.post('/dictionary', (req, res, next) => model.dictionary.insert(req, res, next));
router.get('/dictionary', (req, res, next) => model.dictionary.list(req, res, next));
router.get('/dictionary/:id(\\d+)', (req, res, next) => model.dictionary.detail(req, res, next));

module.exports = router;