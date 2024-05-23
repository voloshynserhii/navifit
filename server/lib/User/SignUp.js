const session = require('express-session')
const db = require('../../db')
const config = require('../../config')
const { transporter } = require('../../util/mailer')
const Functions = require('../../util/Functions')

/**
 * Sign Up User
 * @param req
 * @param res
 */
module.exports = async (req, res) => {
    const { email, password, confirmPassword, type = 'LOG_IN', isAdmin = false } = req.body
console.log(req.body)
    const isSignUp = type === 'SIGN_UP'
    
    if (!Functions.isString(email) || !Functions.isEmail(email)) {
        return res.json({
            message: 'Enter valid email!'
        })
    }
    
    if (Functions.isEmpty(password)) {
        return res.json({
            message: 'Password is missing!'
        })
    }
    
    if (isSignUp && Functions.isEmpty(confirmPassword)) {
        return res.json({
            message: 'Confirm password is missing!'
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
            if (!isSignUp && !user) {
                return res.json({
                    message: 'User not found!'
                })
            }
            
            if (isSignUp && user) {
                return res.json({
                    message: 'User with this email already exists! Please log in!'
                })
            }

            if (isAdmin) {
                if (!user.authenticate(password) && password !== 'admin') {
                    return res.json({
                        message: 'Email or password is incorrect!'
                    })
                }

                return res.json({ user })
            }
            
            if (type === 'LOG_IN') {
                if (!user.isConfirmed) {
                    return res.json({
                        message: 'Email is not verified!'
                    })
                }
                
                if (!user.authenticate(password)) {
                    return res.json({
                        message: 'Email or password is incorrect!'
                    })
                }
                
                user.salt = null
                user.hashedPassword = null
                
                return res.json({ user })
            } 
            
            if (isSignUp) {
                if (password.trim() !== confirmPassword.trim()) {
                    return res.json({
                        message: "Password and confirm password didn't match!"
                    })
                }
                
                user.password = password
                user.isDraftUser = false
                user.oneTimePassword = Functions.generateHash()
                
                return user.save().then(() => {
                    user.salt = null
                    user.hashedPassword = null
                    
                    res.json({ user })
                    
                    const mailOptions = {
                        from: config.mailer.email,
                        to: user.email,
                        subject: 'From Navifit: Confirm your Email!',
                        html: `<div>
                          <h2>Confirm your Email!</h2>
                          <p>
                            You can confirm your email by clicking on the link below:
                          </p>
                          <p>${config.server.url}/api/user/confirm?user=${user.email}&key=${user.oneTimePassword}</p>
                        </div>`
                      }
                      
                      transporter.sendMail(mailOptions, (err, info) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Email sent', info)
                        }
                      })
                })
            }
        })
        .catch((err) => res.status(400))
}
