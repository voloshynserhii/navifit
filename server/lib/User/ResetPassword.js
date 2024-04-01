const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Reset Password
 * @param req
 * @param res
 * @param next
 */
// eslint-disable-next-line no-unused-vars
module.exports = function(req, res, next) {
  let { newPassword, repeatPassword, oneTimePassword } = req.body
  // let { oldPassword, password, oneTimePassword } = req.body

  if (
    // Functions.isNull(oldPassword) ||
    Functions.isNull(newPassword) ||
    Functions.isNull(repeatPassword) ||
    Functions.isNull(oneTimePassword)
  ) {
    return res.sendError('009')
  }

  if (!Functions.isString(newPassword)) {
    return res.sendError('002', 'newPassword')
  }

  if (!Functions.isString(repeatPassword)) {
    return res.sendError('002', 'repeatPassword')
  }

  if (!Functions.isString(oneTimePassword)) {
    return res.sendError('002', 'oneTimePassword')
  }

  if (Functions.isEmpty(newPassword) || newPassword.length > 100) {
    return res.sendError('003', 'newPassword')
  }

  const error = Functions.checkPassword(newPassword)

  if (error) {
    return res.sendError('003', `newPassword: ${error}`)
  }

  db.user
    .findOne({ oneTimePassword })
    .then(async(user) => {
      if (!user) {
        return res.sendError('101')
      }

      // if (!user.authenticate(oldPassword)) {
      //   return res.sendError('102')
      // }

      if (user.authenticate(newPassword)) {
        return res.sendError('301')
      }

      if (user.isPasswordPreviouslyUsed(newPassword)) {
        return res.sendError('301')
      }

      /* disabled because potentially unsecure
      const isUniq = await db.passwordIsUnique(newPassword)
      if (!isUniq) {
        return res.sendError('302')
      }
      */

      user.password = newPassword
      user.extra = { req, action: 'ResetPassword' }
      user.oneTimePassword = undefined
      user.unsuccessfulLoginAttempts = 0

      user.save().then(() => res.json({}))
    })
    .catch((err) => res.sendDbError(err))
}
