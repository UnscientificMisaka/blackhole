const tool = require('../tool/');
const cache = require('../common');

exports.dayLimit = (req, res, next) => {
    const IP = tool.getIP(req);
    cache.get(IP).then(data => {
        console.log(res)
    })
};