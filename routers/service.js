const express = require('express');
const model = require('../models/sys/service');
const router = express.Router();

router.post('/file/upload', (req, res, next) => model.file.upload(req, res, next));

module.exports = router;