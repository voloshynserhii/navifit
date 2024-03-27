const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Post User Data
 * @param req
 * @param res
 */
module.exports = async (req, res) => {
  const { _id: id, email, name, userData, newRecipeId, oldRecipeId, week, day } = req.body

  if (Functions.isNull(id) || !Functions.isId(id)) {
    return res.send({
      message: 'No id provided!'
    });
  }

  if (Functions.isNull(newRecipeId) || !Functions.isId(newRecipeId)) {
    return res.send({
      message: 'No new recipe id provided!'
    });
  }

  if (Functions.isNull(oldRecipeId) || !Functions.isId(oldRecipeId)) {
    return res.send({
      message: 'No old recipe id provided!'
    });
  }

  try {
    const currentUser = await db.user.findById(id)

    if (!currentUser) {
      return res.send({
        message: 'User not found!'
      });
    }

    if (newRecipeId && oldRecipeId) {
      const newRecipe = await db.recipe.findById(newRecipeId).lean().exec();
      const { currentPlan } = currentUser
      const newPlan = { ...currentPlan }
      
      currentUser.currentPlan = undefined

      const currentWeek = newPlan[`week${week + 1}`][day]
      const index = Object.values(currentWeek).findIndex(recipe => String(recipe._id) === oldRecipeId)
      const mealType = Object.keys(currentWeek)[index]
      
      currentWeek[mealType] = newRecipe
      
      currentUser.currentPlan = newPlan
    } else {
      currentUser.name = name
      currentUser.email = email
      currentUser.userData = userData
    }

    await currentUser.save()

    res.json({ currentUser })
  } catch (err) {
    console.log(err)
  }


}
