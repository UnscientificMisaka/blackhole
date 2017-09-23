const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const router = require('express').Router();
const mongo = require('../common/mongo');
const tool = require('../common/tools');

const SELECT_BASH = path.join(__dirname, '../bash/select.sh');

exports.storeData = (req, res) => {
    if (!req.params.table) {
        return res.json({ code: 0, msg: '无效的表名' });
    }

    if (!req.body.content) {
        return res.json({ code: 0, msg: '无效的内容' });
    }

    cp.exec(SELECT_BASH, (error, stdout, stderr) => {
        const collections = stdout.split('\n').slice(3,-2);
        if (collections.indexOf(req.params.table) === -1) {
            return res.json({ code: 0, msg: '无效的表名'})
        }
        const IP = tool.getIP(req);
        mongo.connect().then(db => {
            return mongo.store(db, req.params.table, IP, req.body.content);
        }).then(data => {
            if (data.result.ok) {
                return res.json({ code: data.result.ok, msg: '存储成功' });
            }
            return res.json({ code: 0, msg: '存储失败' });
        }).catch((err) => {
            console.log(err)
            return res.json({ code: 0, msg: '存储失败' });
        })
    });
};

exports.getData = (req, res) => {
    if (!req.params.table) {
        return res.json({ code: 0, msg: '无效的表名' });
    }
    
    const { startDate, endDate, path, count } = req.query;
    mongo.connect().then(db => {
        return mongo.get(db, req.params.table, +count, +startDate, +endDate);
    }).then(data => {
        let arr = [];
        if (path) {
            data.forEach(i => {
                if (i[path] !== undefined) {
                    arr.push(i[path])
                }
            })
            return res.json({ code: 1, msg: arr});
        }
        return res.json({ code: 1, msg: data});
    }).catch(err => {
        console.log(err);
        return res.json({ code: 0, msg: '获取失败' });
    })
}