const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Post User Data
 * @param req
 * @param res
 */
module.exports = async (req, res) => {
  const recipe = req.body

  if (Functions.isNull(recipe) || !Functions.isObject(recipe)) {
    return res.send({
      message: 'No recipes provided!'
   });
  }
  
  try {
    const newRecipe = new db.recipe(recipe)

    await newRecipe.save()
    
    res.json({ newRecipe })
  } catch (err) {
    console.log(err)
  }


}
