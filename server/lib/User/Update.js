const Functions = require('../../util/Functions')
const db = require('../../db')
const config = require('../../config')
const { transporter } = require('../../util/mailer')

/**
 * Post User Data
 * @param req
 * @param res
 */
module.exports = async (req, res) => {
  const { 
    _id: id, 
    email, 
    name, 
    userData, 
    newRecipeId, 
    oldRecipeId, 
    week, 
    day, 
    isDraft, 
    password, 
    oldPassword
  } = req.body

  if (!Functions.isNull(id) && !Functions.isId(id)) {
    return res.send({
      message: 'No id provided!'
    });
  }
  
  if (Functions.isNull(id) && Functions.isString(email) && !Functions.isEmail(email)) {
    return res.send({
      message: 'Enter valid email!'
    });
  }

  if (!Functions.isNull(newRecipeId) && !Functions.isId(newRecipeId)) {
    return res.send({
      message: 'No new recipe id provided!'
    });
  }

  if (!Functions.isNull(oldRecipeId) && !Functions.isId(oldRecipeId)) {
    return res.send({
      message: 'No old recipe id provided!'
    });
  }

  try {
    let currentUser
    
    if (!id) {
      currentUser = await db.user.findOne({ email })
    } else {
      currentUser = await db.user.findById(id)
    }

    if (!currentUser) {
      return res.send({
        message: 'User not found!'
      });
    }

    if (!Functions.isNull(isDraft)) {
      currentUser.isDraftUser = !currentUser.isDraftUser 
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
    } 
    
    if (name) {
      currentUser.name = name
    }
    
    if (email) {
      currentUser.email = email
    }
    
    if (userData) {
      currentUser.userData = userData
    }
    
    if (password) {
      if (oldPassword && !currentUser.authenticate(oldPassword)) {
        return res.json({
          message: 'Old password is incorrect!'
        })
      } else {
        currentUser.password = password
      }
    }

    await currentUser.save()
    
    if (password) {
      const mailOptions = {
        from: config.mailer.email,
        to: currentUser.email,
        subject: 'From Navifit: Your password was changed!',
        html:`<div>
          <h4>Someone just changed your password!</h4>
          <p>Your new password is ${password}</p>
        </div>`
      }
      
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent', info)
        }
      })
    }

    res.json({ currentUser })
  } catch (err) {
    console.log(err)
  }
}
