const express = require('express');
const model = require('../models/usr/magickrings');
const utils = require('../utils/utils');
const router = express.Router();
const tearcherRouters = require('./magickrings/teacher');
const productRouters = require('./magickrings/product');

tearcherRouters(router);
productRouters(router);

// 隐私条款
router.put('/clause', (req, res, next) => {
    const member = req.signedCookies.member;

    if (member) {
        // model.cart.update(user.id, req.body).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
        model.clause.update(req.body).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});
router.get('/clause', (req, res) => model.clause.detail(req.query).then(docs => utils.handle.sendSuccess(res, docs), err => utils.handle.sendError(res, err)));

// 品牌故事
router.put('/notification', (req, res, next) => {
    const member = req.signedCookies.member;

    if (member) {
        // model.cart.update(user.id, req.body).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
        model.notification.update(req.body).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});
router.get('/notification', (req, res) => model.notification.detail().then(docs => utils.handle.sendSuccess(res, docs), err => utils.handle.sendError(res, err)));

// 品牌故事
router.put('/story', (req, res, next) => {
    const member = req.signedCookies.member;

    if (member) {
        // model.cart.update(user.id, req.body).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
        model.story.update(req.body).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});
router.get('/story', (req, res) => model.story.detail(req.query).then(docs => utils.handle.sendSuccess(res, docs), err => utils.handle.sendError(res, err)));

// 课程模块
// -----------------------
router.get('/course/:id(\\d+)', (req, res) => model['course'].detail(req.params.id).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err)));

router.post('/course', (req, res, next) => {
    const member = req.signedCookies.member;

    if (member) {
        model['course'].insert(member.name, req.body).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

// 更新
router.put('/course/:id(\\d+)', (req, res, next) => {
    const member = req.signedCookies.member;

    if (member) {
        model['course'].update(req.params.id, req.body).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

// 批量删除
router.delete('/course', (req, res, next) => {
    const member = req.signedCookies.member;

    if (member) {
        model['course'].batchRemove(req.query).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

// 删除
router.delete('/course/:id(\\d+)', (req, res, next) => {
    const member = req.signedCookies.member;

    if (member) {
        model['course'].remove(req.params.id).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

// 请求列表
router.get('/course', (req, res, next) => {
    model['course'].list(req.query).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
});

// 淘宝买家秀
// -----------------------
router.get('/taobao-info/:id(\\d+)', (req, res) => model['taobao-info'].detail(req.params.id).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err)));

router.post('/taobao-info', (req, res, next) => {
    const member = req.signedCookies.member;

    if (member) {
        model['taobao-info'].insert(member.name, req.body).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

// 更新
router.put('/taobao-info/:id(\\d+)', (req, res, next) => {
    const member = req.signedCookies.member;

    if (member) {
        model['taobao-info'].update(req.params.id, req.body).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

// 批量删除
router.delete('/taobao-info', (req, res, next) => {
    const member = req.signedCookies.member;

    if (member) {
        model['taobao-info'].batchRemove(req.query).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

// 删除
router.delete('/taobao-info/:id(\\d+)', (req, res, next) => {
    const member = req.signedCookies.member;

    if (member) {
        model['taobao-info'].remove(req.params.id).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

// 请求列表
router.get('/taobao-info', (req, res, next) => {
    model['taobao-info'].list(req.query).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
});

// 学员资质
// -----------------------
router.get('/student/:id(\\d+)', (req, res) => model['student'].detail(req.params.id).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err)));

router.post('/student', (req, res, next) => {
    const member = req.signedCookies.member;

    if (member) {
        model['student'].insert(member.name, req.body).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

// 更新
router.put('/student/:id(\\d+)', (req, res, next) => {
    const member = req.signedCookies.member;

    if (member) {
        model['student'].update(req.params.id, req.body).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

// 批量删除
router.delete('/student', (req, res, next) => {
    const member = req.signedCookies.member;

    if (member) {
        model['student'].batchRemove(req.query).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

// 删除
router.delete('/student/:id(\\d+)', (req, res, next) => {
    const member = req.signedCookies.member;

    if (member) {
        model['student'].remove(req.params.id).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

// 请求列表
router.get('/student', (req, res, next) => {
    model['student'].list(req.query).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
});

// 分类
// --------------------------------
router.get('/category/:id(\\d+)', (req, res) => model['category'].detail(req.params.id).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err)));

router.post('/category', (req, res, next) => {
    const member = req.signedCookies.member;

    if (member) {
        model['category'].insert(member.name, req.body).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

// 更新
router.put('/category/:id(\\d+)', (req, res, next) => {
    const member = req.signedCookies.member;

    if (member) {
        model['category'].update(req.params.id, req.body).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

// 请求列表
router.get('/category', (req, res, next) => {
    model['category'].list(req.query).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
});

// 子分类
// --------------------------------
router.get('/category/:id(\\d+)/children', (req, res, next) => {
    model['category'].listChildren(req.params.id).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
});

router.post('/category/:id(\\d+)/children', (req, res, next) => {
    const member = req.signedCookies.member;

    if (member) {
        model['category'].appendChildren(member.name, req.params.id, req.body).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

router.put('/category/:id(\\d+)/children', (req, res, next) => {
    const member = req.signedCookies.member;

    if (member) {
        model['category'].modifyChildren(req.params.id, req.body).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

router.delete('/category/:id(\\d+)/children/:childrenId(\\d+)', (req, res, next) => {
    const member = req.signedCookies.member;

    if (member) {
        model['category'].removeChildren(req.params.id, req.params.childrenId).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    } else {
        utils.handle.sendError(res, '未登陆');
    }
});

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