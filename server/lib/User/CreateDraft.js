const Functions = require('../../util/Functions')
const db = require('../../db')
const config = require('../../config')
const { countUserData } = require('./helpers')
const { transporter } = require('../../util/mailer')

/**
 * Post User Data
 * @param req
 * @param res
 */
module.exports = async (req, res) => {
  const { email, userData = {} } = req.body

  try {
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
    
    const existingUser = await db.user.exists({ email }).exec()
  
    if (existingUser) return res.json({ message: 'User with this email already exists!' })
    
    const { BMI, BMR, personalDailyKCalNeeded } = countUserData(userData)
  
    const newUser = new db.user({
      email,
      userData: { ... userData, BMI, BMR, personalDailyKCalNeeded },
      isDraftUser: true,
    })
  
    await newUser.save()
        
    res.json({ user: newUser })
  } catch (err) {
    console.log(err)
  }


}
