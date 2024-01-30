const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Post User Data
 * @param req
 * @param res
 */
module.exports = async(req, res) => {
    const users = await db.user.find().lean()

    res.json(users)
}
