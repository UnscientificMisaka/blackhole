const redis = require('./redis');

exports.get = (key) => {
    // redis.get(key.toString(), (err, res) => {
    //     if (err) {
    //         console.log(err);
    //         return callback(err);
    //     }
    //     return callback(res);
    // });
    return new Promise((resolve, reject) => {
        redis.get(key.toString(), (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        })
    })
};

exports.set = (key, value) => {
    return new Promise((resolve, reject) => {
        redis.set(key, JSON.stringify(value), (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res)
        });
    });
};

exports.setx = (key, value, time) => {
    return new Promise((resolve, reject) => {
        redis.set(key.toString(), JSON.stringify(value), 'EX', time, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res)
        });
    });
};