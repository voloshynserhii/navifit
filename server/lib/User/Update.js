const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Update User
 * @param req
 * @param res
 */
module.exports = async (req, res) => {
  const { email, userData = {} } = req.body

  if (Functions.isNull(email) || !Functions.isEmail(email)) {
    return res.send({
      message: 'Enter valid email!'
   });
  }
  
  if (Functions.isNull(userData) || !Functions.isObject(userData)) {
    return res.send({
      message: 'User Data is empty!'
   });
  }
  
  const existingUser = await db.user.find({ email }).lean().exec()


//   newUser
//     .save()
//     .then(() => {
//       return res.json({ user: newUser })
//     })
//     .catch((err) => console.log(err))

}

