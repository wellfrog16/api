const model = require('../../models/usr/magickrings');
const utils = require('../../utils/utils');

const routers = (router) => {
    router.get('/product/:id(\\d+)', (req, res) => model['product'].detail(req.params.id).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err)));

    router.post('/product', (req, res, next) => {
        const member = req.signedCookies.member;

        if (member) {
            model['product'].insert(member.name, req.body).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
        } else {
            utils.handle.sendError(res, '未登陆');
        }
    });

    // 更新
    router.put('/product/:id(\\d+)', (req, res, next) => {
        const member = req.signedCookies.member;

        if (member) {
            model['product'].update(req.params.id, req.body).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
        } else {
            utils.handle.sendError(res, '未登陆');
        }
    });

    // 请求列表
    router.get('/product', (req, res, next) => {
        model['product'].list(req.query).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    });

    // 删除
    router.delete('/product/:id(\\d+)', (req, res, next) => {
        const member = req.signedCookies.member;

        if (member) {
            model['product'].remove(req.params.id).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
        } else {
            utils.handle.sendError(res, '未登陆');
        }
    });

    // 批量删除
    router.delete('/product', (req, res, next) => {
        const member = req.signedCookies.member;

        if (member) {
            model['product'].batchRemove(req.query).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
        } else {
            utils.handle.sendError(res, '未登陆');
        }
    });
};

module.exports = routers;
