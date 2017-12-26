const path = require('path');
const handleSend = require('../../helper/handleSend');
const { readDir } = require('../../utils/fs');

const files = readDir(path.join(__dirname, '../../../db'));


//database.load('database').then((value)=> (db = value)).catch((err)=>{ console.log(err); });


let model = {
    database : {
        list(req, res) {
            const { page = 1, pagesize = 20 } = req.query;
            handleSend(res, null, {total: files.length, list: files.page(page, pagesize)});
        }
    }
};

module.exports = model;