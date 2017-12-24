const path = require('path');
const handleSend = require('../helper/handleSend');
const { readDir } = require('../untils/fs');

const files = readDir(path.join(__dirname, '../db'));

// let db = null;

// console.log(11);
// database().then((x)=>{
//     console.log(x.database);
// });
// database().then((x)=>{
//     console.log(x.database);
// });
// console.log(22);
// database.load('database');
//database.load('database').then((value)=> (db = value)).catch((err)=>{ console.log(err); });

//console.log('222222222222222')

let model = {
    database : {
        // insert(req, res, next) {
        //     let data = Object.assign({}, req.body, {
        //         createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        //         updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
        //     })
        //     db.database.insert(data, (err, docs)=> handleSend(res, err, docs));
        // },
        // update(req, res, next) {
        //     let data = Object.assign({}, req.body, {
        //         updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
        //     })
        //     db.database.insert(data, (err, docs)=> handleSend(res, err, docs));
        // },
        list(req, res, next) {
            handleSend(res, null, {list: files});
        }
    }
}

module.exports = model;