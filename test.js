const xx = require('./models/sys/database');

// xx.guid.getGuid('dictionary', 'config').then((v) => {
//     console.log(v);
// }).then(()=>{
//     console.log(11);
// }).then(()=>{
//     console.log(22);
// }).then(()=>{
//     console.log(33);
// });

// console.log(xx.guid.getGuid('dictionary', 'config').then((v) => {
//     console.log(v);
// }));

xx.guid.getGuid('dictionary', 'config').then((v) => {
    console.log(v);
});
