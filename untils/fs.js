const fs = require("fs");
const path = require('path');

function readDir(dir) {
    var files = []

    fs.readdirSync(dir).forEach((filename) =>{
        const filepath = path.join(dir, filename);
        const stat = fs.statSync(filepath);

        if (stat && stat.isDirectory()) {  
            children = children.concat(readDir(filepath));
        }  
        else {  
            files.push({
                fullname:filename,
                name: filename.split('.').slice(0, 1)[0],
                suffix: filename.split('.').slice(1)[0],
                folder: dir.split('\\').reverse().slice(0,1)[0],
                path: path.join(dir, filename)
            });
        }  
    });
  
    return files;
}

module.exports = { readDir };