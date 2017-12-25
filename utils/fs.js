const fs = require('fs');
const path = require('path');
const moment = require('moment');

function readDir(dir) {
    var files = [];

    if (fs.existsSync(dir)) {

        // 遍历文件
        fs.readdirSync(dir).forEach((filename) =>{
            const filepath = path.join(dir, filename);
            const stat = fs.statSync(filepath);

            if (stat && stat.isDirectory()) {  
                files = files.concat(readDir(filepath));
            }  
            else {
                files.push({
                    fullname:filename,
                    name: filename.split('.').slice(0, 1)[0],
                    suffix: filename.split('.').slice(1)[0],
                    folder: dir.replace(/\\/g, '/').split('/').reverse().slice(0,1)[0],
                    bytes: stat.size,
                    size: bytesToSize(stat.size),
                    path: path.normalize(path.join(dir, filename)),
                    mtime: moment(stat.mtime).format('YYYY-MM-DD HH:mm:ss'),
                    ctime: moment(stat.ctime).format('YYYY-MM-DD HH:mm:ss')
                });
            }  
        });
    }
  
    return files;
}

function bytesToSize(bytes) {  
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];  

    let i = Math.floor(Math.log(bytes) / Math.log(k));  

    // return (bytes / Math.pow(k, i)) + ' ' + sizes[i];   
    // toPrecision(3) 后面保留一位小数，如1.0GB
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];  
}  

module.exports = { readDir };