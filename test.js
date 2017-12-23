const fs = require("fs");
const path = require('path');

function walk(dir) {  
    var children = []  
    fs.readdirSync(dir).forEach(function(filename){
        console.log(dir);
        
        var paths = dir+"/"+filename  
        var stat = fs.statSync(paths)  
        

        if (stat && stat.isDirectory()) {  
            children = children.concat(walk(paths))  
        }  
        else {  
            children.push({ name:filename, path: path.join(dir+"/"+filename) })
        }  
    })  
  
    return children  
} 


var aaa = walk(path.join(__dirname, './db'));

console.log(aaa);