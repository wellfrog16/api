// const moment = require('moment');
// const handleSend = require('../../helper/handleSend');
const database = require('../../helper/database');

const db = database('database', 'sys');

let model = {
    guid: {
        getGuid(collection, database, root = 'usr') {
            return new Promise((resolve, reject) => {
                db.guid.findOne({collection, database, root}, (err, docs) => {
                    if (err) {

                    }
                    if (docs) { // 已有
                        this.update(collection, database, root).then(v => resolve(v)).catch(err => reject(err));
                    } else {
                        this.insert(collection, database, root).then(v => resolve(v)).catch(err => reject(err));
                    }
                });
            });
        },
        insert(collection, database, root = 'usr') {
            return new Promise((resolve, reject) => {
                db.guid.insert({collection, database, root, id: 1}, (err) => {
                    if (!err) {
                        resolve(1);
                    } else {
                        reject(err);
                    }
                });
            });
        },
        update(collection, database, root = 'usr') {
            return new Promise((resolve, reject) => {
                db.guid.update({collection, database, root}, { $inc: { id: 1 } }, {returnUpdatedDocs: true}, (err, numAffected, docs) => {
                    if (!err) {
                        resolve(docs.id);
                    } else {
                        reject(err);
                    }
                });
            });
        }
    }
};

module.exports = model;
