const Functions = require('../../util/Functions')
// const Mailer = require('../../util/Mailer')
const db = require('../../db')


/**
 * Restore password
 * @param req
 * @param res
 */
module.exports = async(req, res) => {
  try {
    let { email } = req.body

    if (Functions.isNull(email)) {
      return res.sendError('009')
    }

    if (!Functions.isString(email)) {
      return res.sendError('002', 'email')
    }

    if (!Functions.isEmail(email)) {
      return res.sendError('003', 'email')
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
      return res.sendError('EmailNotFound')
    }

    user.oneTimePassword = Functions.generateHash()
    user.extra = { req, action: 'RestorePassword' }

    await user.save()

    res.json({})

    // Mailer.restorePassword({ email, token: user.oneTimePassword, req })
  } catch (err) {
    res.sendDbError(err)
  }
}
