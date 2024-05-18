const Functions = require('../../util/Functions')
const db = require('../../db')
const config = require('../../config')
const { transporter } = require('../../util/mailer')
const { getResetPassword } = require('./components')

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
      html: `<div>
        <h2>Reset your password</h2>
        <h4>We’ve received a request to reset the password for the NaviFIt account. No changes have been made to your account yet!</h4>
        <p>
          You can reset your password by clicking the link below:
        </p>
        <p>https://navifit.vercel.app/restore/${user.oneTimePassword}</p>
      </div>`
    }
    
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
          console.log(err);
      } else {
          console.log('Email sent', info)
      }
    })
  } catch (err) {
    res.sendDbError(err)
  }
}
