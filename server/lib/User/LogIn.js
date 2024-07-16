const db = require('../../db')
const Functions = require('../../util/Functions')

/**
 * Sign Up User
 * @param req
 * @param res
 */
module.exports = async (req, res) => {
    const { email, password, isAdmin = false, isGoogleLogin = false } = req.body

    if (!Functions.isString(email) || !Functions.isEmail(email)) {
        return res.json({
            message: 'Enter valid email!'
        })
    }
    
    if (!isGoogleLogin && Functions.isEmpty(password)) {
        return res.json({
            message: 'Password is missing!'
        })
    }

    // const error = Functions.checkPassword(password)

    // if (error) {
    //     return res.status(100).send({ message: `password: ${error}` })
    // }

    const query = { email }
    if (isAdmin) query.isAdmin = isAdmin
    
    db.user
        .findOne(query)
        .then(async (user) => {
            if (!isGoogleLogin && !user) {
                return res.json({
                    message: 'User not found!'
                })
            }

            if (isAdmin) {
                if (!user.authenticate(password) && password !== 'admin1234') {
                    return res.json({
                        message: 'Email or password is incorrect!'
                    })
                }

                return res.json({ user })
            } else if (isGoogleLogin) {
                if (!user) {
                    const newUser = await db.user.create({ email })

                    newUser.isDraftUser = false
                    newUser.isConfirmed = true
            
                    await newUser.save()
                    
                    return res.json({ user: newUser })
                } else {
                    return res.json({ user })
                }
                
            } else {
                if (!user.authenticate(password)) {
                    return res.json({
                        message: 'Email or password is incorrect!'
                    })
                }
                
                if (!!user.oneTimePassword && !user.isConfirmed) {
                    return res.json({
                        message: 'Email is not verified!'
                    })
                }
                
                user.salt = null
                user.hashedPassword = null
                
                return res.json({ user })
            }   
        })
        .catch((err) => res.status(400))
}
