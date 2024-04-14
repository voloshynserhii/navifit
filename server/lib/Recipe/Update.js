const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Post User Data
 * @param req
 * @param res
 */
module.exports = async (req, res) => {
  const data = req.body
  const id = data?._id

  if (Functions.isNull(id) || !Functions.isId(id)) {
    return res.send({
      message: 'No id provided!'
   });
  }
  
  try {
    const recipe = await db.recipe.findById(id)

    recipe.name = data.name
    recipe.description = data.description
    recipe.calories = +data.calories
    recipe.cookingTime = +data.cookingTime
    recipe.fats = data.fats
    recipe.proteins = data.proteins
    recipe.carbs = data.carbs
    recipe.ingredients = data.ingredients
    recipe.mainImage = data.mainImage
    recipe.images = data.images
    recipe.videos = data.videos
    
    await recipe.save()
    
    res.json({ recipe })
  } catch (err) {
    console.log(err)
  }


}
