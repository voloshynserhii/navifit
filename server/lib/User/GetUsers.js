const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Get Recipes
 * @param req
 * @param res
 */
module.exports = async(req, res) => {
    const { pagination, limit = 20, role, sortBy, sortingDirection = 1 } = req.query

    const isAdmin = role === '1' ? false : true
    
    const filters = {
        isAdmin: { $ne: isAdmin },
        deleted: { $ne: true }
    }

    const sort = {}
    
    if (sortBy) sort[sortBy] = +sortingDirection

    const data = await db.user.find(filters).sort(sort).limit(limit).lean().exec()

    res.json({ data })
}
