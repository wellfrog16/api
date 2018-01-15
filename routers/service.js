const express = require('express');
const model = require('../models/sys/service');
const router = express.Router();
const upload = require('../helper/upload/image');

router.post('/file/upload', upload.single('avatar'), (req, res, next) => model.file.upload(req, res, next));

module.exports = router;