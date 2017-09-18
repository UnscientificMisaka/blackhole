const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const router = require('express').Router();

const CREATE_BASH = path.join(__dirname, '../bash/create.sh');

exports.renderControl = (req, res) => {
    return res.render('index');
};

exports.createTable = (req, res) => {
    const table = req.body.table.trim();
    
    cp.exec(`${CREATE_BASH} ${table}`, (error, stdout, stderr) => {
        if (error) {
            req.flash('error', error)
            return res.redirect('back');
        }
        let result = JSON.parse(stdout.match(/\{[\s\S]+\}/g)[0])
        if (!result.ok) {
            req.flash('error', result.errmsg);
            return res.redirect('back');
        }
        
        req.flash('success', '创建成功');
        return res.redirect('back');
    })
};