const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Get Recipes
 * @param req
 * @param res
 */
module.exports = async(req, res) => {
    const { pagination, limit = 20 } = req.query

    const data = await db.recipe.find({ deleted: { $ne: true } }).lean().exec()
    
    res.json({ data })
}
