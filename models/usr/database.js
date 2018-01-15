const handleSend = require('../../helper/handleSend');
const { readDir } = require('../../utils/fs');
const config = require('../../helper/config');

const files = readDir(config.dbPath);

// database.load('database').then((value)=> (db = value)).catch((err)=>{ console.log(err); });

let model = {
    database: {
        list(req, res) {
            const { page = 1, pagesize = 20 } = req.query;
            handleSend(res, null, {total: files.length, list: files.page(page, pagesize)});
        }
    }
};

module.exports = model;
