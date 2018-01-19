const path = require('path');

const config = {
    dbPath: path.join(process.cwd(), '../api-file/db'),
    upload: {
        imgPath: path.join(process.cwd(), '../api-file/image')
    }
};

module.exports = config;