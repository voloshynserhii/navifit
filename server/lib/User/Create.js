const Functions = require('../../util/Functions')
const db = require('../../db')
const { countUserData } = require('./helpers')
// const { generatePlan } = require('../../util/PlansUtil')

/**
 * Post User Data
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

  if (existingUser.length) return res.json({ message: 'User with this email already exists!' })
  
  const { BMI, BMR, personalDailyKCalNeeded } = countUserData(userData)
  // await generatePlan({personalDailyKCalNeeded, ...userData})

  const newUser = new db.user({
    email,
    userData: { ... userData, BMI, BMR, personalDailyKCalNeeded },
    isDraftUser: true,
  })

  newUser
    .save()
    .then(() => {
      return res.json({ user: newUser })
    })
    .catch((err) => console.log(err))

}
