const router = require('express').Router();
const tool = require('../common/tools');

exports.collect = (req, res, next) => {
    const ip = tool.getIP(req);
    console.log('ip',ip)
    // console.log(ip, req.body);
};
