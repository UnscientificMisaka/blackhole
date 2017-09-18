const nodemailer = require('nodemailer');
const config = require('../config/');

const transporter = nodemailer.createTransport({
    "host": config.mail.host,
    "port": 465,
    "secureConnection": config.mail.secureConnection,
    "auth": {
        "user": config.mail.user,
        "pass": config.mail.pass
    }
});

const sendMail = () => {
    transporter.sendMail(data, (err) => {
        if(err) {
            console.log('send email err', data, err);
        }
    });
}