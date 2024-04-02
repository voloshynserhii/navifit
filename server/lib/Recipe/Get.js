const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Get Recipes
 * @param req
 * @param res
 */
module.exports = async(req, res) => {
    const { recipeId, calories, essentialIngredientIds, limit } = req.query

    try {
        const query = {
            deleted: { $ne: true }
        }
        
        if (recipeId) {
    
            query.calories = { $gte: +calories * 0.75, $lte: +calories * 1.25 }
            query._id = { $nin: [recipeId] }
            query['$and'] = [{
                $or: [{
                    essentialIngredientIds: { $in: essentialIngredientIds },
                }, {
                    'essentialIngredientIds.0': { $exists: false }
                }]
            }]
        }
        
        const data = await db.recipe.find(query).sort({ updatedAt: -1 }).limit(limit).lean().exec()
        
        res.json({ data })
    } catch (err) {
        console.log(err)
    }

}
