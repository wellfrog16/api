const path = require('path');
const Datastore = require('nedb');


function a() {
    let dblist = new Datastore({
        //filename: path.join(path.dirname('./db/sys/dblist.db'), 'dblist.db'),
        filename: path.join(__dirname, '../db/sys/database/database.db'),
        // filename: './db/sys/dblist.db',
        autoload: true
    });

    console.log(a);

    return dblist;
}

module.exports = a;