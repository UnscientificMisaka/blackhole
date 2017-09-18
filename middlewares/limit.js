const tool = require('../common/tools');
const cache = require('../common/cache');
const config = require('../config');

exports.dayLimit = (req, res, next) => {
    const IP = tool.getIP(req);
    cache.get(IP).then(data => {
        if (data === 0) {
            cache.setx(IP, 1, 86400);
            next();
        }

        if (data > config.per_day_limit) {
            return res.json({ code: 0, msg: '访问已达上限' });
        }

        cache.setx(IP, ++data, 86400);
        next();
    }).catch(err => {
        console.log(err)
        return res.json({ code: 0, msg: '系统出错' });
    })
};