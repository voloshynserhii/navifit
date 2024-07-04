const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Get Recipes
 * @param req
 * @param res
 */
module.exports = async(req, res) => {
    const { recipeId, calories, essentialIngredientIds, limit, filters } = req.query

    try {
        const query = {
            deleted: { $ne: true }
        }
        
        if (filters?.name) {
            const name = Functions.escapeRegexBrackets(filters.name.trim())
            query.name = { $regex: name, $options: 'i' }
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
        
        const list = await db.recipe.find(query).sort({ updatedAt: -1 }).limit(limit).lean().exec()
        
        for (const recipe of list) {
            recipe.ingredientValues = []
        }
        
        res.json({ data: list })
    } catch (err) {
        console.log(err)
    }

}
