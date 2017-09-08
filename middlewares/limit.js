const tool = require('../common/tools');
const cache = require('../common/cache');

exports.dayLimit = (req, res, next) => {
    const IP = tool.getIP(req);
    cache.get(IP).then(data => {
        if (!data) {
            console.log('here',data)
            return cache.setx(IP, 1, 86400);
        }
        return cache.setx(IP, data++, 86400);
    }).then(data => {
        console.log(data)
    }).catch(err => {
        console.log(err)
    })
};