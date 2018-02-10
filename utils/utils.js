const utils = {};

utils.config = {
    debug: true
};

utils.log = s => !utils.config.debug || console.log(s);

module.exports = utils;