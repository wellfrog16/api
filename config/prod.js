const path = require('path');

const config = {
    dbPath: path.join(process.cwd(), '../db'),
    upload: {
        imgPath: path.join(process.cwd(), '../src/www/image')
    }
};

module.exports = config;