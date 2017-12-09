const path = require('path');
const Datastore = require('nedb');

let dblist = new Datastore({
    //filename: path.join(path.dirname('./db/sys/dblist.db'), 'dblist.db'),
    filename: path.join(__dirname, '../db/sys/dblist.db'),
    // filename: './db/sys/dblist.db',
    autoload: true
});

let a = {
    load(dbName){
        return new Promise((resolve, reject)=>{
            dblist.findOne({ database: dbName }, (err, docs)=>{
                if (err === null) {
                    let dbs = {};
                    for (const item of docs.collection) {
                        dbs[item.name] = new Datastore({ filename: path.join(__dirname, item.path), autoload: true});
                    }
                    resolve(dbs);
                }
                else { reject(err); }
            })
        })
    }
};

let hello = () => {
    // dblist.insert({        
    //     'id':1,
    //     'database':'imooc-shop',
    //     'collection':[
    //         {
    //             'name':'goods.db',
    //             'path':'./db/imooc-shop/goods.db'
    //         },
    //         {
    //             'name':'user.db',
    //             'path':'./db/imooc-shop/user.db'
    //         }
    //     ]
    // }, () => {});

    return 1;
};


module.exports = a;