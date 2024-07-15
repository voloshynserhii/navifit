const Functions = require('../../util/Functions')
const db = require('../../db')
const config = require('../../config')
const { transporter } = require('../../util/mailer')
const { getResetPasswordComponent } = require('./components/resetPassword')

/**
 * Reset Password
 * @param req
 * @param res
 * @param next
 */
// eslint-disable-next-line no-unused-vars
module.exports = function (req, res, next) {
  let { password, token: oneTimePassword } = req.body

  if (!Functions.isString(oneTimePassword)) {
    return res.send({
      message: 'Could not change password! One time password is required.'
    });
  }

  db.user
    .findOne({ oneTimePassword })
    .then(async (user) => {
      if (!user) {
        return res.send({
          message: 'User not found!'
        });
      }

      if (user.authenticate(password)) {
        return res.send({
          message: 'New password cannot be same as old password! Please try again.'
        });
      }

      user.password = password
      user.oneTimePassword = undefined

      user.save().then(() => {
        res.json({})
        
        const url = `${config.portal.url}/signup`
        
        const mailOptions = {
          from: config.mailer.email,
          to: user.email,
          subject: 'From Navifit: You changed your password!',
          html: getResetPasswordComponent(url)
        }
        
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
              console.log(err);
          } else {
              console.log('Email sent', info)
          }
        })
      })
    })
    .catch((err) => console.log(err))
}
