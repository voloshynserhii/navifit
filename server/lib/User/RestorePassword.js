const Functions = require('../../util/Functions')
const db = require('../../db')
const config = require('../../config')
const { transporter } = require('../../util/mailer')
const { getRestorePasswordComponent } = require('./components/restorePassword')

/**
 * Restore password
 * @param req
 * @param res
 */
module.exports = async(req, res) => {
  try {
    let { email } = req.body

    if (Functions.isNull(email)) {
      return res.send({
        message: 'Email is required!'
      });
    }

    const searchEmail = email.trim()
    
    const user = await db.user
      .findOne({
        $or: [
          { email: searchEmail },
          { email: searchEmail.toLowerCase() },
        ]
      })
      .exec()

    if (!user) {
      return res.send({
        message: 'User with this email not found!'
      });
    }

    user.oneTimePassword = Functions.generateHash()

    await user.save()

    res.json({})

    const mailOptions = {
      from: config.mailer.email,
      to: user.email,
      subject: 'From Navifit: You requested to reset a password!',
      html: getRestorePasswordComponent(user.oneTimePassword)
    }
    
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
          console.log(err);
      } else {
          console.log('Email sent', info)
      }
    })
  } catch (err) {
    console.log(err)
  }
}
