const path = require('path');
const Datastore = require('nedb');
const { readDir } = require('../untils/fs');

const files = readDir(path.join(__dirname, '../db'));

// 一次性载入所有数据库
// for (const item of files) {
//     const root = gname(item.path);
//     if (!dbs[root]) { dbs[root] = {}; }
//     if (!dbs[root][item.folder]) { dbs[root][item.folder] = {}; }
//     dbs[root][item.folder][item.name] = new Datastore({ filename: item.path, autoload: true});
// }

// 获取上一级文件夹名
function gname(s) {
    return s.replace(/\\/g, '/').split('/').reverse().slice(2, 3)[0];
}

function getDB(database, root='usr') {
    let dbs = {};

    for (const item of files) {
        //const root = gname(item.path);
        if (gname(item.path) == root || item.folder == database) { continue; }
        if (!dbs[root]) { dbs[root] = {}; }
        if (!dbs[root][item.folder]) { dbs[root][item.folder] = {}; }
        dbs[root][item.folder][item.name] = new Datastore({ filename: item.path, autoload: true});
    }

    return dbs;
}

module.exports = getDB;