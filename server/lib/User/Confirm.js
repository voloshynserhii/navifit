// const Functions = require('../../util/Functions')
const db = require('../../db')
const config = require('../../config')

/**
 * Confirm User
 * @param req
 * @param res
 */
module.exports = async(req, res) => {
    const { user: email, key } = req.query
    
    try {
        const user = await db.user.findOne({ email }).select({ _id: 1, oneTimePassword: 1 })
    
        if (user.oneTimePassword === key) {
            user.isConfirmed = true
            user.oneTimePassword = null
            
            await user.save();
            
            res.redirect(`${config.portal.url}/login?user=${user._id}&confirmed=true`)
        } else {
            res.redirect(`${config.portal.url}/`)
        }
    } catch (error) {
        res.status(404)
    }
}