const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true, //ssl
    auth: {
        user: 'navifit@mail.ru',
        pass: '5791huskyKEISY',
        // type: 'LOGIN',
    }
});

const mailOptions = {
    from: 'The Idea project',
    to: 'vosquery@gmail.com',
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