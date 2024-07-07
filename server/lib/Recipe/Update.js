const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Update Recipe
 * @param req
 * @param res
 */
module.exports = async (req, res) => {
  const { 
    _id: id, 
    ingredientValues = [], 
    name, 
    description, 
    calories, 
    cookingTime, 
    fats, 
    proteins, 
    carbs,
    ingredients,
    mainImage,
    videos,
    mealType
  } = req.body || {}

  if (Functions.isNull(id) || !Functions.isId(id)) {
    return res.send({
      message: 'No id provided!'
   });
  }
  
  try {
    const recipe = await db.recipe.findById(id)

    recipe.name = name
    recipe.description = description
    recipe.calories = +calories
    recipe.cookingTime = +cookingTime
    recipe.fats = fats
    recipe.proteins = proteins
    recipe.carbs = carbs
    recipe.ingredients = ingredients
    recipe.mainImage = mainImage
    recipe.videos = videos
    recipe.mealType = mealType
    
    await recipe.save()
    
    res.json({ recipe })
    
    if (ingredientValues.length) {
      for (const ingredientValue of ingredientValues) {
        const existingIngredient = await db.ingredient.findOne({ title: ingredientValue.title })
        
        if (!existingIngredient || existingIngredient.unit !== ingredientValue.unit) {
          const newIngredient = new db.ingredient(ingredientValue)

          await newIngredient.save()
        } else if (existingIngredient.value !== ingredientValue.value) {
          existingIngredient.value = ingredientValue.value
          
          await existingIngredient.save()
        }
      }
    }
  } catch (err) {
    console.log(err)
  }


}
