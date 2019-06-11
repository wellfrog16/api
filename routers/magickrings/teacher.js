const model = require('../../models/usr/magickrings');
const utils = require('../../utils/utils');

const routers = (router) => {
    router.get('/teacher/:id(\\d+)', (req, res) => model['teacher'].detail(req.params.id).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err)));

    router.post('/teacher', (req, res, next) => {
        const member = req.signedCookies.member;
    
        if (member) {
            model['teacher'].insert(member.name, req.body).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
        } else {
            utils.handle.sendError(res, '未登陆');
        }
    });
    
    // 更新
    router.put('/teacher/:id(\\d+)', (req, res, next) => {
        const member = req.signedCookies.member;
    
        if (member) {
            model['teacher'].update(req.params.id, req.body).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
        } else {
            utils.handle.sendError(res, '未登陆');
        }
    });
    
    // 批量删除
    router.delete('/teacher', (req, res, next) => {
        const member = req.signedCookies.member;
    
        if (member) {
            model['teacher'].batchRemove(req.query).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
        } else {
            utils.handle.sendError(res, '未登陆');
        }
    });
    
    // 删除
    router.delete('/teacher/:id(\\d+)', (req, res, next) => {
        const member = req.signedCookies.member;
    
        if (member) {
            model['teacher'].remove(req.params.id).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
        } else {
            utils.handle.sendError(res, '未登陆');
        }
    });
    
    // 请求列表
    router.get('/teacher', (req, res, next) => {
        model['teacher'].list(req.query).then(doc => utils.handle.sendSuccess(res, doc), err => utils.handle.sendError(res, err));
    });
};

module.exports = routers;
