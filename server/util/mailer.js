const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true, //ssl
    auth: {
        user: 'navifit@mail.ru',
        pass: 'Zja6Xk2Wez9cZ5TepPai',
        // type: 'LOGIN',
    }
});

const mailOptions = {
    from: 'navifit@mail.ru',
    to: 'garant-t@ukr.net',
    subject: 'My first Email!!!',
    text: "This is my first email. I am so excited!"
};

transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Email sent', info)
    }
})