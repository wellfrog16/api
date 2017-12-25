const path = require('path');
const handleSend = require('../helper/handleSend');
const database = require('../helper/database');

const db = database('config', 'sys');


let model = {
    dictionary : {
        insert(req, res, next) {
            let data = Object.assign({}, req.body, {
                createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
            })
            db.dictionary.insert(data, (err, docs)=> handleSend(res, err, docs));
        },
        update(req, res, next) {
            let data = Object.assign({}, req.body, {
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
            })
            db.dictionary.insert(data, (err, docs)=> handleSend(res, err, docs));
        }
    }
};

module.exports = model;