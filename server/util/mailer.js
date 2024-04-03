const nodemailer = require('nodemailer');
const config = require('../config')

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true, //ssl
    auth: {
        user: config.mailer.email,
        pass: config.mailer.password,
        // type: 'LOGIN',
    }
});

module.exports = {
    transporter
}