const devConfig = require('./dev');
const prodConfig = require('./prod');

const settings = {
};

let config = process.env.NODE_ENV === 'production'
    ? Object.assign(settings, prodConfig)
    : Object.assign(settings, devConfig);

module.exports = config;