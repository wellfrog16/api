// const database = require('../../helper/database');
const {handlePromise} = require('../../helper/handle');

const model = (document, database, type = 'usr') => {
    const db = database(database, type);

    let o = {};
    o[document].detail = (id) => {
        return new Promise((resolve, reject) => {
            db[document].findOne({id}, (err, docs) => handlePromise(resolve, reject, err, docs));
        });
    };

    o[document].remove = (id) => {
        return new Promise((resolve, reject) => {
            db.blog.remove({id}, {}, (err, numAffected) => handlePromise(resolve, reject, err, numAffected));
        });
    };

    return o;
};

module.exports = model;
