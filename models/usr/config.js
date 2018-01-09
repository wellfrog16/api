const moment = require('moment');
const handleSend = require('../../helper/handleSend');
const database = require('../../helper/database');
const dbModel = require('../../models/sys/database');

// 外部测试
// 这么写导致应用一起动就会加载所有的数据库
// 不知道对资源影响大不大
// 如果影响很大，需要把这个调用写到每个的操作里面：insert, list...
// 目前先测试
const db = database('config', 'usr');

let model = {
    dictionary : {
        list(req, res) {
            const { page = 1, pagesize = 20 } = req.query;
            db.dictionary.find({}).sort({ id: -1}).skip((page - 1) * pagesize).limit(pagesize).exec((err1, list)=> {
                db.dictionary.count({}, (err2, total) => {
                    handleSend(res, (err1 + err2), {total, list});
                });                
            });
        },
        detail(req, res) {
            db.dictionary.findOne({id: +req.params.id}, (err, docs)=> handleSend(res, err, docs));
        },
        async insert(req, res) {
            const id = await dbModel.guid.getGuid('dictionary', 'config');
            let data = Object.assign({id}, req.body, {
                createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
            });
            db.dictionary.insert(data, (err, docs)=> handleSend(res, err, docs));
        },
        update(req, res) {
            let data = Object.assign({}, req.body, {
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
            });
            db.dictionary.update({id: +req.params.id}, { $set: data}, {returnUpdatedDocs: true}, (err, numAffected, docs)=> handleSend(res, err, docs));
        },
        delete(req, res) {
            db.dictionary.remove({id: +req.params.id}, {}, (err, numAffected)=> handleSend(res, err, numAffected));
        }
    }
};

module.exports = model;