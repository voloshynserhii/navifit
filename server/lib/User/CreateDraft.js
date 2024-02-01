const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Post User Data
 * @param req
 * @param res
 */
module.exports = (req, res) => {
  const { email, userData } = req.body

  if (Functions.isNull(email) || !Functions.isString(email)) {
    return res.status(400).send({
      message: 'Email!'
   });
  }
  
  if (Functions.isNull(userData) || !Functions.isObject(userData)) {
    return res.status(400).send({
      message: 'User Data!'
   });
  }
  
  const newUser = new db.user({
    email,
    userData,
    isDraftUser: true,
  })

  newUser
    .save()
    .then(() => {
      res.json({ user: newUser })
    })
    .catch((err) => console.log(err))

}
