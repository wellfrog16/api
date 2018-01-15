const path = require('path');

const config = {
    dbPath: process.env.NODE_ENV === 'production'
        ? path.join(process.cwd(), '../db')
        : path.join(process.cwd(), '../api-file/db'),
    upload: {
        imgPath: process.env.NODE_ENV === 'production'
            ? path.join(process.cwd(), '../src/www/image')
            : path.join(process.cwd(), '../api-file/image')
    }
};

module.exports = config;