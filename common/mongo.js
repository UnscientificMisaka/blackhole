const MongoClient = require('mongodb').MongoClient;
const config = require('../config');

exports.connect = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(config.db, (err, db) => {
            if (err) {
                reject(err);
            }
            resolve(db);
        });
    });
};

exports.store = (db, table, ip, content) => {
    return new Promise((resolve, reject) => {
        db.collection(table)
        .insert({ip, content, create_at: Date.now()}, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        })
    });
};

exports.get = (db, table, startDate, endDate) => {
    return new Promise((resolve, reject) => {
        if (startDate && endDate) {
            db.collection(table)
            .find({create_at: {$gt:startDate,$lt:endDate}})
            .limit(1000)
            .toArray((err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
        }
        db.collection(table)
        .find()
        .sort({create_at: -1})
        .limit(1000)
        .toArray((err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        })
    });
};