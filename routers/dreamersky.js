const express = require('express');
const model = require('../models/usr/dreamersky');
const router = express.Router();

router.post('/blog', (req, res, next) => model.blog.insert(req, res, next));
router.put('/blog/:id(\\d+)', (req, res, next) => model.blog.update(req, res, next));
router.put('/blog/:id(\\d+)/changePublish', (req, res, next) => model.blog.changePublish(req, res, next));
router.put('/blog/:id(\\d+)/changePrivate', (req, res, next) => model.blog.changePrivate(req, res, next));
router.delete('/blog/:id(\\d+)', (req, res, next) => model.blog.delete(req, res, next));
router.get('/blog', (req, res, next) => model.blog.list(req, res, next));
router.get('/blog/:id(\\d+)', (req, res, next) => model.blog.detail(req, res, next));

module.exports = router;