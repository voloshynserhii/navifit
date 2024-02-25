const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Post User Data
 * @param req
 * @param res
 */
module.exports = async (req, res) => {
  const { email, userData = {} } = req.body

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
  
  const existingUser = await db.user.find({ email }).lean().exec()

  if (existingUser.length) return res.json({ message: 'User with this email already exists!' })
  
  //count BMI
  const { sex, dimensions, training } = userData
  const { weight, height, age } = dimensions
  
  const BMI = Number(weight / (height * height) * 10000).toFixed(2)
  
  let BMR = (10 * weight) + (6.25 * height) - (5 * age)
  
  if (sex === 'male') {
    BMR += 5
  } 
  if (sex === 'female') {
    BMR -= 161
  } 
  
  //training activity
  if (training === '1') {
    BMR = BMR * 1.2
  } 
  if (training === '2') {
    BMR = BMR * 1.375
  } 
  if (training === '3') {
    BMR = BMR * 1.55
  } 
  if (training === '4') {
    BMR = BMR * 1.725
  } 
  if (training === '5') {
    BMR = BMR * 1.9
  } 
  
  const newUser = new db.user({
    email,
    userData: { ... userData, BMI, BMR: Math.floor(BMR) },
    isDraftUser: true,
  })

  newUser
    .save()
    .then(() => {
      return res.json({ user: newUser })
    })
    .catch((err) => console.log(err))

}
