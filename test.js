const xx = require('./models/sys/database');

xx.guid.getGuid('dictionary', 'config').then((v) => {
    console.log(v);
});;
