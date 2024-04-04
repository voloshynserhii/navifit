const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Create new user
 * @param req
 * @param res
 */
module.exports = async (req, res) => {
  const { name, email, role } = req.body

  if (Functions.isNull(email) || !Functions.isEmail(email)) {
    return res.send({
      message: 'Enter valid email!'
   });
  }
  
  const existingUser = await db.user.exists({ email }).exec()

  if (existingUser) return res.json({ message: 'User with such email already exists!' })

  const userObj = {
    isAdmin: !!role,
    name,
    email,
    isDraftUser: false
  }
  
  if (!role) {
    userObj.isDraftUser = true
  }
  
  const newUser = new db.user(userObj)

  newUser
    .save()
    .then(() => {
      return res.json({ user: newUser })
    })
    .catch((err) => console.log(err))

}
