const moment = require('moment');
const handleSend = require('../../helper/handleSend');
const database = require('../../helper/database');

const db = database('database', 'sys');

let model = {
    guid : {
        getGuid(collection, database, root='usr') {
            return new Promise((resolve, reject) => {
                db.guid.findOne({collection, database, root}, (err, docs) => {
                    if (docs) { // 已有
                        resolve(99);
                    }
                    else {
                        this.insert(collection, database, root).then((v) => resolve(v));
                    }
                });
            });
        },
        insert(collection, database, root='usr'){
            return new Promise((resolve, reject) => {
                db.guid.insert({collection, database, root, id: 1}, (err, docs) => {
                    resolve(1);
                });
            });
        },
        update(){

        }
    }
};

module.exports = model;