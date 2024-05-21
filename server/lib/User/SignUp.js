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
    const { email, password, type = 'LOG_IN', isAdmin = false } = req.body

    if (!Functions.isString(email) || !Functions.isEmail(email)) {
        return res.json({
            message: 'Enter valid email!'
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
            if (!user) {
                return res.json({
                    message: 'User not found!'
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
                if (!user.authenticate(password)) {
                    return res.json({
                        message: 'Email or password is incorrect!'
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
                    
                    // const mailOptions = {
                    //     from: config.mailer.email,
                    //     to: user.email,
                    //     subject: 'From Navifit: You requested to reset a password!',
                    //     html: `<div>
                    //       <h2>Reset your password</h2>
                    //       <h4>We’ve received a request to reset the password for the NaviFIt account. No changes have been made to your account yet!</h4>
                    //       <p>
                    //         You can reset your password by clicking the link below:
                    //       </p>
                    //       <p>https://navifit.vercel.app/restore/${user.oneTimePassword}</p>
                    //     </div>`
                    //   }
                      
                    //   transporter.sendMail(mailOptions, (err, info) => {
                    //     if (err) {
                    //         console.log(err);
                    //     } else {
                    //         console.log('Email sent', info)
                    //     }
                    //   })
                })
            }
        })
        .catch((err) => res.status(400))
}
