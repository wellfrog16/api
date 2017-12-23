const path = require('path');
const { readDir } = require('./untils/fs');



var aaa = readDir(path.join(__dirname, './db'));

console.log(aaa);