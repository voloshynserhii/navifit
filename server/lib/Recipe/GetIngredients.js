const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Get Recipes
 * @param req
 * @param res
 */
module.exports = async(req, res) => {
    try {
        const query = {
            deleted: { $ne: true }
        }
        
        const list = await db.ingredient.find(query).lean().exec()
        console.log(list)
        res.json({ data: list })
    } catch (err) {
        console.log(err)
    }

}
