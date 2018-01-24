const moment = require('moment');
const handleSend = require('../../helper/handleSend');
const database = require('../../helper/database');
const dbModel = require('../../models/sys/database');

// 外部测试
// 这么写导致应用一起动就会加载所有的数据库
// 不知道对资源影响大不大
// 如果影响很大，需要把这个调用写到每个的操作里面：insert, list...
// 目前先测试
const db = database('dreamersky', 'usr');

let model = {
    blog: {
        list(req, res) {
            const { page = 1, pagesize = 20 } = req.query;
            db.blog.find({}, { id: 1, type: 1, title: 1, publish: 1, private: 1, createdAt: 1, _id: 0 }).sort({id: -1}).skip((page - 1) * pagesize).limit(pagesize).exec((err1, list) => {
                // 格式化数据
                list.forEach((value, index) => {
                    list[index].date = moment(value.createdAt).format('YYYY-MM-DD');
                });

                db.blog.count({}, (err2, total) => {
                    handleSend(res, (err1 + err2), {total, list});
                });
            });
        },
        detail(req, res) {
            db.dictionary.findOne({id: +req.params.id}, (err, docs) => handleSend(res, err, docs));
        },
        async insert(req, res) {
            const id = await dbModel.guid.getGuid('blog', 'dreamersky');
            let data = Object.assign({id}, req.body, {
                createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
            });
            db.blog.insert(data, (err, docs) => handleSend(res, err, docs));
        },
        update(req, res) {
            let data = Object.assign({}, req.body, {
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
            });
            db.dictionary.update({id: +req.params.id}, {$set: data}, {returnUpdatedDocs: true}, (err, numAffected, docs) => handleSend(res, err, docs));
        },
        delete(req, res) {
            db.blog.remove({id: +req.params.id}, {}, (err, numAffected) => handleSend(res, err, numAffected));
        },
        // 发布仅执行一次，执行会更新创建和修改时间。也就是之前属于草稿状态
        changePublish(req, res) {
            db.blog.findOne({id: +req.params.id}, {id: 1, publish: 1, _id: 0}, (err, docs) => {
                if (err && !docs.publish) {
                    handleSend(res, err || docs, docs);
                }
                const data = {
                    publish: true,
                    createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                    updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
                };
                db.blog.update({id: +req.params.id}, {$set: data}, (err, numAffected) => handleSend(res, err, docs));
            });
        },
        // 私有和公开可以反复切换
        changePrivate(req, res) {
            db.blog.findOne({id: +req.params.id}, {id: 1, private: 1, _id: 0}, (err, docs) => {
                if (err) {
                    handleSend(res, err, docs);
                }
                docs.private = !docs.private;
                db.blog.update({id: +req.params.id}, {$set: {private: docs.private}}, (err, numAffected) => handleSend(res, err, docs));
            });
        }
    }
};

module.exports = model;