const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Sign Up User
 * @param req
 * @param res
 */
module.exports = async (req, res) => {
    const { email, password, type = 'LOG_IN' } = req.body

    if (!Functions.isString(email) || !Functions.isEmail(email)) {
        return res.json({
            message: 'Enter valid email!'
        })
    }

    // const error = Functions.checkPassword(password)

    // if (error) {
    //     return res.status(100).send({ message: `password: ${error}` })
    // }

    db.user
        .findOne({ email })
        .then(async (user) => {
            if (!user) {
                return res.json({
                    message: 'User not found!'
                })
            }
            
            if (type === 'LOG_IN') {
                if (!user.authenticate(password)) {
                    return res.json({
                        message: 'You entered wrong password!'
                    })
                }
                
                req.user = user
                
                return res.json({})
            } 
            
            if (type === 'SIGN_UP') {
                user.password = password
                user.isDraftUser = false
                
                req.user = user
                
                return user.save().then(() => res.json({}))
            }
        })
        .catch((err) => res.status(400))
}
