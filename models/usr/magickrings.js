const database = require('../../helper/database');
const utils = require('../../utils/utils');
const dbModel = require('../../models/sys/database');
const moment = require('moment');
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

// 品牌故事
model.story = {
    detail() {
        return new Promise((resolve, reject) => {
            db.story.findOne({guid: 'story'}, (err, doc) => utils.promise.test(resolve, reject, err, doc));
        });
    },
    update(userDoc) {
        delete userDoc._id;
        return new Promise((resolve, reject) => {
            db.story.update({guid: 'story'}, {$set: userDoc}, {returnUpdatedDocs: true, upsert: true}, (err, numAffected, doc) => utils.promise.test(resolve, reject, err, numAffected));
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

model['taobao-info'] = {
    // 单品详细
    detail(id) {
        // 数值化
        id = +id;

        return new Promise((resolve, reject) => {
            db['taobao-info'].findOne({id}, (err, doc) => utils.promise.test(resolve, reject, err, doc));
        });
    },

    async insert(name, data) {
        let id = 0;

        // 尝试获取
        try {
            id = await dbModel.guid.getGuid('taobao-info', 'magickrings');
        } catch (e) {
            return utils.promise.reject(e);
        }

        data.id = id;
        data.createdUser = name;
        data.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');

        return new Promise((resolve, reject) => {
            db['taobao-info'].insert(data, (err, doc) => utils.promise.test(resolve, reject, err, doc));
        });
    },

    update(id, data) {
        delete data.id;
        return new Promise((resolve, reject) => {
            db['taobao-info'].update({id: +id}, {$set: data}, {returnUpdatedDocs: true}, (err, numAffected, doc) => utils.promise.test(resolve, reject, err, numAffected));
        });
    },

    remove(id) {
        return new Promise((resolve, reject) => {
            db['taobao-info'].remove({id: +id}, {}, (err, numAffected) => utils.promise.test(resolve, reject, err, numAffected));
        });
    },

    batchRemove({ ids }) {
        let effect = ids.split(',').length;

        try {
            ids.split(',').forEach(id => {
                model['taobao-info'].remove(id);
            });

            return utils.promise.resolve({effect});
        } catch (e) {
            return utils.promise.reject(e);
        }
    },

    // 列表，带分页
    list(query) {
        const { p = 1, ps = 20, q } = query;

        const pattern = new RegExp(q, 'gi');

        // 查询参数
        let params = {
            $or: [
                { title: { $regex: pattern } },
                { author: { $regex: pattern } },
                { message: { $regex: pattern } },
            ],
        };

        return new Promise((resolve, reject) => {
            db['taobao-info'].find(params).sort({createdAt: -1}).skip((p - 1) * ps).limit(+ps).exec((err1, list) => {
                db['taobao-info'].count(params, (err2, total) => utils.promise.test(resolve, reject, (err1 + err2), {total, list}));
            });
        });
    },
};

model['student'] = {
    // 单品详细
    detail(id) {
        // 数值化
        id = +id;

        return new Promise((resolve, reject) => {
            db['student'].findOne({id}, (err, doc) => utils.promise.test(resolve, reject, err, doc));
        });
    },

    async insert(name, data) {
        let id = 0;

        // 尝试获取
        try {
            id = await dbModel.guid.getGuid('student', 'magickrings');
        } catch (e) {
            return utils.promise.reject(e);
        }

        data.id = id;
        data.createdUser = name;
        data.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');

        return new Promise((resolve, reject) => {
            db['student'].insert(data, (err, doc) => utils.promise.test(resolve, reject, err, doc));
        });
    },

    update(id, data) {
        delete data.id;
        return new Promise((resolve, reject) => {
            db['student'].update({id: +id}, {$set: data}, {returnUpdatedDocs: true}, (err, numAffected, doc) => utils.promise.test(resolve, reject, err, numAffected));
        });
    },

    remove(id) {
        return new Promise((resolve, reject) => {
            db['student'].remove({id: +id}, {}, (err, numAffected) => utils.promise.test(resolve, reject, err, numAffected));
        });
    },

    batchRemove({ ids }) {
        let effect = ids.split(',').length;

        try {
            ids.split(',').forEach(id => {
                model['student'].remove(id);
            });

            return utils.promise.resolve({effect});
        } catch (e) {
            return utils.promise.reject(e);
        }
    },

    // 列表，带分页
    list(query) {
        const { p = 1, ps = 20, q, course } = query;

        const pattern = new RegExp(q, 'gi');

        // 查询参数
        let params = {
            $or: [
                { name: { $regex: pattern } },
                { code: { $regex: pattern } },
            ],
        };

        if (course && course.length > 0) {
            params.course = { $in: course };
        }

        return new Promise((resolve, reject) => {
            db['student'].find(params).sort({createdAt: -1}).skip((p - 1) * ps).limit(+ps).exec((err1, list) => {
                db['student'].count(params, (err2, total) => utils.promise.test(resolve, reject, (err1 + err2), {total, list}));
            });
        });
    },
};

model['teacher'] = {
    // 单品详细
    detail(id) {
        // 数值化
        id = +id;

        return new Promise((resolve, reject) => {
            db['teacher'].findOne({id}, (err, doc) => utils.promise.test(resolve, reject, err, doc));
        });
    },

    async insert(name, data) {
        let id = 0;

        // 尝试获取
        try {
            id = await dbModel.guid.getGuid('teacher', 'magickrings');
        } catch (e) {
            return utils.promise.reject(e);
        }

        data.id = id;
        data.createdUser = name;
        data.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');

        return new Promise((resolve, reject) => {
            db['teacher'].insert(data, (err, doc) => utils.promise.test(resolve, reject, err, doc));
        });
    },

    update(id, data) {
        delete data.id;
        return new Promise((resolve, reject) => {
            db['teacher'].update({id: +id}, {$set: data}, {returnUpdatedDocs: true}, (err, numAffected, doc) => utils.promise.test(resolve, reject, err, numAffected));
        });
    },

    remove(id) {
        return new Promise((resolve, reject) => {
            db['teacher'].remove({id: +id}, {}, (err, numAffected) => utils.promise.test(resolve, reject, err, numAffected));
        });
    },

    batchRemove({ ids }) {
        let effect = ids.split(',').length;

        try {
            ids.split(',').forEach(id => {
                model['teacher'].remove(id);
            });

            return utils.promise.resolve({effect});
        } catch (e) {
            return utils.promise.reject(e);
        }
    },

    // 列表，带分页
    list(query) {
        const { p = 1, ps = 20, q, course } = query;

        const pattern = new RegExp(q, 'gi');

        // 查询参数
        let params = {
            $or: [
                { name: { $regex: pattern } },
                { code: { $regex: pattern } },
            ],
        };

        if (course && course.length > 0) {
            params.course = { $in: course };
        }

        return new Promise((resolve, reject) => {
            db['teacher'].find(params).sort({createdAt: -1}).skip((p - 1) * ps).limit(+ps).exec((err1, list) => {
                db['teacher'].count(params, (err2, total) => utils.promise.test(resolve, reject, (err1 + err2), {total, list}));
            });
        });
    },
};

model['category'] = {
    // 单品详细
    detail(id) {
        // 数值化
        id = +id;

        return new Promise((resolve, reject) => {
            db['category'].findOne({id}, (err, doc) => utils.promise.test(resolve, reject, err, doc));
        });
    },

    async insert(name, data) {
        let id = 0;

        // 尝试获取
        try {
            id = await dbModel.guid.getGuid('category', 'magickrings');
        } catch (e) {
            return utils.promise.reject(e);
        }

        data.id = id;
        data.createdUser = name;
        data.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');

        return new Promise((resolve, reject) => {
            db['category'].insert(data, (err, doc) => utils.promise.test(resolve, reject, err, doc));
        });
    },

    update(id, data) {
        delete data.id;
        return new Promise((resolve, reject) => {
            db['category'].update({id: +id}, {$set: data}, {returnUpdatedDocs: true}, (err, numAffected, doc) => utils.promise.test(resolve, reject, err, numAffected));
        });
    },

    // 列表，带分页
    list(query) {
        const { p = 1, ps = 20 } = query;

        let params = {};

        return new Promise((resolve, reject) => {
            db['category'].find(params).sort({id: 1}).skip((p - 1) * ps).limit(+ps).exec((err1, list) => {
                db['category'].count(params, (err2, total) => utils.promise.test(resolve, reject, (err1 + err2), {total, list}));
            });
        });
    },

    async listChildren(id) {
        let doc = null;
        // 尝试获取
        try {
            doc = await model['category'].detail(id);
        } catch (e) {
            return utils.promise.reject(e);
        }

        try {
            return utils.promise.resolve({ list: doc.children });
        } catch (e) {
            return utils.promise.reject(e);
        }
    },

    async appendChildren(name, categoryId, data) {
        let doc = null;
        // 尝试获取
        try {
            doc = await model['category'].detail(categoryId);
        } catch (e) {
            return utils.promise.reject(e);
        }

        let id = 0;

        // 尝试获取
        try {
            id = await dbModel.guid.getGuid('category-children', 'magickrings');
        } catch (e) {
            return utils.promise.reject(e);
        }

        data.id = id;
        data.createdUser = name;
        data.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
        doc.children = doc.children || [];
        doc.children = [...doc.children, data];

        try {
            await model['category'].update(categoryId, doc);
            return utils.promise.resolve({ id: data.id });
        } catch (e) {
            return utils.promise.reject(e);
        }
    },

    async removeChildren(categoryId, childrenId) {
        let doc = null;
        // 尝试获取
        try {
            doc = await model['category'].detail(categoryId);
        } catch (e) {
            return utils.promise.reject(e);
        }

        const index = doc.children.findIndex(item => item.id === childrenId);
        doc.children.splice(index, 1);

        try {
            await model['category'].update(categoryId, doc);
            return utils.promise.resolve({ id: categoryId });
        } catch (e) {
            return utils.promise.reject(e);
        }
    },

    async modifyChildren(categoryId, data) {
        let doc = null;
        // 尝试获取
        try {
            doc = await model['category'].detail(categoryId);
        } catch (e) {
            return utils.promise.reject(e);
        }

        doc.children.forEach(item => {
            if (item.id === data.id) {
                item.name = data.name;
            }
        });

        // console.log(doc);

        try {
            await model['category'].update(categoryId, doc);
            return utils.promise.resolve({ id: categoryId });
        } catch (e) {
            return utils.promise.reject(e);
        }
    }
};

model['product'] = {
    // 单品详细
    detail(id) {
        // 数值化
        id = +id;

        return new Promise((resolve, reject) => {
            db['product'].findOne({id}, (err, doc) => utils.promise.test(resolve, reject, err, doc));
        });
    },

    async insert(name, data) {
        let id = 0;

        // 尝试获取
        try {
            id = await dbModel.guid.getGuid('product', 'magickrings');
        } catch (e) {
            return utils.promise.reject(e);
        }

        data.id = id;
        data.createdUser = name;
        data.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');

        return new Promise((resolve, reject) => {
            db['product'].insert(data, (err, doc) => utils.promise.test(resolve, reject, err, doc));
        });
    },

    update(id, data) {
        delete data.id;
        return new Promise((resolve, reject) => {
            db['product'].update({id: +id}, {$set: data}, {returnUpdatedDocs: true}, (err, numAffected, doc) => utils.promise.test(resolve, reject, err, numAffected));
        });
    },

    // 列表，带分页
    async list(query) {
        let categoryList = null;
        // 尝试获取
        try {
            const doc = await model['category'].list({ p: 1, ps: 100 });
            categoryList = doc.list;
        } catch (e) {
            return utils.promise.reject(e);
        }

        const { p = 1, ps = 20, q, category, child, ids } = query;

        const pattern = new RegExp(q, 'gi');

        // 查询参数
        let params = {
            $or: [
                { name: { $regex: pattern } },
            ],
        };

        if (category) {
            params.category = +category;
        }

        if (child) {
            params.child = +child;
        }

        if (ids) {
            const arrId = ids.split(',').map(item => +item);
            params.id = { $in: arrId };
        }

        return new Promise((resolve, reject) => {
            db['product'].find(params).sort({createdAt: -1}).skip((p - 1) * ps).limit(+ps).exec((err1, list) => {
                // console.log(categoryList);
                // console.log(list);
                list.forEach(item => {
                    const category = categoryList.find(t => t.id === item.category);
                    item.categoryName = category.children.find(t => t.id === item.child).name;
                });
                db['product'].count(params, (err2, total) => utils.promise.test(resolve, reject, (err1 + err2), {total, list}));
            });
        });
    },

    remove(id) {
        return new Promise((resolve, reject) => {
            db['product'].remove({id: +id}, {}, (err, numAffected) => utils.promise.test(resolve, reject, err, numAffected));
        });
    },

    batchRemove({ ids }) {
        let effect = ids.split(',').length;

        try {
            ids.split(',').forEach(id => {
                model['product'].remove(id);
            });

            return utils.promise.resolve({effect});
        } catch (e) {
            return utils.promise.reject(e);
        }
    },
};

model['course'] = {
    // 单品详细
    detail(id) {
        // 数值化
        id = +id;

        return new Promise((resolve, reject) => {
            db['course'].findOne({id}, (err, doc) => utils.promise.test(resolve, reject, err, doc));
        });
    },

    async insert(name, data) {
        let id = 0;

        // 尝试获取
        try {
            id = await dbModel.guid.getGuid('course', 'magickrings');
        } catch (e) {
            return utils.promise.reject(e);
        }

        data.id = id;
        data.createdUser = name;
        data.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');

        return new Promise((resolve, reject) => {
            db['course'].insert(data, (err, doc) => utils.promise.test(resolve, reject, err, doc));
        });
    },

    update(id, data) {
        delete data.id;
        return new Promise((resolve, reject) => {
            db['course'].update({id: +id}, {$set: data}, {returnUpdatedDocs: true}, (err, numAffected, doc) => utils.promise.test(resolve, reject, err, numAffected));
        });
    },

    remove(id) {
        return new Promise((resolve, reject) => {
            db['course'].remove({id: +id}, {}, (err, numAffected) => utils.promise.test(resolve, reject, err, numAffected));
        });
    },

    batchRemove({ ids }) {
        let effect = ids.split(',').length;

        try {
            ids.split(',').forEach(id => {
                model['course'].remove(id);
            });

            return utils.promise.resolve({effect});
        } catch (e) {
            return utils.promise.reject(e);
        }
    },

    // 列表，带分页
    list(query) {
        const { p = 1, ps = 20, q, course } = query;

        const pattern = new RegExp(q, 'gi');

        // 查询参数
        let params = {
            $or: [
                { name: { $regex: pattern } },
                { code: { $regex: pattern } },
            ],
        };

        if (course && course.length > 0) {
            params.course = { $in: course };
        }

        return new Promise((resolve, reject) => {
            db['course'].find(params).sort({createdAt: -1}).skip((p - 1) * ps).limit(+ps).exec((err1, list) => {
                db['course'].count(params, (err2, total) => utils.promise.test(resolve, reject, (err1 + err2), {total, list}));
            });
        });
    },
};

module.exports = model;
