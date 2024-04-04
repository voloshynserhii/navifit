const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Get Recipes
 * @param req
 * @param res
 */
module.exports = async(req, res) => {
    const { pagination, limit = 20, role } = req.query

    const isAdmin = role === '1' ? false : true

    const data = await db.user.find({ isAdmin: { $ne: isAdmin }, deleted: { $ne: true } }).limit(limit).lean().exec()

    res.json({ data })
}
