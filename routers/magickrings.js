const express = require('express');
const model = require('../models/usr/magickrings');
const utils = require('../utils/utils');
const router = express.Router();

// 隐私条款
router.put('/clause', (req, res, next) => {
    const user = req.signedCookies.user;

    if (user) {
        // model.cart.update(user.id, req.body).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
        model.clause.update(req.body).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});
router.get('/clause', (req, res) => model.clause.detail(req.query).then(docs => utils.handle.sendSuccess(res, docs), err => utils.handle.sendError(res, err)));

// 用户
// -----------------------
// 登陆
router.post('/member/login', (req, res) => model.member.login(req.body.name, req.body.password).then(doc => {
    // 登陆成功
    if (doc.id) {
        res.cookie('member', doc, {
            path: '/',
            maxAge: 1000 * 60 * 60,
            signed: true
        });

        utils.handle.sendSuccess(res, doc);
    } else {
        utils.handle.sendError(res, '未获取到用户信息');
    }
}).catch(err => utils.handle.sendError(res, err)));

// 登出
router.get('/member/logout', (req, res) => {
    res.cookie('member', '', {
        path: '/',
        maxAge: -1
    });
    utils.handle.sendSuccess(res, {logout: true});
});

// 获取固定人员信息
router.get('/member', (req, res) => {
    const member = req.signedCookies.member;

    // 如果登陆存在，刷新时间
    if (member) {
        res.cookie('member', member, {
            path: '/',
            maxAge: 1000 * 60 * 60,
            signed: true
        });

        model.member.detail(1).then(
            doc => {
                delete doc._id;
                delete doc.password;
                utils.handle.sendSuccess(res, doc);
            },
            err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登录');
    }
});
// router.get('/member/fill', (req, res, next) => model.member.insert().then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err)));

module.exports = router;