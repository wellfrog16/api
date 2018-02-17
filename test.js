// const xx = require('./models/sys/database');

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

// xx.guid.getGuid('dictionary', 'config').then((v) => {
//     // console.log(v);
// });

var x = () => new Promise((resolve, reject) => {
    const a = 1;
    if (a > 2) {
        resolve('正确');
    } else {
        reject(new Error('错误'));
    }
}).then(v => Promise.resolve('11111')).catch(v => Promise.reject('22222'));

// var y = () => new Promise((resolve, reject) => {
//     x().then((v) => {
//         console.log('--------');
//         console.log(v);
//         resolve(v);
//     }).catch((v) => {
//         console.log('=========');
//         console.log(v);
//         Promise.reject(v);
//     });
// });

var y = async function() {

    try {
        const bb = await x();
        console.log(bb);
        return bb;
    } catch (e) {
        console.log(1122343);
        console.log(e);
        return e;
    }
};

async function qq() {
    const aa = await y();
    console.log('============+++++++++++');
    console.log(aa);
}

qq();
