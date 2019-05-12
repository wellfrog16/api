const database = require('../../helper/database');
const utils = require('../../utils/utils');
// const dbModel = require('../../models/sys/database');
// const moment = require('moment');
// const Chance = require('chance');
// const chance = new Chance();

const db = database('magickrings', 'usr');

let model = {};

// 隐私条款
model.clause = {
    detail() {
        return new Promise((resolve, reject) => {
            db.clause.findOne({guid: 'clause'}, (err, doc) => utils.promise.test(resolve, reject, err, doc));
        });
    },
    update(userDoc) {
        delete userDoc._id;
        return new Promise((resolve, reject) => {
            db.clause.update({guid: 'clause'}, {$set: userDoc}, {returnUpdatedDocs: true, upsert: true}, (err, numAffected, doc) => utils.promise.test(resolve, reject, err, numAffected));
        });
    }
};

// 用户
model.member = {
    detail(id) {
        // 数值化
        id = +id;

        return new Promise((resolve, reject) => {
            db['member'].findOne({id}, (err, doc) => utils.promise.test(resolve, reject, err, doc));
        });
    },
    // 临时添加固定用户
    insert() {
        let id = 1;

        let data = Object.assign({id}, {
            name: 'admin',
            password: 'admin159753!',
            roles: 'admin'
        });

        return new Promise((resolve, reject) => {
            db.member.insert(data, (err, doc) => utils.promise.test(resolve, reject, err, doc));
        });
    },

    // 登入
    login(name, password) {
        return new Promise((resolve, reject) => {
            db.member.findOne({name, password}, (err, doc) => {
                const result = { };
                if (doc) {
                    result.token = 'token';
                    result.id = doc.id;
                    result.name = doc.name;
                }
                return utils.promise.test(resolve, reject, err, result);
            });
        });
    }
};

module.exports = model;
