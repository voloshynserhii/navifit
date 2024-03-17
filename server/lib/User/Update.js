const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Post User Data
 * @param req
 * @param res
 */
module.exports = async (req, res) => {
  const { _id: id, email, name, userData } = req.body

  if (Functions.isNull(id) || !Functions.isId(id)) {
    return res.send({
      message: 'No id provided!'
   });
  }

  return res.json({ })
  try {
    const currentUser = await db.user.findById(id)

    currentUser.name = name
    currentUser.email = email
    currentUser.userData = userData
    
    await currentUser.save()
    
    res.json({ currentUser })
  } catch (err) {
    console.log(err)
  }


}
