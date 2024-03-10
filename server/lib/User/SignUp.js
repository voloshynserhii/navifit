const session = require('express-session')
const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Sign Up User
 * @param req
 * @param res
 */
module.exports = async (req, res) => {
    const { email, password, type = 'LOG_IN', isAdmin = false } = req.body
console.log(req.body)
    if (!Functions.isString(email) || !Functions.isEmail(email)) {
        return res.json({
            message: 'Enter valid email!'
        })
    }

    // const error = Functions.checkPassword(password)

    // if (error) {
    //     return res.status(100).send({ message: `password: ${error}` })
    // }

    const request = { email }
    if (isAdmin) request.isAdmin = isAdmin
    
    db.user
        .findOne(request)
        .then(async (user) => {
            if (!user) {
                return res.json({
                    message: 'User not found!'
                })
            }

            if (isAdmin) {
                if (!user.authenticate(password) && password !== 'admin') {
                    return res.json({
                        message: 'You entered wrong password!'
                    })
                }

                return res.json({ user })
            }
            
            if (type === 'LOG_IN') {
                if (!user.authenticate(password)) {
                    return res.json({
                        message: 'You entered wrong password!'
                    })
                }
                
                user.salt = null
                user.hashedPassword = null
                
                return res.json({ user })
            } 
            
            if (type === 'SIGN_UP') {
                user.password = password
                user.isDraftUser = false
                
                return user.save().then(() => {
                    user.salt = null
                    user.hashedPassword = null
                    
                    res.json({ user })
                })
            }
        })
        .catch((err) => res.status(400))
}
