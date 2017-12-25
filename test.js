require('./utils/prototype');
const path = require('path');
const { readDir } = require('./utils/fs');

var aaa = readDir(path.join(__dirname, '../db'));

console.log(aaa.page(2, 2));