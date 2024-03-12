const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Post User Data
 * @param req
 * @param res
 */
module.exports = async (req, res) => {
  const { id } = req.params

  if (Functions.isNull(id) || !Functions.isId(id)) {
    return res.send({
      message: 'No id provided!'
   });
  }
  
  try {
    const recipe = await db.recipe.findById(id)

    recipe.deleted = true
    
    await recipe.save()
    
    res.json({ recipe })
  } catch (err) {
    console.log(err)
  }


}
