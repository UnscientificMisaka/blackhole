const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const router = require('express').Router();

exports.renderControl = (req, res) => {
    return res.render('control');
};

exports.createTable = (req, res) => {
    const table = req.body.table.trim();
    cp.exec(`./create.sh ${table}`, (error, stdout, stderr) => {
        if (error) {
            return req.flash('error', error)
        }
        let result = JSON.parse(stdout.match(/\{[\s\S]+\}/g)[0])
        if (result.ok) {
            return req.flash('error', result.errmsg);
        }
        return req.flash('success', '创建成功')
    })
};