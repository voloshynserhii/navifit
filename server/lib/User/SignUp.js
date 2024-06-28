const session = require('express-session')
const moment = require('moment')
const db = require('../../db')
const config = require('../../config')
const { transporter } = require('../../util/mailer')
const Functions = require('../../util/Functions')
const { generatePlan } = require('../../util/PlansUtil')

/**
 * Sign Up User
 * @param req
 * @param res
 */
module.exports = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body

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

        if (Functions.isEmpty(confirmPassword)) {
            return res.json({
                message: 'Confirm password is missing!'
            })
        }

        if (password.trim() !== confirmPassword.trim()) {
            return res.json({
                message: "Password and confirm password didn't match!"
            })
        }

        const query = { email }

        let user = await db.user.findOne(query)

        if (!!user && user.isDraftUser && user.userData && !user.currentPlan) {
            console.log('GENERATING_USER_PLAN')
            const month = await generatePlan(user.userData)

            user.currentPlan = month
            user.lastGenerated = moment()
        }

        if (!user) {
            user = await db.user.create({ email })
        }

        user.password = password
        user.isDraftUser = false
        user.oneTimePassword = Functions.generateHash()

        await user.save()

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

        user.salt = null
        user.hashedPassword = null

        return res.json({ user })
    } catch (err) {
        res.status(400)
    }
}
