var path = require('path');
var nedb = require('nedb');

let sys = new nedb({
    filename: path.join(path.dirname('./db/sys/dblist.db'), 'dblist.db'),
    autoload: true
});

sys.insert({        
    id:1,
    database:'test'
});

sys.insert({        
    id:2,
    database:'jack'
});

sys.update({        
    id: 1
}, {$set:{
    database:'222',
}}, { multi: true });


// let a = {
// load(dbName){
//     new nedb({
//         filename: path.join(__dirname, '../../../db/oib/work/work.db'),
//         autoload: true
//     });
// }
// };

let hello = () => {
    // sys.insert({        
    //     'id':1,
    //     'database':'imooc-shop',
    //     'collection':[
    //         {
    //             'name':'goods.db',
    //             'path':'./db/imooc-shop/goods.db'
    //         }
    //     ]
    // }, () => {});

    // sys.update({        
    //     id: 1
    // }, {$set:{
    //     'database':'222',
    // }}, { upsert: false }, () => {});

    // console.log(path.dirname('../db/sys/news.db'));
    // console.log(path.join(path.dirname('../db/sys/'), 'news.db'));
    // console.log(path.join(path.dirname('../db/sys/news.db'), 'news.db'));


    // console.log(sys);
    // 查询单项
    // sys.findOne({
    //     id: 1
    // }, (err, ret) => {
    //     console.log(err);
    //     console.log(ret);
    // });

    return 1;
};


module.exports = hello;